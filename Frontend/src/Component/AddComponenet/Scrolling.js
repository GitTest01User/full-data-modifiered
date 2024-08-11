import { useEffect, useState } from 'react';

export default function Scrolling() {

  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {

    updata()

  }, []);


  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });
  }, []);
  var updata = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

  }

  return (
    <div>


      <div />

      <button
        onClick={updata}
        style={{





          position: 'fixed',
          padding: '1rem 2rem',
          fontSize: '51px',
          bottom: '1px',
          left: '0px',
          background: 'transparent',
          border: 'none',

          textAlign: 'center',
          display: isVisible ? 'block' : 'none'
        }}
      >
        <i className="fa fa-arrow-circle-up  classcolor"></i>
      </button>
    </div>
  );
}
