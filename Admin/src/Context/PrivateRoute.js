import Analytics from 'app/views/dashboard/Analytics';
import JwtLogin from 'app/views/sessions/JwtLogin';
import { useSelector } from 'react-redux';

export const PrivateValue = () => {
  var LoginActive = useSelector((state) => state.Login.value);
  const isAuthenticatedASP = LoginActive.IsActive;
  console.log('isAuthenticatedASP', isAuthenticatedASP);
  return isAuthenticatedASP ? <Analytics /> : <JwtLogin />;
};
