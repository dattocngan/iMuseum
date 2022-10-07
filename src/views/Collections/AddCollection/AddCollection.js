import React from "react";
import { useState, useRef } from "react";
import { createCollection } from "api/collection";
import DialogImageList from "components/Dialog/DialogImageList";
import Button from "@material-ui/core/Button";
import Swal from "sweetalert2";

const AddCollection = () => {
  const [isValidated, setIsValidated] = useState(false);
  const [image, setImage] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const descriptionInputRef = useRef();

  const getAllCheckedItems = (data) => setCheckedItems(data);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!e.target.checkValidity()) {
      return setIsValidated(true);
    }
    const formData = new FormData();

    formData.append("title", titleInputRef.current.value);
    formData.append("description", descriptionInputRef.current.value);
    formData.append("image", imageInputRef.current.files[0]);
    checkedItems.forEach((element) => {
      console.log(element);
      formData.append("itemIdList", element);
    });

    if (checkedItems.length) {
      createCollection(formData).then((response) => {
        if (response.data) {
          Swal.fire({
            icon: "success",
            title: "Bộ sưu tập đã được tạo thành công",
            showConfirmButton: true,
          });
        }
      });
    } else {
      console.log("length must be greater than 0");
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Phải có ít nhất 1 ảnh trong bộ sưu tập!",
      });
    }
  };

  const changeImageHandler = () => {
    if (imageInputRef.current.files.length > 0)
      setImage(URL.createObjectURL(imageInputRef.current.files[0]));
    else setImage(false);
  };

  return (
    <form
      className={`row g-3 needs-validation ${
        isValidated ? "was-validated" : ""
      }`}
      noValidate
      onSubmit={submitHandler}
    >
      <div className="col">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Tiêu đề:
          </label>
          <input
            ref={titleInputRef}
            type="text"
            className="form-control"
            id="title"
            required
          />
          <div className="invalid-feedback">Tiêu đề bộ sưu tập là bắt buộc</div>
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Ảnh đại diện bộ sưu tập
          </label>
          <input
            ref={imageInputRef}
            type="file"
            className="form-control"
            id="titleImage"
            onChange={changeImageHandler}
            required
          />
          {image && (
            <img src={image} className="w-50 mt-3 rounded shadow-sm" alt="" />
          )}
          <div className="invalid-feedback">Ảnh đại diện là bắt buộc</div>
        </div>
      </div>
      <div className="col">
        <label htmlFor="description" className="form-label">
          Mô tả:
        </label>
        <textarea
          ref={descriptionInputRef}
          type="text"
          className="form-control"
          rows={10}
          id="description"
        />
      </div>
      <div className="col-12 d-flex justify-content-between">
        <DialogImageList getAllCheckedItems={getAllCheckedItems} />
        <Button variant="contained" color="primary" type="submit">
          Thêm bộ sưu tập
        </Button>
      </div>
      <div className="col-12"></div>
    </form>
  );
};

export default AddCollection;
