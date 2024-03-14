import React from "react";
import Article from "./Article";
import { ArticleType } from "../types";
import { CircularProgress } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchFilterContext } from "../context/hooks/useSearchFilterContext";

type ArticlesProps = {
  newsData: ArticleType[];
  moveToNextPage: () => void;
  hasMore: boolean;
};

const Articles: React.FC<ArticlesProps> = ({
  newsData,
  moveToNextPage,
  hasMore,
}) => {
  const { isArticlesLoading } = useSearchFilterContext();
  return isArticlesLoading ? (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "12px" }}
    >
      <CircularProgress size={60} />
    </div>
  ) : newsData.length > 0 ? (
    <InfiniteScroll
      next={() => moveToNextPage()}
      loader={<CircularProgress size={20} />}
      hasMore={hasMore}
      dataLength={newsData.length}
    >
      {newsData.map((article, index) => (
        <Article key={index} article={article} />
      ))}
    </InfiniteScroll>
  ) : (
    !isArticlesLoading &&
    newsData.length === 0 && (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "12px" }}
      >
        <h1>No articles found</h1>
      </div>
    )
  );
};

export default Articles;
