import React, { useRef, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import Countdown from "react-countdown";

import classes from "./Verify.module.css";
import { refreshOtp, verify } from "../../../api/http";

function Verify() {
  const history = useHistory();
  const otpInputRef = useRef();
  const [errorOTP, setErrorOTP] = useState(false);
  const [invalidForm, setInvalidForm] = useState("");
  const [refreshOTP, setRefreshOTP] = useState(false);
  const [refreshTime, setRefreshTime] = useState("");
  const [refreshMessage, setRefreshMessage] = useState("");

  if (history.location.state === undefined) {
    return <Redirect to="/auth/login" />;
  }

  const mobile = history.location.state.mobile;

  function onlyNumbers(str) {
    return /^[0-9]+$/.test(str);
  }

  const submitFormHandler = async (e) => {
    e.preventDefault();

    const enteredOTP = otpInputRef.current.value;
    if (enteredOTP.length !== 4 || !onlyNumbers(enteredOTP)) {
      setInvalidForm("");
      setErrorOTP(true);
      return;
    }
    setErrorOTP(false);
    try {
      const response = await verify({
        mobile: mobile,
        otp: enteredOTP,
      });

      if (response.status !== 201) {
        throw new Error(response.data["message"]);
      } else {
        alert("Đăng kí thành công!");
        history.push("/auth/login");
      }
    } catch (err) {
      setInvalidForm(err.message);
    }
  };
  const refreshOTPHandler = async () => {
    setInvalidForm("");
    const x = new Date();
    setRefreshTime(x.toString());
    try {
      const response = await refreshOtp({
        mobile: mobile,
      });

      if (response.status === 200) {
        setRefreshOTP(true);
        setRefreshMessage(response.data["message"]);
      } else {
        throw new Error(response.data["message"]);
      }
    } catch (err) {
      setRefreshMessage(err.message);
    }
  };

  const renderer = ({ minutes, seconds }) => {
    return (
      <span className={classes.time}>
        {minutes}:{seconds}
      </span>
    );
  };

  const completeHandler = () => {
    setRefreshOTP(false);
    setRefreshTime("");
  };

  return (
    <div className={classes.layout}>
      <div className="card">
        {invalidForm && (
          <span className={`text-center mt-2 ${classes.invalid}`}>
            {invalidForm}
          </span>
        )}
        <article className="card-body">
          <h4 className="card-title mb-4 mt-1">iMuseum</h4>
          <form onSubmit={submitFormHandler}>
            <div className="form-group">
              <label>Vui lòng nhập mã xác thực:</label>
              <input
                className="form-control"
                type="text"
                ref={otpInputRef}
                maxLength={4}
              />
              {!!errorOTP && (
                <p className={classes.invalid}>OTP chứa 4 chữ số</p>
              )}
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block mt-3">
                Xác thực
              </button>
            </div>
            <div className="form-group d-flex mt-3">
              <button
                disabled={refreshOTP}
                type="button"
                className="btn btn-success btn-block w-50"
                onClick={refreshOTPHandler}
              >
                Gửi lại mã
              </button>
              {refreshOTP && (
                <Countdown
                  date={Date.parse(refreshTime) + 1000 * 60 * 3}
                  onComplete={completeHandler}
                  renderer={renderer}
                />
              )}
            </div>
            {refreshMessage && (
              <div className="form-group">
                <span>{refreshMessage}</span>
              </div>
            )}
          </form>
        </article>
      </div>
    </div>
  );
}

export default Verify;
