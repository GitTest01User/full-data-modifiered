import axios from "axios";

class WebService {
  GetApiCall(url) {
    return axios.get(url);
  }

  postApiCall(url, data) {
    return axios.post(url, data);
  }

  GetApiCallServer(url, token) {
    return axios.get(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }

  PutApiCallServer(url, data, token) {
    return axios.get(url, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }

  
}

export default new WebService();
