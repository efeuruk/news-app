import React from "react";
import { ArticleType } from "../types";
import { Card, CardContent, Typography } from "@mui/material";

type ArticleProps = {
  article: ArticleType;
};

const Article: React.FC<ArticleProps> = ({ article }) => {
  const date = new Date(article.date);
  return (
    <Card sx={{ mb: 1.5 }}>
      <CardContent>
        <Typography component={"h3"}>{article.title}</Typography>
        <Typography>Article by {article.author}</Typography>
        <Typography>{date.toDateString()}</Typography>
        <Typography>{article.source}</Typography>
      </CardContent>
    </Card>
  );
};

export default Article;
