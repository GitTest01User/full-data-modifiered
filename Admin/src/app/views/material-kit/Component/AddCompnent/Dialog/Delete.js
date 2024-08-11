import { Alert, Dialog, Slide, Snackbar } from '@mui/material';
import { ChangeDeleteValue } from 'Redux/DeleteSlice';
import React from 'react';
import { useEffect } from 'react';

import { useState } from 'react';
import { forwardRef } from 'react';
import { useDispatch } from 'react-redux';
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function Delete(props) {
  var dispatch = useDispatch();
  var Errors = props.value;
  const [opens, setOpens] = useState(true);
  const handleClose = () => {
    setOpens(false);
    dispatch(ChangeDeleteValue(false));
  };
  var handleOpen = () => {
    setOpens(false);
    dispatch(ChangeDeleteValue(true));
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
              <h1> Permanently delete file!</h1>

              <p className="p-2">Move the files you want to share to the Trash!</p>

              <button onClick={handleOpen} class="go-home m-1 mt-4">
                yes
              </button>
              <button onClick={handleClose} class="go-home m-1 mt-4">
                No
              </button>
            </div>
          </div>
        </div>
      </Dialog>
      <Snackbar open={opens} autoHideDuration={6000}>
        <Alert severity="success" sx={{ width: '100%' }} variant="filled">
          1 post moved to permanently delete
        </Alert>
      </Snackbar>
    </div>
  );
}
