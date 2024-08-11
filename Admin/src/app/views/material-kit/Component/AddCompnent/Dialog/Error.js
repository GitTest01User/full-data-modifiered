import { Dialog, Slide } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';

import { useState } from 'react';
import { forwardRef } from 'react';
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function Error(props) {
  var Errors = props.value;
  const [opens, setOpens] = useState(true);
  const handleClose = () => {
    setOpens(false);
    window.location.reload(false);
  };
  return (
    <div>
      {' '}
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
              <h1>Failed To Update !</h1>

              <p className="p-2">{Errors}</p>

              <button onClick={handleClose} class="go-home">
                Return
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
