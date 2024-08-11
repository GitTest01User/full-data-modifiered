const Delete = (UserId) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  var requestOptions = {
    method: 'DELETE',
    redirect: 'follow'
  };

  return fetch(`${UserId}`, requestOptions);
};

export default Delete;
