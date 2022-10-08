import React, { useRef, useState } from "react";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import classes from "./Login.module.css";
import { login, setHeader } from "../../../api/http";
import { authActions } from "../../../store/auth";

function Login() {
  const dispatch = useDispatch();

  const phoneInputRef = useRef();
  const passwordInputRef = useRef();

  const [errorPhone, setErrorPhone] = useState();
  const [errorPassword, setErrorPassword] = useState();
  const [invalidForm, setInvalidForm] = useState(false);

  function onlyNumbers(str) {
    return /^[0-9]+$/.test(str);
  }

  const submitFormHandler = async (event) => {
    event.preventDefault();

    const enteredPhone = phoneInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (
      enteredPhone.length < 10 ||
      !onlyNumbers(enteredPhone) ||
      enteredPhone[0] !== "0"
    ) {
      setInvalidForm(false);
      setErrorPhone("Số điện thoại không hợp lệ");
      return;
    }
    setErrorPhone();

    if (enteredPassword.length < 8) {
      setInvalidForm(false);
      setErrorPassword("Mật khẩu chứa ít nhất 8 kí tự");
      return;
    }
    setErrorPassword();

    try {
      const response = await login({
        mobile: enteredPhone,
        password: enteredPassword,
      });

      if (response.status === 200) {
        setHeader(response.data.token);
        dispatch(authActions.login());
      } else {
        throw Error("Login failed");
      }
    } catch (e) {
      console.log(e);
      setInvalidForm(true);
    }
  };

  return (
    <div className={classes.layout}>
      <div className="card">
        {invalidForm && (
          <span className={`text-center mt-2 ${classes.invalid}`}>
            SĐT hoặc mật khẩu không đúng
          </span>
        )}
        <article className="card-body">
          <Link to="/auth/signup" className="float-end btn btn-outline-primary">
            Đăng kí
          </Link>
          <h4 className="card-title mb-4 mt-1">iMuseum</h4>
          <form onSubmit={submitFormHandler}>
            <div className="form-group">
              <label>Số điện thoại</label>
              <input
                name="phone"
                className="form-control"
                type="tel"
                ref={phoneInputRef}
                maxLength={10}
                width={10}
              />
              {!!errorPhone && <p className={classes.invalid}>{errorPhone}</p>}
            </div>
            <div className="form-group">
              <label>Mật khẩu</label>
              <input
                className="form-control"
                placeholder="******"
                type="password"
                ref={passwordInputRef}
              />
              {!!errorPassword && (
                <p className={classes.invalid}>{errorPassword}</p>
              )}
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary btn-block mt-4 form-control"
              >
                Đăng nhập
              </button>
            </div>
          </form>
        </article>
      </div>
    </div>
  );
}

export default Login;
