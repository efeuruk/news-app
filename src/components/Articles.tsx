import React from "react";
import Article from "./Article";
import { ArticleType } from "../types";
import { CircularProgress, Grid, Typography } from "@mui/material";
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
      style={{ overflow: "hidden" }}
      next={() => {
        moveToNextPage();
      }}
      loader={<CircularProgress size={40} />}
      hasMore={hasMore}
      dataLength={newsData.length}
    >
      <Grid container spacing={2} alignItems="stretch">
        {newsData.map((article, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Article article={article} />
          </Grid>
        ))}
      </Grid>
    </InfiniteScroll>
  ) : (
    !isArticlesLoading &&
    newsData.length === 0 && (
      <Grid item xs={12}>
        <Typography component={"h2"} sx={{ fontSize: "40px" }}>
          No articles found
        </Typography>
      </Grid>
    )
  );
};

export default Articles;
