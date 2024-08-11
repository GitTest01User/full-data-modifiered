import { Icon } from '@mui/material';
import Api from 'Service/Api';
import React, { useState } from 'react';

const ImagePopup = (imageUrl, altText) => {
  const [isOpen, setIsOpen] = useState(false);
  console.log('imageUrl', imageUrl);
  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);
  let imageUrls;

  if (imageUrl && imageUrl.startsWith('data:image')) {
    imageUrls = imageUrl;
  } else {
    imageUrls = imageUrl ? `${Api.BaseURL}/${imageUrl}` : '/demo.png';
  }
  return (
    <div className="text-right ">
      {/* <img src={imageUrl ? `${Api.BaseURL}/${imageUrl}` : '/demo.png'} alt={altText} /> */}
      <div className="form-contral">
        <Icon
          title="Expand the image"
          className="MuiIcon-fontSizeMedium MuiIcon-root bg-light border-0 css-kp9ftd-MuiIcon-root form-check-inline m-0 material-icons notranslate "
          onClick={openPopup}
        >
          fullscreen
        </Icon>
      </div>
      {isOpen && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className=" text-center" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closePopup}>
              &times;
            </span>
            <img src={imageUrls} alt={altText} className="popup-image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagePopup;
