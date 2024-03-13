import { useEffect, useState } from "react";
import "./App.css";
import * as api from "./api";
import { ArticleType } from "./types";
import Article from "./components/Article";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CircularProgress } from "@mui/material";
import Interactions from "./components/Interactions";

function App() {
  const [newsData, setNewsData] = useState<ArticleType[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchFromAllResources();
  }, []);

  const fetchFromAllResources = async () => {
    try {
      setLoading(true);
      const newsResponse = await api.newsApi.get("/top-headlines", {
        params: {
          country: "us",
        },
      });
      const newsData: ArticleType[] = newsResponse.data.articles.map(
        article => ({
          source: article.source.name,
          author: article.author,
          title: article.title,
          date: article.publishedAt,
        })
      );

      const guardianResponse = await api.guardianApi.get("/search", {
        params: {
          q: "brexit",
          "show-tags": "contributor",
        },
      });
      const guardianData: ArticleType[] =
        guardianResponse.data.response.results.map(article => ({
          source: "The Guardian",
          author: article?.tags?.[0]?.webTitle || "No author",
          title: article.webTitle,
          date: article.webPublicationDate,
        }));

      const nytimesResponse = await api.nytimesApi.get("", {
        params: {},
      });
      const nytimesData: ArticleType[] = nytimesResponse.data.response.docs.map(
        article => ({
          source: article.source,
          author: article.byline.person.length
            ? `${article?.byline?.person?.[0]?.firstname} ${article?.byline?.person?.[0]?.lastname}`
            : "No author",
          title: article.headline.main,
          date: article.pub_date,
        })
      );

      const combinedData = [...newsData, ...guardianData, ...nytimesData];
      const shuffledArray = combinedData.sort(() => Math.random() - 0.5);

      setNewsData(shuffledArray);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      {isLoading ? (
        <CircularProgress size={80} />
      ) : (
        <>
          <Interactions />
          {newsData.slice(0, 10).map((article, index) => (
            <Article key={index} article={article} />
          ))}
        </>
      )}
    </ThemeProvider>
  );
}

export default App;
