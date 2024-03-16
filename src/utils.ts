/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArticleType } from "./types";
import * as api from "./api";
import { SOURCES } from "./constants";

// wanted to exclude these domains from news api search
//  since we get data from guardian and nytimes separately
const excludedDomains = "guardian.com,nytimes.com";

export const fetchDataFromSources = async ({
  commonParams = {},
  newsParams = {},
  guardianParams = {},
  nytimesParams = {},
  sourceFilter = SOURCES,
}: {
  commonParams?: Record<string, any>;
  newsParams?: Record<string, any>;
  guardianParams?: Record<string, any>;
  nytimesParams?: Record<string, any>;
  sourceFilter?: string[];
}) => {
  let newsApiData: ArticleType[] = [];
  let guardianData: ArticleType[] = [];
  let nytimesData: ArticleType[] = [];

  if (sourceFilter.includes("others")) {
    const newsApiResponse = await api.newsApi.get("/everything", {
      params: {
        pageSize: 5,
        qInTitle: "title",
        excludeDomains: excludedDomains,
        ...commonParams,
        ...newsParams,
      },
    });
    newsApiData =
      newsApiResponse?.data?.articles?.map((article: any) => ({
        source: article.source.name,
        author: article.author || "No author",
        title: article.title,
        date: article.publishedAt,
        url: article.url,
      })) || [];
  }

  if (sourceFilter.includes("guardian")) {
    const guardianResponse = await api.guardianApi.get("/search", {
      params: {
        "show-tags": "contributor",
        "page-size": 5,
        ...commonParams,
        ...guardianParams,
      },
    });
    guardianData =
      guardianResponse?.data?.response?.results?.map((article: any) => ({
        source: "The Guardian",
        author: article?.tags?.[0]?.webTitle || "No author",
        title: article.webTitle,
        date: article.webPublicationDate,
        url: article.webUrl,
      })) || [];
  }

  if (sourceFilter.includes("nytimes")) {
    // nytimesapi dooesn't let users to set page size
    const nytimesResponse = await api.nytimesApi.get("", {
      params: {
        ...commonParams,
        ...nytimesParams,
      },
    });
    nytimesData =
      nytimesResponse?.data?.response?.docs?.map((article: any) => ({
        source: article.source,
        author: article.byline.person.length
          ? `${article?.byline?.person?.[0]?.firstname} ${article?.byline?.person?.[0]?.lastname}`
          : "No author",
        title: article.headline.main,
        date: article.pub_date,
        url: article.web_url,
      })) || [];
  }

  return [...newsApiData, ...guardianData, ...nytimesData];
};

export const shuffleArray = (array: ArticleType[]) =>
  array.sort(() => Math.random() - 0.5);
