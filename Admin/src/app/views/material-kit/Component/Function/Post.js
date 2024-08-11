const PostProcess = (URL, raw, token) => {
  const myHeaders = new Headers();
  if (token) {
    myHeaders.append('authorization', `Bearer ${token}`);
  }
  myHeaders.append('Content-Type', 'application/json');

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch(URL, requestOptions);
};

export default PostProcess;
