import React, { useState } from 'react';

export default function UserProfile() {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const submitHandler = (e) => {
    e.preventDefault();
    if (!e.target.checkValidity()) {
      setIsValidated(true);
    }
  };
  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <h3>Thông tin cá nhân</h3>
        <button
          className="btn btn-primary text-white"
          style={{ width: '180px' }}
          onClick={() => setIsChangingPassword(!isChangingPassword)}
        >
          {isChangingPassword ? 'Thông tin cá nhân' : 'Thay đổi mật khẩu'}
        </button>
      </div>
      {!isChangingPassword && (
        <form
          className={`row g-3 needs-validation`}
          noValidate
          onSubmit={submitHandler}
        >
          <div className="col-md-4">
            <label htmlFor="fullname" className="form-label">
              Họ và tên
            </label>
            <input
              type="text"
              className="form-control"
              id="fullname"
              placeholder="Họ và tên..."
            />
          </div>

          <div className="col-md-3">
            <label htmlFor="mobile" className="form-label">
              Số điện thoại
            </label>
            <input
              type="text"
              className="form-control"
              id="mobile"
              placeholder="Số điện thoại..."
            />
          </div>

          <div className="col-md-5">
            <label htmlFor="email" className="form-label">
              Địa chỉ Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Địa chỉ Email..."
            />
          </div>

          <div className="col-md-8">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              placeholder="Address..."
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="date" className="form-label">
              Birthday
            </label>
            <input type="date" className="form-control" id="date" />
          </div>

          <div>
            <p className="mb-1">Sex</p>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="sex"
                id="male"
              />
              <label className="form-check-label" htmlFor="male">
                Male
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="sex"
                id="female"
                defaultChecked
              />
              <label className="form-check-label" htmlFor="female">
                Female
              </label>
            </div>
          </div>

          <div className="col-md-12">
            <label htmlFor="introduction" className="form-label">
              Introduction
            </label>
            <textarea
              type="text"
              className="form-control w-100"
              id="introduction"
              placeholder="Some information about yourself..."
              style={{ height: '150px' }}
            />
          </div>
          <div className="col-12">
            <button className="btn btn-primary" type="submit">
              Submit form
            </button>
          </div>
        </form>
      )}

      {isChangingPassword && (
        <form
          className={`row g-3 needs-validation ${
            isValidated ? 'was-validated' : ''
          }`}
          noValidate
          onSubmit={submitHandler}
        >
          <div className="col-md-4">
            <label htmlFor="oldPassword" className="form-label">
              Mật khẩu cũ
            </label>
            <input
              type="password"
              className="form-control"
              id="oldPassword"
              placeholder="Nhập mật khẩu cũ..."
              required
            />
            <div className="invalid-feedback">
              Nhập mật khẩu hợp lệ (ít nhất 8 chữ số)
            </div>
          </div>
          <div className="col-md-4">
            <label htmlFor="newPassword" className="form-label">
              Mật khẩu mới
            </label>
            <input
              type="password"
              className="form-control"
              id="newPassword"
              placeholder="Nhập mật khẩu mới..."
              required
            />
            <div className="invalid-feedback">
              Nhập mật khẩu hợp lệ (ít nhất 8 chữ số)
            </div>
          </div>
          <div className="col-md-4">
            <label htmlFor="confirmPassword" className="form-label">
              Xác nhận mật khẩu
            </label>
            <input
              type="text"
              className="form-control"
              id="confirmPassword"
              placeholder="Xác nhận khẩu mới..."
              required
            />
            <div className="invalid-feedback">
              Nhập mật khẩu hợp lệ (ít nhất 8 chữ số)
            </div>
          </div>

          <div className="col-12">
            <button className="btn btn-primary" type="submit">
              Submit form
            </button>
          </div>
        </form>
      )}
    </>
  );
}
