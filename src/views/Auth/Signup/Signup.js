import React, {useRef, useState} from 'react';

import classes from "./Signup.module.css";
import {Link, useHistory} from "react-router-dom";

import axios from "../../../api/axios";

function Signup() {
    const history = useHistory();

    const phoneInputRef = useRef();
    const nameInputRef = useRef();
    const passwordInputRef = useRef();
    const confirmPasswordInputRef = useRef();

    const [errorName, setErrorName] = useState();
    const [errorPhone, setErrorPhone] = useState();
    const [errorPassword, setErrorPassword] = useState();
    const [errorConfirmPassword, setErrorConfirmPassword] = useState();
    const [invalidForm, setInvalidForm] = useState(false);

    function onlyNumbers(str) {
        return /^[0-9]+$/.test(str);
    }

    const submitFormHandler = async (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredPhone = phoneInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        const enteredConfirmPassword = confirmPasswordInputRef.current.value;

        if (enteredName.length === 0) {
            setInvalidForm(false);
            setErrorName('Không được để trống');
            return;
        }
        setErrorName();

        if (enteredPhone.length < 10 || !onlyNumbers(enteredPhone) || enteredPhone[0] !== '0') {
            setInvalidForm(false);
            setErrorPhone("Số điện thoại không hợp lệ");
            return;
        }
        setErrorPhone();

        if (enteredPassword.length < 8) {
            setInvalidForm(false);
            setErrorPassword('Mật khẩu chứa ít nhất 8 kí tự');
            return;
        }
        setErrorPassword();

        if (enteredConfirmPassword.length < 8) {
            setInvalidForm(false);
            setErrorConfirmPassword('Mật khẩu chứa ít nhất 8 kí tự');
            return;
        } else if (enteredPassword !== enteredConfirmPassword) {
            setInvalidForm(false);
            setErrorConfirmPassword('Mật khẩu không khớp');
            return;
        }

        setErrorConfirmPassword();

        try {
            const {data} = await axios.post('auth/signup', {
                name: enteredName,
                mobile: enteredPhone,
                password: enteredPassword
            }, {withCredentials: true});

            if (data) {
                history.push({
                    pathname: '/auth/signup/verify',
                    state: {
                        mobile: enteredPhone
                    }
                });
            } else {
                throw Error('Validation failed');
            }
        } catch (e) {
            setInvalidForm(true);
        }
    };

    return (
        <div className={classes.layout}>
            <div className="card">
                {invalidForm && <span className={`text-center mt-2 ${classes.invalid}`}>SĐT đã được đăng kí</span>}
                <article className="card-body">
                    <Link to="/auth/login" className="float-right btn btn-outline-primary">Đăng nhập</Link>
                    <h4 className="card-title mb-4 mt-1">iMuseum</h4>
                    <form onSubmit={submitFormHandler}>
                        <div className="form-group">
                            <label>Họ và tên</label>
                            <input className="form-control" type="text" ref={nameInputRef} />
                            {!!errorName && <p className={classes.invalid}>{errorName}</p>}
                        </div>
                        <div className="form-group">
                            <label>Số điện thoại</label>
                            <input name="phone" className="form-control" type="tel" ref={phoneInputRef} maxLength={10} width={10}  />
                            {!!errorPhone && <p className={classes.invalid}>{errorPhone}</p>}
                        </div>
                        <div className="form-group">
                            <label>Mật khẩu</label>
                            <input className="form-control" placeholder="******" type="password" ref={passwordInputRef} />
                            {!!errorPassword && <p className={classes.invalid}>{errorPassword}</p>}
                        </div>
                        <div className="form-group">
                            <label>Nhập lại mật khẩu</label>
                            <input className="form-control" placeholder="******" type="password" ref={confirmPasswordInputRef} />
                            {!!errorConfirmPassword && <p className={classes.invalid}>{errorConfirmPassword}</p>}
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block">Đăng kí</button>
                        </div>
                    </form>
                </article>
            </div>
        </div>
    );
}

export default Signup;
