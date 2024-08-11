import Api from 'Service/Api';

const UserDetail = (UserId) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  };

  return fetch(`${Api.RegisterAPiGet}?Id=${UserId}`, requestOptions);
};

export default UserDetail;
