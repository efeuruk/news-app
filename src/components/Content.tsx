/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import * as api from "../api";
import { ArticleType } from "../types";
import Articles from "./Articles";
import { CircularProgress } from "@mui/material";
import Interactions from "./Interactions";
import { useSearchFilterContext } from "../context/hooks/useSearchFilterContext";

const Content = () => {
  const [newsData, setNewsData] = useState<ArticleType[]>([]);
  const [isWholePageLoading, setWholePageLoading] = useState(true);

  // pagination
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // search and filters
  const { search, setArticlesLoading } = useSearchFilterContext();

  const fetchDataFromSources = async ({
    commonParams = {},
    newsParams = {},
    guardianParams = {},
    nytimesParams = {},
  }: {
    commonParams?: Record<string, any>;
    newsParams?: Record<string, any>;
    guardianParams?: Record<string, any>;
    nytimesParams?: Record<string, any>;
  }) => {
    const newsApiResponse = await api.newsApi.get("/top-headlines", {
      params: {
        country: "us",
        pageSize: 5,
        ...commonParams,
        ...newsParams,
      },
    });
    const newsApiData: ArticleType[] =
      newsApiResponse?.data?.articles?.map((article: any) => ({
        source: article.source.name,
        author: article.author,
        title: article.title,
        date: article.publishedAt,
      })) || [];

    const guardianResponse = await api.guardianApi.get("/search", {
      params: {
        "show-tags": "contributor",
        "page-size": 5,
        ...commonParams,
        ...guardianParams,
      },
    });
    const guardianData: ArticleType[] =
      guardianResponse?.data?.response?.results?.map((article: any) => ({
        source: "The Guardian",
        author: article?.tags?.[0]?.webTitle || "No author",
        title: article.webTitle,
        date: article.webPublicationDate,
      })) || [];

    // nytimesapi dooesn't let users to set page size
    const nytimesResponse = await api.nytimesApi.get("", {
      params: {
        ...commonParams,
        ...nytimesParams,
      },
    });
    const nytimesData: ArticleType[] =
      nytimesResponse?.data?.response?.docs?.map((article: any) => ({
        source: article.source,
        author: article.byline.person.length
          ? `${article?.byline?.person?.[0]?.firstname} ${article?.byline?.person?.[0]?.lastname}`
          : "No author",
        title: article.headline.main,
        date: article.pub_date,
      })) || [];

    return [...newsApiData, ...guardianData, ...nytimesData];
  };

  const shuffleArray = (array: ArticleType[]) =>
    array.sort(() => Math.random() - 0.5);

  const doFetch = useCallback(async () => {
    try {
      if (page < 1) {
        setWholePageLoading(true);
      }
      const combinedData = await fetchDataFromSources({
        commonParams: { page, q: search },
        guardianParams: { currentPage: page },
      });
      const shuffledArray = shuffleArray(combinedData);

      setHasMore(shuffledArray.length > 0);
      if (search === "") {
        setNewsData(prevData => [...prevData, ...shuffledArray]);
      } else {
        if (page === 1) {
          setNewsData(shuffledArray);
          console.log("search");
        } else {
          console.log("search else");
          setNewsData(prevData => [...prevData, ...shuffledArray]);
        }
      }
      setWholePageLoading(false);
      setArticlesLoading(false);
    } catch (err) {
      console.error(err);
      setWholePageLoading(false);
      setArticlesLoading(false);
    }
  }, [page, search, setArticlesLoading]);

  const moveToNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    doFetch();
  }, [doFetch, page]);

  useEffect(() => {
    setNewsData([]);
    setPage(1);
  }, [search]);

  return (
    <>
      {isWholePageLoading ? (
        <CircularProgress size={80} />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
          }}
        >
          <Interactions />
          <Articles
            newsData={newsData}
            moveToNextPage={moveToNextPage}
            hasMore={hasMore}
          />
        </div>
      )}
    </>
  );
};

export default Content;
