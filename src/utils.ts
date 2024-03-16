/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArticleType } from "./types";
import * as api from "./api";

export const fetchDataFromSources = async ({
  commonParams = {},
  newsParams = {},
  guardianParams = {},
  nytimesParams = {},
}: {
  commonParams?: Record<string, any>;
  newsParams?: Record<string, any>;
  guardianParams?: Record<string, any>;
  nytimesParams?: Record<string, any>;
}) => {
  const newsApiResponse = await api.newsApi.get("/everything", {
    params: {
      pageSize: 5,
      qInTitle: "title",
      ...commonParams,
      ...newsParams,
    },
  });
  const newsApiData: ArticleType[] =
    newsApiResponse?.data?.articles?.map((article: any) => ({
      source: article.source.name,
      author: article.author || "No author",
      title: article.title,
      date: article.publishedAt,
      url: article.url,
    })) || [];

  const guardianResponse = await api.guardianApi.get("/search", {
    params: {
      "show-tags": "contributor",
      "page-size": 5,
      ...commonParams,
      ...guardianParams,
      // section
    },
  });
  const guardianData: ArticleType[] =
    guardianResponse?.data?.response?.results?.map((article: any) => ({
      source: "The Guardian",
      author: article?.tags?.[0]?.webTitle || "No author",
      title: article.webTitle,
      date: article.webPublicationDate,
      url: article.webUrl,
    })) || [];

  // nytimesapi dooesn't let users to set page size
  const nytimesResponse = await api.nytimesApi.get("", {
    params: {
      ...commonParams,
      ...nytimesParams,
      // section_name
    },
  });
  const nytimesData: ArticleType[] =
    nytimesResponse?.data?.response?.docs?.map((article: any) => ({
      source: article.source,
      author: article.byline.person.length
        ? `${article?.byline?.person?.[0]?.firstname} ${article?.byline?.person?.[0]?.lastname}`
        : "No author",
      title: article.headline.main,
      date: article.pub_date,
      url: article.web_url,
    })) || [];

  return [...newsApiData, ...guardianData, ...nytimesData];
};

export const shuffleArray = (array: ArticleType[]) =>
  array.sort(() => Math.random() - 0.5);
