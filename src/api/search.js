//搜索模块
import request from "@/utils/request";

//搜索文章        v1_0/suggestion
export const getSearchSuggestion = (q) => {
  return request({
    method: "GET",
    url: "v1_0/suggestion",
    params: {
      q,
    },
  });
};

//获取搜索结果      /v1_0/search
export const getSearchResult = (params) => {
  return request({
    method: "GET",
    url: "/v1_0/search",
    params,
  });
};
