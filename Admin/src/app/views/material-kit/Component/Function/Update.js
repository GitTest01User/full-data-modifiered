const Update = (UserId, raw) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  var requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch(`${UserId}`, requestOptions);
};

export default Update;
