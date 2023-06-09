//文章请求模块
import request from "@/utils/request";

//请求获取文章列表数据    /app/v1_1/articles
export const getArticles = (params) => {
  return request({
    method: "GET",
    url: "/v1_0/articles",
    params,
  });
};

//获取文章    v1_0/articles/:article_id
export const getArticleById = (articleId) => {
  return request({
    method: "GET",
    url: `v1_0/articles/${articleId}`,
  });
};

//收藏文章  /v1_0/article/collections
export const addcollect = (target) => {
  return request({
    method: "POST",
    url: `/v1_0/article/collections`,
    data: {
      target,
    },
  });
};

//取消收藏  /v1_0/article/collections/:target
export const deletecollect = (target) => {
  return request({
    method: "DELETE",
    url: `/v1_0/article/collections/${target}`,
  });
};

//点赞  /v1_0/article/likings
export const addLike = (target) => {
  return request({
    method: "POST",
    url: `/v1_0/article/likings`,
    data: {
      target,
    },
  });
};

//取消点赞  /v1_0/article/likings/:target
export const deleteLike = (target) => {
  return request({
    method: "DELETE",
    url: `/v1_0/article/likings/${target}`,
  });
};
