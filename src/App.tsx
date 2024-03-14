import { useCallback, useEffect, useState } from "react";
import "./App.css";
import * as api from "./api";
import { ArticleType } from "./types";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CircularProgress } from "@mui/material";
import { SearchFilterProvider } from "./context/SearchFilterContext";
import Articles from "./components/Articles";
import Interactions from "./components/Interactions";

function App() {
  const [newsData, setNewsData] = useState<ArticleType[]>([]);
  const [isLoading, setLoading] = useState(true);

  // pagination
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchFromAllResources = useCallback(async () => {
    try {
      if (page < 1) {
        setLoading(true);
      }
      const newsApiResponse = await api.newsApi.get("/top-headlines", {
        params: {
          country: "us",
          page,
          pageSize: 10,
        },
      });
      const newsApiData: ArticleType[] = newsApiResponse.data.articles.map(
        article => ({
          source: article.source.name,
          author: article.author,
          title: article.title,
          date: article.publishedAt,
        })
      );

      const guardianResponse = await api.guardianApi.get("/search", {
        params: {
          q: "",
          "show-tags": "contributor",
          currentPage: page,
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
        params: {
          page,
        },
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

      const combinedData = [...newsApiData, ...guardianData, ...nytimesData];
      const shuffledArray = combinedData.sort(() => Math.random() - 0.5);

      setHasMore(shuffledArray.length > 0);
      setNewsData(prevData => [...prevData, ...shuffledArray]);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  }, [page]);

  const moveToNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    fetchFromAllResources();
  }, [fetchFromAllResources]);

  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <SearchFilterProvider>
        {isLoading ? (
          <CircularProgress size={80} />
        ) : (
          <>
            <Interactions />
            <Articles
              newsData={newsData}
              moveToNextPage={moveToNextPage}
              hasMore={hasMore}
            />
          </>
        )}
      </SearchFilterProvider>
    </ThemeProvider>
  );
}

export default App;
