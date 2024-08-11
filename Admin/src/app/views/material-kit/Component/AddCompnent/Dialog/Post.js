import { Dialog, Slide } from '@mui/material';
import React from 'react';

import { useState } from 'react';
import { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function Post(props) {
  var navigator = useNavigate();
  var NaviBox = props.value;
  const [opens, setOpens] = useState(true);
  const handleClose = () => {
    setOpens(false);
    if (NaviBox) {
      navigator(`/backend/${NaviBox}`);
    }
  };
  return (
    <div>
      <Dialog
        open={opens}
        keepMounted
        TransitionComponent={Transition}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <div>
          <div class="wrapper-1">
            <div class="wrapper-2">
              <h1>Post Success !</h1>

              <p className="p-2">Well done! You successfully read this important.</p>

              <button onClick={handleClose} class="go-home">
                Back
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
