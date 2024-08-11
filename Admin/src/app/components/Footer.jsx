import { ThemeProvider } from '@mui/material';

import { useState } from 'react';
import { useEffect } from 'react';

const Footer = () => {
  var [yearBox, setYearBox] = useState('');
  const d = new Date();
  let year = d.getFullYear();
  useEffect(() => {
    setYearBox(year);
  }, []);

  return (
    <ThemeProvider className="m-4 mt-3 ">
      <div className="container">
        <footer class="bg-white p-4 rounded shadow">
          <div class="row">
            <div class="col-12 col-md-4 col-xl-6 mb-md-0">
              <h6 class="mb-0  mt-0 text-center text-lg-start">
                ©&nbsp;{yearBox} &nbsp; Powered by Digi2L
              </h6>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default Footer;
