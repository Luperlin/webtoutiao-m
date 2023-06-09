/**
 * 请求模块
 */
import axios from "axios";
import store from "@/store";
import JSONBig from "json-bigint";

const request = axios.create({
  baseURL: "http://toutiao.itheima.net",

  transformResponse: [
    function (data) {
      try {
        // 如果转换成功则返回转换的数据结果
        return JSONBig.parse(data);
      } catch (err) {
        // 如果转换失败，则包装为统一数据格式并返回
        return {
          data,
        };
      }
    },
  ],
});

// 请求拦截器
// Add a request interceptor
request.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // config ：本次请求的配置对象
    // config 里面有一个属性：headers
    //引入store，从而获得用户token
    const { user } = store.state;
    //判断用户是否有token
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// 响应拦截器

export default request;
