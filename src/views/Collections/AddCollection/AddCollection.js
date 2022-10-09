import React, { useEffect, useRef, useState } from 'react';
import { createCollection } from 'api/collection';
import DialogImageList from 'components/Dialog/DialogImageList';
import Button from '@material-ui/core/Button';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { titleActions } from '../../../store/title';
import { getAllItems } from 'api/item';
import { useHistory } from 'react-router-dom';
import Modal from 'UI/Modal';
import Loader from 'UI/Loader';

const AddCollection = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [image, setImage] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const descriptionInputRef = useRef();
  const [itemsData, setItemsData] = useState([]);

  useEffect(() => {
    getAllItems().then((response) => {
      console.log(response.data.items);
      setItemsData(response.data.items);
    });
  }, []);

  useEffect(() => {
    dispatch(titleActions.setTitle(' > Thêm mới bộ sưu tập'));
  }, [dispatch]);

  const getAllCheckedItems = (data) => setCheckedItems(data);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!e.target.checkValidity()) {
      return setIsValidated(true);
    }
    const formData = new FormData();

    formData.append('title', titleInputRef.current.value);
    formData.append('description', descriptionInputRef.current.value);
    formData.append('image', imageInputRef.current.files[0]);
    checkedItems.forEach((element) => {
      console.log(element);
      formData.append('itemIdList', element);
    });

    if (checkedItems.length) {
      setIsLoading(true);
      createCollection(formData).then((response) => {
        setIsLoading(false);
        if (response.status === 201) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Bạn đã tạo bộ sưu tập thành công!',
            showConfirmButton: false,
            timer: 2000,
          });
          history.push('/admin/collections');
        }
      });
    } else {
      console.log('length must be greater than 0');
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Phải có ít nhất 1 hiện vật trong bộ sưu tập!',
      });
    }
  };

  const changeImageHandler = () => {
    if (imageInputRef.current.files.length > 0)
      setImage(URL.createObjectURL(imageInputRef.current.files[0]));
    else setImage(false);
  };

  return (
    <>
      {isLoading && <Modal children={<Loader />} />}
      <form
        className={`row g-3 needs-validation ${
          isValidated ? 'was-validated' : ''
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
            <div className="invalid-feedback">
              Tiêu đề bộ sưu tập là bắt buộc
            </div>
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
          <div className="mb-3">
            <DialogImageList
              getAllCheckedItems={getAllCheckedItems}
              itemsData={itemsData}
              filterItemList={[]}
            />
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
        <div className="col-12 d-flex justify-content-end">
          <Button variant="contained" color="primary" type="submit">
            Thêm bộ sưu tập
          </Button>
        </div>
      </form>
    </>
  );
};

export default AddCollection;
