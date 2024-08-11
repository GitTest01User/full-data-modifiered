import useSettings from 'app/hooks/useSettings';
import { Span } from './Typography';
import { Link } from 'react-router-dom';

const MatxLogo = ({ className }) => {
  const { settings } = useSettings();
  const theme = settings.themes[settings.activeTheme];

  return (
    <>
      <div class=" logowrapbox">
        <div class="d-flex justify-content-center align-items-center">
          <Link to="/">
            <span class="sidebar-icon text-center">
              <img src="/Digi2limage/logo-Digi2L222.png" alt="" />
            </span>
          </Link>
          {/* <span class="mt-1 ms-1 sidebar-text">.com </span> */}
        </div>
      </div>
    </>
  );
};

export default MatxLogo;
