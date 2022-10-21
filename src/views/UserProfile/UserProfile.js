import { getCollectorInformation, updateCollectorInformation } from "api/http";
import Date from "components/Date/Date";
import Editor from "components/Editor/Editor";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import Loader from "UI/Loader";
import Modal from "UI/Modal";
import { titleActions } from "../../store/title";

export default function UserProfile() {
  const dispatch = useDispatch();

  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [profileInput, setProfileInput] = useState({
    fullname: "",
    mobile: "",
    email: "",
    address: "",
    birthday: "",
    sex: null,
    introduction: "",
  });
  const [introduction, setIntroduction] = useState("");
  const [birthday, setBirthday] = useState(dayjs(""));

  const [passwordInput, setPasswordInput] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isEqual, setIsEqual] = useState(false);
  const [isLoadingDataFromDb, setIsLoadingDataFromDb] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(titleActions.setTitle(" > Thông tin cá nhân"));
    setIsEqual(
      !passwordInput.newPassword.localeCompare(passwordInput.confirmPassword)
    );
  }, [passwordInput.newPassword, passwordInput.confirmPassword, dispatch]);
  useEffect(() => {
    setIsLoadingDataFromDb(true);
    getCollectorInformation().then((response) => {
      if (response.status === 200) {
        setProfileInput({
          fullname: response.data.full_name || "",
          mobile: response.data.mobile || "",
          email: response.data.email || "",
          address: response.data.address || "",
          birthday: response.data.birth_date || "",
          sex: String(response.data.sex !== null ? response.data.sex : "0"),
          introduction: response.data.introduction || "",
        });
        setBirthday(dayjs(response.data.birth_date || ""));
      }
      setIsLoadingDataFromDb(false);
    });
  }, []);

  const changeIntroductionHandler = useCallback((value) => {
    setIntroduction(value);
  }, []);

  const handleChangeBirthday = (newValue) => {
    // console.log(newValue);
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
    console.log(introduction);
    if (!e.target.checkValidity()) {
      return setIsValidated(true);
    }

    if (!isChangingPassword) {
      setIsLoading(true);
      if (!birthday) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ngày sinh không được để trống.",
        });
        setIsLoading(false);
        return;
      }
      updateCollectorInformation({
        full_name: profileInput.fullname,
        mobile: profileInput.mobile,
        email: profileInput.email,
        address: profileInput.address,
        birth_date: birthday,
        sex: profileInput.sex,
        introduction: introduction, //cai nay la dung cua editor
      }).then((response) => {
        setIsLoading(false);
        console.log(response);
        if (response.status === 200) {
          localStorage.setItem("name", profileInput.fullname);
          Swal.fire("Thành công!", response.data.message, "success");
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Đã có lỗi xảy ra.",
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
          Swal.fire("Thành công!", response.data.message, "success");
          setPasswordInput({
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
          setIsValidated(false);
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text:
              response.status !== 500
                ? response.data.message
                : "Something went wrong",
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
          {!isChangingPassword ? "Thông tin cá nhân" : "Thay đổi mật khẩu"}
        </h3>
        <button
          className="btn btn-primary text-white"
          style={{ width: "180px" }}
          onClick={() => setIsChangingPassword(!isChangingPassword)}
        >
          {isChangingPassword ? "Thông tin cá nhân" : "Thay đổi mật khẩu"}
        </button>
      </div>
      {!isLoadingDataFromDb && !isChangingPassword && (
        <form
          className={`row g-3 needs-validation ${
            isValidated ? "was-validated" : ""
          }`}
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
              required
            />
            <div className="invalid-feedback">Tên người dùng là bắt buộc</div>
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
              disabled
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

          <Date
            className="col-md-4"
            date={birthday}
            handleChange={handleChangeBirthday}
            label="Ngày sinh"
          />

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
                defaultChecked={profileInput.sex === "0"}
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
                defaultChecked={profileInput.sex !== "0"}
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
            <Editor
              value={profileInput.introduction}
              changeDescriptionHandler={changeIntroductionHandler}
              placeholder="Vài dòng giới thiệu bản thân..."
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
            isValidated ? "was-validated" : ""
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
