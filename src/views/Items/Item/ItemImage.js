import React from "react";
import classes from "./ItemImage.module.css";

const ItemImage = ({ imageSrc, handleCloseModal }) => {
  return (
    <div className={classes.modal}>
      <img
        src={imageSrc}
        alt="Ảnh hiện vật"
        style={{ maxHeight: "80vh", maxWidth: "80vw" }}
        className="rounded mb-2"
      />
      <div className="d-flex justify-content-end">
        <button className="btn btn-danger" onClick={handleCloseModal}>
          Đóng
        </button>
      </div>
    </div>
  );
};

export default ItemImage;
