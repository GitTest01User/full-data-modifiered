import Api from 'Service/Api';

const UserIsLogin = (RoleId) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  };

  return fetch(`${Api.RegisterAPiGet}?user_role_Id=${RoleId}`, requestOptions);
};

export default UserIsLogin;
