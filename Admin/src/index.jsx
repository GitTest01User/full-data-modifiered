import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material';
import App from './app/App';
import './index.css';
// import './headercss.css';
// import './headercss1.css';
import './datatalecss.css';

import * as serviceWorker from './serviceWorker';

// third party style
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import { Provider } from 'react-redux';
import store from 'Redux/Store';
import { AuthProvider } from './Context/AuthContext';

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <AuthProvider>
      <StyledEngineProvider injectFirst>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StyledEngineProvider>
    </AuthProvider>
  </Provider>
);

serviceWorker.unregister();
