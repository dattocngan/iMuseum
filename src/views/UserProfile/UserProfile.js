import { getCollectorInformation, updateCollectorInformation } from 'api/http';
import React, { useEffect, useState } from 'react';
import Loader from 'UI/Loader';
import Modal from 'UI/Modal';
import Swal from 'sweetalert2';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { TextField } from '@material-ui/core';
import dayjs from 'dayjs';

export default function UserProfile() {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [profileInput, setProfileInput] = useState({
    fullname: '',
    mobile: '',
    email: '',
    address: '',
    birthday: '',
    sex: null,
    introduction: '',
  });
  const [birthday, setBirthday] = useState(dayjs('2015-12-31'));

  const [passwordInput, setPasswordInput] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [isEqual, setIsEqual] = useState(false);
  const [isLoadingDataFromDb, setIsLoadingDataFromDb] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsEqual(
      !passwordInput.newPassword.localeCompare(passwordInput.confirmPassword)
        ? true
        : false
    );
  }, [passwordInput.newPassword, passwordInput.confirmPassword]);

  useEffect(() => {
    setIsLoadingDataFromDb(true);
    getCollectorInformation().then((response) => {
      if (response.status === 200) {
        console.log(response.data.birth_date);
        setProfileInput({
          fullname: response.data.full_name || '',
          mobile: response.data.mobile || '',
          email: response.data.email || '',
          address: response.data.address || '',
          birthday: response.data.birth_date || '',
          sex: String(response.data.sex !== null ? response.data.sex : '0'),
          introduction: response.data.introduction || '',
        });
        setBirthday(dayjs(response.data.birth_date || '2015-12-31'));
      }
      setIsLoadingDataFromDb(false);
    });
  }, []);

  const handleChangeBirthday = (newValue) => {
    setBirthday(newValue);
  };

  const onChangeProfileInput = (e) => {
    setProfileInput({
      ...profileInput,
      [e.target.name]: e.target.value,
    });
  };

  const onChangePasswordInput = (e) => {
    setPasswordInput({
      ...passwordInput,
      [e.target.name]: e.target.value,
    });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    setIsValidated(true);
    if (!e.target.checkValidity()) {
      return;
    }

    if (!isChangingPassword) {
      setIsLoading(true);
      console.log(birthday);
      updateCollectorInformation({
        fullname: profileInput.fullname,
        mobile: profileInput.mobile,
        email: profileInput.email,
        address: profileInput.address,
        birth_date: new Date(birthday.$d),
        sex: profileInput.sex,
        introduction: profileInput.introduction,
      }).then((response) => {
        setIsLoading(false);
        if (response.status === 200) {
          Swal.fire('Thành công!', response.data.message, 'success');
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.data.message,
          });
        }
      });
    }

    if (isChangingPassword && isEqual) {
      setIsLoading(true);
      const data = {
        oldPassword: passwordInput.oldPassword,
        newPassword: passwordInput.newPassword,
      };
      updateCollectorInformation(data).then((response) => {
        console.log(response);
        setIsLoading(false);
        if (response.status === 200) {
          Swal.fire('Thành công!', response.data.message, 'success');
          setPasswordInput({
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
          });
          setIsValidated(false);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text:
              response.status !== 500
                ? response.data.message
                : 'Something went wrong',
          });
        }
      });
    }
  };

  return (
    <>
      {isLoading && <Modal children={<Loader />} />}
      {isLoadingDataFromDb && <Loader />}
      <div className="d-flex align-items-center justify-content-between">
        <h3>
          {!isChangingPassword ? 'Thông tin cá nhân' : 'Thay đổi mật khẩu'}
        </h3>
        <button
          className="btn btn-primary text-white"
          style={{ width: '180px' }}
          onClick={() => setIsChangingPassword(!isChangingPassword)}
        >
          {isChangingPassword ? 'Thông tin cá nhân' : 'Thay đổi mật khẩu'}
        </button>
      </div>
      {!isLoadingDataFromDb && !isChangingPassword && (
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
              name="fullname"
              id="fullname"
              placeholder="Họ và tên..."
              value={profileInput.fullname}
              onChange={onChangeProfileInput}
            />
          </div>

          <div className="col-md-3">
            <label htmlFor="mobile" className="form-label">
              Số điện thoại
            </label>
            <input
              type="text"
              className="form-control"
              name="mobile"
              id="mobile"
              placeholder="Số điện thoại..."
              value={profileInput.mobile}
              onChange={onChangeProfileInput}
            />
          </div>

          <div className="col-md-5">
            <label htmlFor="email" className="form-label">
              Địa chỉ Email
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              id="email"
              placeholder="Địa chỉ Email..."
              value={profileInput.email}
              onChange={onChangeProfileInput}
            />
          </div>

          <div className="col-md-8">
            <label htmlFor="address" className="form-label">
              Địa chỉ nhà
            </label>
            <input
              type="text"
              className="form-control"
              name="address"
              id="address"
              placeholder="Địa chỉ..."
              value={profileInput.address}
              onChange={onChangeProfileInput}
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="address" className="form-label">
              Ngày sinh
            </label>
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label=""
                  inputFormat="DD/MM/YYYY"
                  value={birthday}
                  onChange={handleChangeBirthday}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
          </div>

          <div>
            <p className="mb-1">Giới tính</p>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="sex"
                id="male"
                value={0}
                onChange={onChangeProfileInput}
                defaultChecked={profileInput.sex === '0' ? true : false}
              />
              <label className="form-check-label" htmlFor="male">
                Nam
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="sex"
                value={1}
                id="female"
                onChange={onChangeProfileInput}
                defaultChecked={profileInput.sex === '0' ? false : true}
              />
              <label className="form-check-label" htmlFor="female">
                Nữ
              </label>
            </div>
          </div>

          <div className="col-md-12">
            <label htmlFor="introduction" className="form-label">
              Giới thiệu
            </label>
            <textarea
              type="text"
              className="form-control w-100"
              name="introduction"
              id="introduction"
              placeholder="Một vài thông tin về bản thân..."
              style={{ height: '150px' }}
              onChange={onChangeProfileInput}
              value={profileInput.introduction}
            />
          </div>
          <div className="col-12">
            <button className="btn btn-primary" type="submit">
              Cập nhật
            </button>
          </div>
        </form>
      )}

      {!isLoadingDataFromDb && isChangingPassword && (
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
              name="oldPassword"
              minLength={8}
              value={passwordInput.oldPassword}
              onChange={onChangePasswordInput}
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
              name="newPassword"
              minLength={8}
              value={passwordInput.newPassword}
              onChange={onChangePasswordInput}
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
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Xác nhận khẩu mới..."
              name="confirmPassword"
              minLength={8}
              value={passwordInput.confirmPassword}
              onChange={onChangePasswordInput}
              required
            />
            <div className="invalid-feedback">
              Nhập mật khẩu hợp lệ (ít nhất 8 chữ số)
            </div>
          </div>

          <div className="col-12">
            <button className="btn btn-primary" type="submit">
              Đổi mật khẩu
            </button>
          </div>
        </form>
      )}
    </>
  );
}
