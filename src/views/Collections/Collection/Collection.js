import { getCollection } from 'api/collection';
import DialogImageList from 'components/Dialog/DialogImageList';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loader from 'UI/Loader';
import Modal from 'UI/Modal';

const Collection = () => {
  const [isValidated, setIsValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [collection, setCollection] = useState({});
  const [collectionItemsIdList, setCollectionItemsIdList] = useState([]);
  const [image, setImage] = useState(false);
  const [deleteItemList, setDeleteItemList] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);

  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const descriptionInputRef = useRef();

  const { id: collection_id } = useParams();
  // useEffect(() => console.log(collection), [collection]);
  useEffect(() => {
    setIsLoading(true);
    getCollection(collection_id).then((response) => {
      if (response.status === 200) {
        setCollection(response.data.data);
        setCollectionItemsIdList(
          response.data.data.items.map((item) => item.item_id)
        );
      }
      setIsLoading(false);
    });
  }, [collection_id]);

  const submitHandler = (e) => {
    e.preventDefault();
    setIsValidated(true);
    if (!e.target.checkValidity()) {
      return;
    }
    const formData = new FormData();
    formData.append('title', titleInputRef.current.value);
    formData.append('description', descriptionInputRef.current.value);
    if (imageInputRef.current.files.length > 0) {
      formData.append('image', imageInputRef.current.files[0]);
    }
    if (checkedItems.length > 0) {
      checkedItems.forEach((item) => {
        formData.append('itemIdList', item);
      });
    }
  };

  const getAllCheckedItems = (data) => setCheckedItems(data);

  const addDeleteItemHandler = (item_id) => {
    const copyDeleteItem = [...deleteItemList];
    const idx = copyDeleteItem.indexOf(item_id);
    if (idx === -1) {
      copyDeleteItem.push(item_id);
    } else {
      copyDeleteItem.splice(idx, 1);
    }

    setDeleteItemList(copyDeleteItem);
  };

  const changeImageHandler = () => {
    if (imageInputRef.current.files[0]) {
      setImage(URL.createObjectURL(imageInputRef.current.files[0]));
    }
  };

  const deleteItemHandler = () => {
    console.log(deleteItemList);
  };

  return (
    <>
      {isLoading && <Modal children={<Loader />} />}
      {!isLoading && (
        <div className="row">
          <h3 className="mb-3">Chi tiết bộ sưu tập</h3>
          <div className="col-md-4">
            <img
              width="100%"
              src={image || collection.image}
              className="rounded"
              alt="Không có ảnh"
            />

            {image && (
              <p className="mt-2 text-danger">
                Hãy cập nhật bộ sưu tập để đổi ảnh đại diện
              </p>
            )}
          </div>
          <div className="col-md-8">
            <h5>
              <span className="fw-bold">Trạng thái:</span>{' '}
              <span
                className={collection.status ? 'text-success' : 'text-danger'}
              >
                {collection.status ? 'Đã được duyệt' : 'Chưa được duyệt'}
              </span>
            </h5>

            <form
              className={`row g-3 needs-validation ${
                isValidated ? 'was-validated' : ''
              }`}
              noValidate
              onSubmit={submitHandler}
            >
              <div className="col-md-6">
                <label htmlFor="title" className="form-label">
                  Tên bộ sưu tập
                </label>
                <input
                  disabled={collection.status}
                  ref={titleInputRef}
                  type="text"
                  className="form-control"
                  style={{ outline: 'none' }}
                  defaultValue={collection.title}
                  id="title"
                  required
                />
                <div className="invalid-feedback">
                  Tên bộ sưu tập là bắt buộc
                </div>
              </div>

              {!collection.status && (
                <>
                  <div className="col-md-6">
                    <label htmlFor="feature_image" className="form-label">
                      Thay đổi ảnh đại diện bộ sưu tập:
                    </label>
                    <input
                      ref={imageInputRef}
                      className="form-control"
                      type="file"
                      id="image"
                      onChange={changeImageHandler}
                    />
                  </div>
                </>
              )}

              <div className="col-12">
                <label htmlFor="description" className="form-label">
                  Mô tả
                </label>
                <textarea
                  disabled={collection.status}
                  ref={descriptionInputRef}
                  className="form-control"
                  defaultValue={collection.description}
                  id="description"
                  rows="7"
                ></textarea>
              </div>

              {!collection.status && (
                <>
                  <div className="col d-flex gap-3 align-items-start">
                    <DialogImageList
                      getAllCheckedItems={getAllCheckedItems}
                      filterItemList={collectionItemsIdList}
                    />
                    <button className="btn btn-primary" type="submit">
                      Cập nhật bộ sưu tập
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>

          <div className="col-md-12 row mt-5">
            <div className="col-md-12 fw-bold fs-4 text-center">
              Các hiện vật của bộ sưu tập
            </div>
            {collection.items && collection.items.length > 0 && (
              <>
                {collection.items.map((item) => (
                  <div key={item.item_id} className="col-md-4 mt-5">
                    {!collection.status && (
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          onClick={addDeleteItemHandler.bind(
                            null,
                            item.item_id
                          )}
                        />
                        <label className="form-label text-black fs-5">
                          {item.name}
                        </label>
                      </div>
                    )}
                    <Link to={`/admin/items/${item.item_id}`}>
                      <img
                        width="100%"
                        height="180px"
                        style={{ objectFit: 'cover' }}
                        className="image-link rounded"
                        src={item.feature_image}
                        alt=""
                      />
                    </Link>
                  </div>
                ))}

                {!collection.status && (
                  <div className="col-md-12 mt-4">
                    {deleteItemList.length === collection.items.length && (
                      <p className="mb-2 fw-bold text-danger">
                        Bạn không thể xóa toàn bộ hiện vật của bộ sưu tập!
                      </p>
                    )}
                    <button
                      className="btn btn-danger"
                      disabled={
                        !deleteItemList.length ||
                        deleteItemList.length === collection.items.length
                      }
                      onClick={deleteItemHandler}
                    >
                      Xóa các ảnh đã chọn
                    </button>
                  </div>
                )}
              </>
            )}
            {collection.items && collection.items.length === 0 && (
              <span className="fs-5 mt-3">
                Bộ sưu tập hiện tại không có hiện vật nào.
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Collection;
