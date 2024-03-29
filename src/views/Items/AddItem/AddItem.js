import React, { useCallback, useEffect, useRef, useState } from "react";

import Date from "components/Date/Date";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { addItem, getAges, getMaterials } from "../../../api/item";
import Editor from "../../../components/Editor/Editor";
import { titleActions } from "../../../store/title";
import Loader from "../../../UI/Loader";
import Modal from "../../../UI/Modal";

function AddItem() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [date, setDate] = useState(dayjs(""));
  const [description, setDescription] = useState("");

  const ageInputRef = useRef();
  const materialInputRef = useRef();
  const nameInputRef = useRef();
  const originalInputRef = useRef();
  const dimensionInputRef = useRef();
  const weightInputRef = useRef();
  const featureImageInputRef = useRef();
  const imagesInputRef = useRef();

  const [isValidated, setIsValidated] = useState(false);
  const [ages, setAges] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(titleActions.setTitle(" > Thêm mới hiện vật"));
    Promise.all([getAges(), getMaterials()])
      .then((results) => {
        setAges(results[0].data);
        setMaterials(results[1].data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [dispatch]);

  const changeDescriptionHandler = useCallback((value) => {
    setDescription(value);
  }, []);

  const handleChangeDate = (newValue) => {
    setDate(newValue);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(description);
    if (!e.target.checkValidity()) {
      return setIsValidated(true);
    }
    setIsLoading(true);

    const formData = new FormData();

    formData.append("name", nameInputRef.current.value);
    formData.append("original", originalInputRef.current.value);
    formData.append("dimension", dimensionInputRef.current.value);
    formData.append("weight", weightInputRef.current.value);
    formData.append("ageId", ageInputRef.current.value);
    formData.append("materialId", materialInputRef.current.value);
    formData.append("collected_date", typeof date === "object" ? null : date);
    formData.append("description", description);
    formData.append("feature_image", featureImageInputRef.current.files[0]);
    for (const file of imagesInputRef.current.files) {
      formData.append("images", file);
    }

    addItem(formData).then((response) => {
      if (response.status === 201) {
        Swal.fire("Good job!", "Thêm hiện vật mới thành công!", "success");
        history.push("/admin/items");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Đã có lỗi xảy ra.",
        });
      }
    });
  };

  return (
    <>
      {isLoading && <Modal children={<Loader />} />}
      <form
        className={`row g-3 needs-validation ${
          isValidated ? "was-validated" : ""
        }`}
        noValidate
        onSubmit={submitHandler}
      >
        <h3>Thêm hiện vật</h3>
        <div className="col-md-4">
          <label htmlFor="name" className="form-label">
            Tên hiện vật:
          </label>
          <input
            ref={nameInputRef}
            type="text"
            className="form-control"
            id="name"
            required
          />
          <div className="invalid-feedback">Tên hiện vật là bắt buộc</div>
        </div>
        <div className="col-md-4">
          <label htmlFor="original" className="form-label">
            Nguồn gốc:
          </label>
          <input
            ref={originalInputRef}
            type="text"
            className="form-control"
            id="original"
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="dimension" className="form-label">
            Kích thước:
          </label>
          <input
            ref={dimensionInputRef}
            type="text"
            className="form-control"
            id="dimension"
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="weight" className="form-label">
            Cân nặng (kg):
          </label>
          <input
            ref={weightInputRef}
            step="0.01"
            type="number"
            className="form-control"
            id="weight"
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="age" className="form-label">
            Niên đại
          </label>
          <select
            ref={ageInputRef}
            className="form-control form-select"
            id="age"
            defaultValue={""}
            required
          >
            <option value="" disabled>
              Chọn niên đại...
            </option>
            {ages.map((age) => (
              <option key={age.age_id} value={age.age_id}>
                {age.name}
              </option>
            ))}
          </select>
          <div className="invalid-feedback">Nguyên liệu là bắt buộc</div>
        </div>
        <div className="col-md-3">
          <label htmlFor="material" className="form-label">
            Nguyên liệu
          </label>
          <select
            ref={materialInputRef}
            className="form-control form-select"
            id="material"
            defaultValue={""}
            required
          >
            <option value="" disabled>
              Chọn nguyên liệu...
            </option>
            {materials.map((material) => (
              <option key={material.material_id} value={material.material_id}>
                {material.name}
              </option>
            ))}
          </select>
          <div className="invalid-feedback">Niên đại là bắt buộc</div>
        </div>
        <Date
          className="col-md-3"
          date={date}
          handleChange={handleChangeDate}
          label="Ngày thu thập"
        />
        <div className="col-md-6">
          <label htmlFor="feature_image" className="form-label">
            Ảnh đại diện hiện vật:
          </label>
          <input
            ref={featureImageInputRef}
            className="form-control"
            type="file"
            id="feature_image"
            required
          />
          <div className="invalid-feedback">Ảnh đại diện là bắt buộc</div>
        </div>
        <div className="col-md-6">
          <label htmlFor="images" className="form-label">
            Các ảnh hiện vật:
          </label>
          <input
            ref={imagesInputRef}
            className="form-control"
            type="file"
            id="images"
            multiple
          />
        </div>
        <div className="col-12">
          <label htmlFor="description" className="form-label">
            Mô tả
          </label>
          <Editor changeDescriptionHandler={changeDescriptionHandler} />
        </div>
        <div className="col-12">
          <button className="btn btn-primary" type="submit">
            Thêm hiện vật
          </button>
        </div>
      </form>
    </>
  );
}

export default AddItem;
