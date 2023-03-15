// 频道请求
import request from "@/utils/request";

//获取所有频道  //  /v1_0/channels
export const getAllChannels = () => {
  return request({
    method: "GET",
    url: "/v1_0/channels",
  });
};

//添加用户频道  //  /v1_0/user/channels
export const addUserChannel = (channel) => {
  return request({
    method: "PATCH",
    url: "/v1_0/user/channels",
    data: {
      channels: [channel],
    },
  });
};

//删除用户指定频道频道  //  /v1_0/user/channels/:target
export const deleteUserChannel = (channelId) => {
  return request({
    method: "DELETE",
    url: `/v1_0/user/channels/${channelId}`,
  });
};
