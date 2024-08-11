const Get = (UserId) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  };

  return fetch(`${UserId}`, requestOptions);
};

export default Get;
