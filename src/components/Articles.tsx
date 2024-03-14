import React from "react";
import Article from "./Article";
import { ArticleType } from "../types";
import { CircularProgress } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";

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
  return (
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
  );
};

export default Articles;
