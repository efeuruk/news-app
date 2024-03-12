import { useEffect, useState } from "react";
import "./App.css";
import * as api from "./api";

type Article = {
  source: string;
  author: string;
  title: string;
};

function App() {
  const [newsData, setNewsData] = useState<Article[]>([]);

  useEffect(() => {
    fetchFromAllResources();
  }, []);

  const fetchFromAllResources = async () => {
    try {
      const newsResponse = await api.newsApi.get("/top-headlines?country=us");
      const newsData: Article[] = newsResponse.data.articles.map(article => ({
        source: article.source.name,
        author: article.author,
        title: article.title,
      }));

      const guardianResponse = await api.guardianApi.get(
        "/search?q=brexit&show-tags=contributor"
      );
      const guardianData: Article[] =
        guardianResponse.data.response.results.map(article => ({
          source: "The Guardian",
          author: article?.tags?.[0]?.webTitle || "No author",
          title: article.webTitle,
        }));

      const nytimesResponse = await api.nytimesApi.get("");
      const nytimesData: Article[] = nytimesResponse.data.response.docs.map(
        article => ({
          source: article.source,
          author: article.byline
            ? `${article?.byline?.person?.[0]?.firstname} ${article?.byline?.person?.[0]?.lastname}`
            : "No author",
          title: article.headline.main,
        })
      );

      const combinedData = [...newsData, ...guardianData, ...nytimesData];
      const shuffledArray = combinedData.sort(() => Math.random() - 0.5);

      setNewsData(shuffledArray);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {newsData.slice(0, 10).map((article, index) => (
        <div key={index}>
          <h3>{article.title}</h3>
          <p>{article.source}</p>
          <p>{article.author}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
