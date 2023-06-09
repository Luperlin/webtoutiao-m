//用户相关请求模块
import request from "@/utils/request";
// import store from "@/store/index.js";

//用户登录认证
export const login = (data) => {
  return request({
    method: "POST",
    url: "/v1_0/authorizations",
    data,
  });
};

//获取短信验证码
export const sendSms = (mobile) => {
  return request({
    method: "GET",
    url: `/v1_0/sms/codes/${mobile}`,
    data,
  });
};

// 获取用户信息
export const getUserInfo = () => {
  return request({
    method: "GET",
    url: "/v1_0/user",
    //发送请求头数据
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`,
    // },
  });
};

//获取频道列表
export const getUserChannels = () => {
  return request({
    method: "GET",
    url: "/v1_0/user/channels",
  });
};

//关注用户   // /v1_0/user/followings
export const addFollow = (target) => {
  return request({
    method: "POST",
    url: "/v1_0/user/followings",
    data: {
      target,
    },
  });
};

//取消关注用户   // /v1_0/user/followings/:target
export const deleteFollow = (target) => {
  return request({
    method: "DELETE",
    url: `/v1_0/user/followings/${target}`,
  });
};

//获取当前登录用户个人资料   // /v1_0/user/profile
export const getUserProfile = () => {
  return request({
    method: "GET",
    url: "/v1_0/user/profile",
  });
};

//更新用户资料   //  /v1_0/user/profile
export const updateUserProfile = (data) => {
  return request({
    method: "PATCH",
    url: "/v1_0/user/profile",
    data,
  });
};

//更新用户头像   //  /v1_0/user/photo
export const updateUserPhoto = (data) => {
  return request({
    method: "PATCH",
    url: "/v1_0/user/photo",
    data,
  });
};
