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
  const [isWholePageLoading, setWholePageLoading] = useState(true);

  // pagination
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // search and filters
  const { search, dateFilter, setArticlesLoading } = useSearchFilterContext();

  const doFetch = useCallback(async () => {
    try {
      if (page < 1) {
        setWholePageLoading(true);
      }

      const combinedData = await fetchDataFromSources({
        commonParams: { page, ...(search.length && { q: search }) },
        newsParams: { ...(dateFilter && { from: dateFilter, to: dateFilter }) },
        guardianParams: {
          currentPage: page,
          ...(dateFilter && { "from-date": dateFilter, "to-date": dateFilter }),
        },
        nytimesParams: {
          ...(dateFilter && { begin_date: dateFilter, end_date: dateFilter }),
        },
      });

      const shuffledArray = shuffleArray(combinedData);
      setHasMore(shuffledArray.length > 0);

      if (search === "") {
        setNewsData(prevData => [...prevData, ...shuffledArray]);
      } else {
        if (page === 1) {
          setNewsData(shuffledArray);
        } else {
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
  }, [dateFilter, page, search, setArticlesLoading]);

  const moveToNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    doFetch();
  }, [doFetch, page]);

  useEffect(() => {
    setNewsData([]);
    setPage(1);
  }, [search, dateFilter]);

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
