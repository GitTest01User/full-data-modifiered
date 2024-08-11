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
        "Content-Type": "application/json",
      },
    });
  }
  postApiCallServer(url, data, token) {
    return axios.post(url, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }

  PutApiCallServer(url, data, token) {
    return fetch(url, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: data,
    });
  }

  PostApiCallServer1(url, token, data) {
    return fetch(url, {
      method: "post",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: data,
    });
  }

  PostApiCallServer2(url, token, data) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(data);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    return fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.text();
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }

  BaseImageServer(BaseURL, image) {
    return BaseURL + image;
  }
}

export default new WebService();
