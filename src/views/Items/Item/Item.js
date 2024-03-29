import Date from "components/Date/Date";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  deleteImages,
  getAges,
  getItem,
  getMaterials,
  updateItem,
} from "../../../api/item";
import Editor from "../../../components/Editor/Editor";
import { titleActions } from "../../../store/title";
import Loader from "../../../UI/Loader";
import Modal from "../../../UI/Modal";
import ItemImage from "./ItemImage";

function Item(props) {
  const id = useParams().id;
  const history = useHistory();
  const dispatch = useDispatch();

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

  const [item, setItem] = useState({});
  const [ages, setAges] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [deleteImageList, setDeleteImageList] = useState([]);
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    dispatch(titleActions.setTitle(" > Hiện vật"));
    Promise.all([getAges(), getMaterials(), getItem(id)]).then((responses) => {
      setAges(responses[0].data);
      setMaterials(responses[1].data);
      if (responses[2].status !== 200) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Đã có lỗi xảy ra.",
        });
        history.goBack();
      } else {
        console.log(responses[2].data.item);
        setItem(responses[2].data.item);
        setDate(responses[2].data.item.collected_date || "");
        setIsLoading(false);
      }
    });
  }, [id, dispatch]);

  const changeDescriptionHandler = useCallback((value) => {
    setDescription(value);
  }, []);

  const handleChangeDate = (newValue) => {
    setDate(newValue);
  };

  const showImageHandler = (src) => {
    setShowImage(src);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(description);
    if (!e.target.checkValidity()) {
      return setIsValidated(true);
    }

    Swal.fire({
      text: "Bạn có chắc chắn muốn cập nhật thông tin cho hiện vật này không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Cập nhật",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = new FormData();

        formData.append("name", nameInputRef.current.value);
        formData.append("original", originalInputRef.current.value);
        formData.append("dimension", dimensionInputRef.current.value);
        formData.append("weight", weightInputRef.current.value);
        formData.append("ageId", ageInputRef.current.value);
        formData.append("materialId", materialInputRef.current.value);
        formData.append(
          "collected_date",
          typeof date === "object" ? null : date
        );
        formData.append("description", description);
        if (featureImageInputRef.current.files.length > 0) {
          formData.append(
            "feature_image",
            featureImageInputRef.current.files[0]
          );
        }
        if (imagesInputRef.current.files.length > 0) {
          for (const file of imagesInputRef.current.files) {
            formData.append("images", file);
          }
        }

        setIsLoading(true);

        updateItem(id, formData).then((response) => {
          if (response.status === 200) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Hiện vật của bạn đã được cập nhật",
              showConfirmButton: false,
              timer: 2000,
            });
            history.push("/");
          } else {
            setIsLoading(false);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Đã có lỗi xảy ra.",
            });
          }
        });
      }
    });
  };

  const addDeleteImage = (id) => {
    const copyDeleteImageList = [...deleteImageList];
    const index = copyDeleteImageList.indexOf(id);

    if (index === -1) {
      copyDeleteImageList.push(id);
    } else {
      copyDeleteImageList.splice(index, 1);
    }

    setDeleteImageList(copyDeleteImageList);
  };

  function deleteImagesHandler() {
    Swal.fire({
      title: "Bạn có chắc chắn muốn xóa những tấm ảnh đã chọn?",
      text: "Bạn sẽ không thể hoàn tác việc này!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteImages(id, {
          deleteImages: deleteImageList,
        }).then((result) => {
          const newItem = { ...item };

          newItem.images = newItem.images.filter((value) => {
            return !deleteImageList.includes(value.image_id);
          });
          setItem(newItem);
          setDeleteImageList([]);
          Swal.fire(
            "Đã xóa!",
            "Các ảnh của bạn đã được xóa thành công!",
            "success"
          );
        });
      }
    });
  }

  return (
    <>
      {isLoading && <Modal children={<Loader />} />}
      {!isLoading && showImage && (
        <Modal handleCloseModal={() => setShowImage(false)}>
          <ItemImage
            imageSrc={showImage}
            handleCloseModal={() => setShowImage(false)}
          />
        </Modal>
      )}
      {!isLoading && (
        <div className="row">
          <h3 className="mb-3">Chi tiết hiện vật</h3>
          <div className="col-md-4">
            <img
              width="100%"
              className="rounded"
              src={item.feature_image}
              alt="Không có ảnh"
            />
          </div>
          <div className="col-md-8">
            <h5>
              <span className="fw-bold">Trạng thái:</span>{" "}
              <span className={item.status ? "text-success" : "text-danger"}>
                {item.status ? "Đã được duyệt" : "Chưa được duyệt"}
              </span>
            </h5>
            <form
              className={`row g-3 needs-validation ${
                isValidated ? "was-validated" : ""
              }`}
              noValidate
              onSubmit={submitHandler}
            >
              <div className="col-md-4">
                <label htmlFor="name" className="form-label">
                  Tên hiện vật:
                </label>
                <input
                  disabled={item.status}
                  ref={nameInputRef}
                  type="text"
                  className="form-control"
                  style={{ outline: "none" }}
                  defaultValue={item.name}
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
                  disabled={item.status}
                  ref={originalInputRef}
                  defaultValue={item.original}
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
                  disabled={item.status}
                  ref={dimensionInputRef}
                  defaultValue={item.dimension}
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
                  disabled={item.status}
                  ref={weightInputRef}
                  defaultValue={item.weight}
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
                {!!item.status && (
                  <input
                    disabled
                    defaultValue={item.age.name}
                    className="form-control"
                  />
                )}
                {!item.status && (
                  <>
                    <select
                      disabled={item.status}
                      ref={ageInputRef}
                      className="form-select"
                      id="age"
                      defaultValue={item.ageId || ""}
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
                    <div className="invalid-feedback">
                      Nguyên liệu là bắt buộc
                    </div>
                  </>
                )}
              </div>
              <div className="col-md-3">
                <label htmlFor="material" className="form-label">
                  Nguyên liệu
                </label>
                {!!item.status && (
                  <input
                    disabled
                    defaultValue={item.material.name}
                    className="form-control"
                  />
                )}
                {!item.status && (
                  <>
                    <select
                      ref={materialInputRef}
                      className="form-select"
                      id="material"
                      defaultValue={item.materialId || ""}
                      required
                    >
                      <option value="" disabled>
                        Chọn nguyên liệu...
                      </option>
                      {materials.map((material) => (
                        <option
                          key={material.material_id}
                          value={material.material_id}
                        >
                          {material.name}
                        </option>
                      ))}
                    </select>
                    <div className="invalid-feedback">Niên đại là bắt buộc</div>
                  </>
                )}
              </div>
              {/* <div className="col-md-3">
                <label htmlFor="date" className="form-label">
                  Ngày thu thập:
                </label>
                <input
                  disabled={item.status}
                  ref={dateInputRef}
                  type="date"
                  className="form-control"
                  id="date"
                  defaultValue={item.collected_date || "2015-12-31"}
                />
              </div> */}
              <Date
                className="col-md-3"
                date={date}
                handleChange={handleChangeDate}
                label="Ngày thu thập"
              />
              {!item.status && (
                <>
                  <div className="col-md-6">
                    <label htmlFor="feature_image" className="form-label">
                      Thay đổi ảnh đại diện hiện vật:
                    </label>
                    <input
                      ref={featureImageInputRef}
                      className="form-control"
                      type="file"
                      id="feature_image"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="images" className="form-label">
                      Thêm các ảnh hiện vật:
                    </label>
                    <input
                      ref={imagesInputRef}
                      className="form-control"
                      type="file"
                      id="images"
                      multiple
                    />
                  </div>
                </>
              )}
              <div className="col-12">
                <label htmlFor="description" className="form-label">
                  Mô tả
                </label>
                {!!item.status && (
                  <div className="card">
                    <div
                      className="card-body"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                  </div>
                )}
                {!item.status && (
                  <Editor
                    value={item.description}
                    changeDescriptionHandler={changeDescriptionHandler}
                  />
                )}
              </div>
              {!item.status && (
                <div className="col-12">
                  <button className="btn btn-primary" type="submit">
                    Cập nhật hiện vật
                  </button>
                </div>
              )}
            </form>
          </div>
          <div className="col-md-12 row mt-5">
            <div className="col-md-12 fw-bold fs-4 text-center">
              Tất cả ảnh của hiện vật
            </div>
            {item.images.length > 0 && (
              <>
                {item.images.map((image) => (
                  <div key={image.image_id} className="col-md-4 mt-5">
                    {!item.status && (
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          onClick={addDeleteImage.bind(null, image.image_id)}
                        />
                      </div>
                    )}
                    <img
                      width="100%"
                      height="220px"
                      className="image-link rounded"
                      style={{ objectFit: "cover" }}
                      src={image.url}
                      alt=""
                      onClick={showImageHandler.bind(null, image.url)}
                    />
                  </div>
                ))}
                {!item.status && (
                  <div className="col-md-12 mt-4">
                    <button
                      className="btn btn-danger"
                      disabled={!deleteImageList.length}
                      onClick={deleteImagesHandler}
                    >
                      Xóa các ảnh đã chọn
                    </button>
                  </div>
                )}
              </>
            )}
            {item.images.length === 0 && (
              <span className="fs-5">Không có ảnh nào</span>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Item;
