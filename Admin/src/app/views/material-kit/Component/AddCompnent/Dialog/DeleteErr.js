import { Dialog, Slide } from '@mui/material';
import { ChangeTrashValue } from 'Redux/TrashSlice';
import React from 'react';
import { useEffect } from 'react';

import { useState } from 'react';
import { forwardRef } from 'react';
import { useDispatch } from 'react-redux';
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function DeleteErr(props) {
  var Errors = props.value;
  const [opens, setOpens] = useState(true);
  const handleClose = () => {
    setOpens(false);
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
              <h1>Error No Move Parmanent Delete!</h1>

              <p className="p-2">Move the files you want to share to the Delete !</p>

              <button onClick={handleClose} class="go-home">
                go Back
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
