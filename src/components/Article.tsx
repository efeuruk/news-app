import React from "react";
import { ArticleType } from "../types";
import { Card, CardContent, Chip, Typography } from "@mui/material";

type ArticleProps = {
  article: ArticleType;
};

const Article: React.FC<ArticleProps> = ({ article }) => {
  const date = new Date(article.date);
  return (
    <a href={article.url} target="__blank" rel="noopener noreferrer">
      <Card
        sx={{
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          height: "100%",
          "&:hover": {
            boxShadow: 10,
            transform: "scale(1.02)",
            transition: "all 0.3s ease",
          },
        }}
      >
        <CardContent
          sx={{
            width: "100%",
            padding: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography sx={{ mb: 1 }}>
            {article.author} • {date.toDateString()}
          </Typography>
          <Typography component={"h3"} sx={{ mb: 1, fontWeight: "bold" }}>
            {article.title}
          </Typography>
          <Chip label={article.source} />
        </CardContent>
      </Card>
    </a>
  );
};

export default Article;
