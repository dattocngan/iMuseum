import React from 'react'
import {useState, useRef} from 'react';
import {createCollection} from 'api/collection';
import DialogImageList from 'components/Dialog/DialogImageList';
import Button from "@material-ui/core/Button";

const AddCollection = () => {
  const [isValidated, setIsValidated] = useState(false);
  const titleInputRef = useRef();
  const descriptionInputRef = useRef();
  const featureImageInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!e.target.checkValidity()) {
      return setIsValidated(true);
    }
    const formData = new FormData();

    formData.append("title", titleInputRef.current.value);
    formData.append("description", descriptionInputRef.current.value);
    formData.append("feature_image", featureImageInputRef.current.files[0]);

    createCollection(formData).then((response) => {
      console.log(response.data.message);
    });
  };
  return (
    <form
      className={`row g-3 needs-validation ${
        isValidated ? "was-validated" : ""
      }`}
      noValidate
      onSubmit={submitHandler}
    >
      <div className="col-md-4">
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
      <div className="col-md-6">
        <label htmlFor="description" className="form-label">
          Mô tả:
        </label>
        <textarea
          ref={descriptionInputRef}
          type="text"
          className="form-control"
          id="description"
          required
        />
      </div>
      <div className="col-md-2">
        <label htmlFor="dimension" className="form-label">
          Chọn hiện vật:
        </label>
        <DialogImageList />
      </div>
      <div className="col-12">
        {/* <button className="btn btn-primary" type="submit">
          Thêm bộ sưu tập
        </button> */}
        <Button variant="contained" color="primary" type='submit' >
          Thêm bộ sưu tập
        </Button>
      </div>
    </form>
  );
}
// title, description, img
export default AddCollection