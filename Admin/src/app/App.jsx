import { CssBaseline } from '@mui/material';
import { useLocation, useRoutes } from 'react-router-dom';
import { MatxTheme } from './components';
import { AuthProvider } from './contexts/JWTAuthContext';
import { SettingsProvider } from './contexts/SettingsContext';
import routes from './routes';
import '../fake-db';
import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const App = () => {
  const content = useRoutes(routes);

  return (
    <SettingsProvider>
      <AuthProvider>
        <MatxTheme>
          <CssBaseline />
          <GoToTop> </GoToTop>
          {content}
        </MatxTheme>
      </AuthProvider>
    </SettingsProvider>
  );
};

export default App;

function GoToTop() {
  const [isAlertVisible, setIsAlertVisible] = React.useState(false);
  const routePath = useLocation();
  const onTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  useEffect(() => {
    setIsAlertVisible(true);
    onTop();
    setTimeout(() => {
      setIsAlertVisible(false);
    }, 800);
  }, [routePath]);

  if (isAlertVisible) {
    return (
      <div className="loader">
        <div className="Logoicon">
          <div className="p-5">
            <div
              className="col-lg-2 col-md-4 col-sm-8 col-10 mx-auto bg-body p-2 loaderwrapper"
              style={{ borderRadius: '12px' }}
            >
              <img
                src="/digi2l-gif.gif"
                className="p-2 text-center"
                style={{ width: 'auto', height: '130px' }}
                alt="Loading Animation"
              />
              <div className="text-center">
                <p>Please Wait ...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
