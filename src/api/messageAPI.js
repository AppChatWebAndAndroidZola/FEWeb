import axiosClient from "./axiosClient";

const messageAPI = {
  GetMessage(message) {
    const url = "/messages/" + message.idRoom;
    return axiosClient.get(url);
  },
  AddMessage(message) {
    const url = "/messages/addMessage";
    return axiosClient.post(url, message.message);
  },
  CallVideo(roomId) {
    const url = "/messages/callVideo";
    return axiosClient.post(url, { RoomId: roomId.idRoom });
  },
};

export default messageAPI;
