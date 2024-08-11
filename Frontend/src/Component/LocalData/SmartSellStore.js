export const doLogin = (LoginUser, next) => {
    sessionStorage.setItem('LoginUser', JSON.stringify(LoginUser));
    next();
  };
  
  export const isLoginIn = () => {
    let data = sessionStorage.getItem('LoginUser');
  
    if (data == null) {
      return false;
    } else {
      return true;
    }
  };
  
  export const doLogout = (next) => {
    sessionStorage.removeItem('LoginUser');
    next();
  };
  
  export const getSmartSellCurrentUserDetail = () => {
    if (isLoginIn) {
      return JSON.parse(sessionStorage.getItem('LoginUser')).user;
    } else {
      return false;
    }
  };
  