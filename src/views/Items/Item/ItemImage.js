import React from 'react';
import classes from './ItemImage.module.css';

const ItemImage = ({ imageSrc, handleCloseModal }) => {
  return (
    <div className={classes.modal}>
      <img
        src={imageSrc}
        alt="Ảnh hiện vật"
        width="100%"
        className="rounded mb-2"
      />
      <div className="d-flex justify-content-end">
        <button className="btn btn-danger" onClick={handleCloseModal}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ItemImage;
