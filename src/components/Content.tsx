/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import { ArticleType } from "../types";
import Articles from "./Articles";
import { CircularProgress } from "@mui/material";
import Interactions from "./Interactions";
import { useSearchFilterContext } from "../context/hooks/useSearchFilterContext";
import { fetchDataFromSources, shuffleArray } from "../utils";

const Content = () => {
  const [newsData, setNewsData] = useState<ArticleType[]>([]);
  const [isPageLoading, setPageLoading] = useState(true);

  // pagination
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // search and filters
  const {
    search,
    dateFilter,
    categoryFilter,
    sourceFilter,
    setArticlesLoading,
  } = useSearchFilterContext();

  const getData = async () => {
    const combinedData = await fetchDataFromSources({
      commonParams: { page, ...(search.length && { q: search }) },
      newsParams: { ...(dateFilter && { from: dateFilter, to: dateFilter }) },
      guardianParams: {
        currentPage: page,
        ...(dateFilter && { "from-date": dateFilter, "to-date": dateFilter }),
        ...(categoryFilter.length && {
          section: categoryFilter.join(" AND "),
        }),
      },
      nytimesParams: {
        ...(dateFilter && { begin_date: dateFilter, end_date: dateFilter }),
        ...(categoryFilter.length && { fq: categoryFilter.join(" AND ") }),
      },
      sourceFilter,
    });

    return shuffleArray(combinedData);
  };

  const stopLoadings = () => {
    setPageLoading(false);
    setArticlesLoading(false);
  };

  const doFetch = useCallback(async () => {
    try {
      if (page < 1) {
        setPageLoading(true);
      }

      const shuffledArray = await getData();
      setHasMore(shuffledArray.length > 0);

      if (search === "" && categoryFilter.length === 0) {
        setNewsData(prevData => [...prevData, ...shuffledArray]);
      } else {
        if (page === 1) {
          setNewsData(shuffledArray);
        } else {
          setNewsData(prevData => [...prevData, ...shuffledArray]);
        }
      }

      stopLoadings();
    } catch (err) {
      console.error(err);
      stopLoadings();
    }
  }, [
    dateFilter,
    categoryFilter,
    sourceFilter,
    page,
    search,
    setArticlesLoading,
  ]);

  const moveToNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    doFetch();
  }, [doFetch, page]);

  useEffect(() => {
    setNewsData([]);
    setPage(1);
  }, [search, dateFilter, sourceFilter, categoryFilter]);

  return (
    <>
      {isPageLoading ? (
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
