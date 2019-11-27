import React, {useState} from 'react';
import {ForgottenPassword} from "./ForgottenPassword";
import $ from 'jquery';
import {Router, navigate} from '@reach/router';

export const Authentication = ({message,login = f => f, register = f => f, reset = f => f}) => {


    const [data,setData] = useState({type : 2});
    const [slide, setSlide] = useState(0);
    const [missing, setMissing] = useState({});
    const [passwordView, setPasswordView] = useState(false);
    const [passwordReset, setPasswordReset] = useState(false);

    const submit = control => control === `r` ?  register(data) : login(data);


    const _formValidator = (e, control) => {
        e.preventDefault();
        if(control == "r"){
            if (data.email !== undefined && data.email.length > 0) {
                if(data.email.includes('@')){
                    if (data.passwordR !== undefined && data.passwordR.length > 0) {
                        setMissing({});
                        submit("r");
                    } else {
                        setMissing({value: 'password', message: `Nezadali ste heslo.`});
                        console.log(missing);
                    }
                }else {
                    setMissing({value: '@', message: `Nezadali ste nevhodný email.`});
                    console.log(missing);
                }
            } else {
                setMissing({value: 'email', message: `Nezadali ste email.`});
                console.log(missing);
            }
        }
        else {
            if (control == "l"){
                if (data.login !== undefined && data.login.length > 0) {
                    if (data.passwordL !== undefined && data.passwordL.length > 0) {
                        setMissing({});
                        submit("l");
                    } else {
                        setMissing({value: 'password', message: `Nezadali ste heslo.`});
                        console.log(missing);
                    }
                } else {
                    setMissing({value: 'login', message: `Nezadali ste login.`});
                    console.log(missing);
                }
            }
        }

    };

    const _forgottenPassword = () => {
       setPasswordReset(false);
    };

    const _loginFacebook = () => {
        console.log("login by facebook");
    };

    const _loginLinkedIn = () => {
        console.log("login by linkedin");
    };

    return (

            <div className={`authentication-form | container-fluid | row col-12 | align-items-center | m-0 p-0`} style={{height : $(window).height()}}>
                {
                    window.innerHeight <= 768 ? `` :
                        <video  autoPlay="autoplay" loop muted={`muted`} preload="auto" poster={"./images/poster.jpg"}>
                            <source src="./images/background-video.mp4" type="video/mp4" />
                            <source src="./images/background-video.webm" type="video/webm" />
                            <source src="./images/background-video.ogg" type="video/ogg" />
                        </video>
                }
                <div className={`content-frame | col-12 | px-0 m-0 `}>
                    {
                        passwordReset ?  <ForgottenPassword close={_forgottenPassword} reset={reset}/> : ``
                    }
                    <form id={`authentication-form`} className={`form row col-xl-4 col-lg-5 col-md-6 col-sm-12 col-12 | align-items-start | justify-content-center align-items-center | m-0`}>
                        <p>{message}</p>
                        <div className="col-11 justify-content-center row p-xl-1 pl-lg-1 p-md-1 p-sm-0 p-0">
                            <div className=" row m-0 p-0 col-12 header justify-content-center ">
                                <h1 className={`col-11 p-0 text-center sign-in`}>sign <span className="highlighted">{slide === 0 ? `in` : `up`}.</span></h1>
                            </div>
                            { slide === 0 ? `` :
                                <div className="choose row col-xl-8 col-lg-8 col-md-9 col-sm-10 col-11 p-0 shadow-sm my-4">
                                    <p className={`col-6 m-0 text-center px-0 py-2 ${data.type === 2 ? `on` : ``}`}  onClick={() => setData({...data, type : 2})}>personal</p>
                                    <p className={`col-6 m-0 text-center px-0 py-2 ${data.type === 1 ? `on` : ``}`}  onClick={() => setData({...data, type : 1})}>business</p>
                                </div>
                            }
                            <div className={` input col-11 mt-3 row p-0 mx-0 ${(missing.value === "@" || missing.value === "email" || missing.value === "login") ? `warning-frame` : ``}`}>
                                { slide === 0 ?
                                    <input
                                        id={`login`}
                                        type={`text`}
                                        name={`login`}
                                        onChange={(e) => setData({...data, login: e.target.value})}
                                        value={data.login ? data.login : ``}
                                        className={` pl-3 py-2 col-xl-10 col-lg-10 col-md-10 col-12`}
                                        placeholder={`Enter your login`}

                                    />
                                    :
                                    <input
                                        id={`email`}
                                        type={`text`}
                                        name={`email`}
                                        placeholder={`Enter your email`}
                                        onChange={(e) => setData({...data, email: e.target.value})}
                                        value={data.email ? data.email : ``}
                                        className={` pl-3 py-2 col-xl-10 col-lg-10 col-md-10 col-12`}
                                    />
                                }
                            </div>
                            {(missing.value === "@" || missing.value === "email" || missing.value === "login") ? <p className={`col-11 pl-2 pt-1 warning-message mb-0`}>{missing.message}</p> : ``}
                            <div className={` input col-11 mt-3 row p-0 mx-0 ${missing.value === `password` ? `warning-frame` : ``}`}>
                                <input
                                    id={`password`}
                                    type={passwordView ? `text` : `password`}
                                    name={`password`}
                                    className={` pl-3 py-2 col-xl-10 col-lg-10 col-md-10 col-10`}
                                    placeholder={`Enter your password`}
                                    onChange={(e) => setData(slide === 0 ? {...data, passwordL: e.target.value} : {...data, passwordR: e.target.value})}
                                    value={slide === 0 ? (data.passwordL ? data.passwordL : ``) : (data.passwordR ? data.passwordR : ``)}
                                />
                                <div className="col-2 pl-3 d-flex justify-content-center align-items-center eye" onClick={() => setPasswordView(!passwordView)}>
                                    { !passwordView ?
                                        <svg style={{width : `16px`, height : `16px`}} fill="#2c393f" className={`col-12 p-0 d-xl-flex d-lg-flex d-md-flex d-flex`} enableBackground="new 0 0 59.049 59.049" version="1.1" viewBox="0 0 59.049 59.049" space="preserve">
                                            <path d="m11.285 41.39c0.184 0.146 0.404 0.218 0.623 0.218 0.294 0 0.585-0.129 0.783-0.377 0.344-0.432 0.273-1.061-0.159-1.405-0.801-0.638-1.577-1.331-2.305-2.06l-7.398-7.398 7.629-7.629c7.334-7.333 18.003-9.836 27.839-6.534 0.523 0.173 1.09-0.107 1.267-0.63 0.175-0.523-0.106-1.091-0.63-1.267-10.562-3.545-22.016-0.857-29.89 7.016l-9.044 9.044 8.812 8.812c0.781 0.782 1.614 1.525 2.473 2.21z"/>
                                            <path d="m50.237 21.325c-1.348-1.348-2.826-2.564-4.394-3.616-0.458-0.307-1.081-0.185-1.388 0.273-0.308 0.458-0.185 1.08 0.273 1.388 1.46 0.979 2.838 2.113 4.094 3.369l7.398 7.398-7.629 7.629c-7.385 7.385-18.513 9.882-28.352 6.356-0.52-0.187-1.093 0.084-1.279 0.604s0.084 1.092 0.604 1.279c3.182 1.14 6.49 1.693 9.776 1.693 7.621 0 15.124-2.977 20.665-8.518l9.043-9.043-8.811-8.812z"/>
                                            <path d="m30.539 41.774c-2.153 0-4.251-0.598-6.07-1.73-0.467-0.29-1.084-0.148-1.377 0.321-0.292 0.469-0.148 1.085 0.321 1.377 2.135 1.33 4.6 2.032 7.126 2.032 7.444 0 13.5-6.056 13.5-13.5 0-2.685-0.787-5.279-2.275-7.502-0.308-0.459-0.93-0.582-1.387-0.275-0.459 0.308-0.582 0.929-0.275 1.387 1.267 1.893 1.937 4.102 1.937 6.39 0 6.342-5.159 11.5-11.5 11.5z"/>
                                            <path d="m30.539 18.774c2.065 0 4.089 0.553 5.855 1.6 0.474 0.281 1.088 0.125 1.37-0.351 0.281-0.475 0.125-1.088-0.351-1.37-2.074-1.229-4.451-1.879-6.875-1.879-7.444 0-13.5 6.056-13.5 13.5 0 2.084 0.462 4.083 1.374 5.941 0.174 0.354 0.529 0.56 0.899 0.56 0.147 0 0.298-0.033 0.439-0.102 0.496-0.244 0.701-0.843 0.458-1.338-0.776-1.582-1.17-3.284-1.17-5.06 1e-3 -6.342 5.16-11.501 11.501-11.501z"/>
                                            <path d="m54.621 5.567c-0.391-0.391-1.023-0.391-1.414 0l-46.5 46.5c-0.391 0.391-0.391 1.023 0 1.414 0.195 0.195 0.451 0.293 0.707 0.293s0.512-0.098 0.707-0.293l46.5-46.5c0.391-0.39 0.391-1.023 0-1.414z"/>
                                        </svg> :
                                        <svg style={{width : `16px`, height : `16px`}} fill="#2c393f" className={`col-12 p-0 d-xl-flex d-lg-flex d-md-flex d-none`} enableBackground="new 0 0 59.2 59.2" version="1.1" viewBox="0 0 59.2 59.2" space="preserve">
                                            <path d="m51.062 21.561c-11.889-11.889-31.232-11.889-43.121 0l-7.941 7.94 8.138 8.138c5.944 5.944 13.752 8.917 21.561 8.917s15.616-2.972 21.561-8.917l7.941-7.941-8.139-8.137zm-1.217 14.664c-11.109 11.108-29.184 11.108-40.293 0l-6.724-6.724 6.527-6.527c11.109-11.108 29.184-11.108 40.293 0l6.724 6.724-6.527 6.527z"/>
                                            <path d="m28.572 21.57c-3.86 0-7 3.14-7 7 0 0.552 0.448 1 1 1s1-0.448 1-1c0-2.757 2.243-5 5-5 0.552 0 1-0.448 1-1s-0.447-1-1-1z"/>
                                            <path d="m29.572 16.57c-7.168 0-13 5.832-13 13s5.832 13 13 13 13-5.832 13-13-5.831-13-13-13zm0 24c-6.065 0-11-4.935-11-11s4.935-11 11-11 11 4.935 11 11-4.934 11-11 11z"/>
                                        </svg>
                                    }
                                </div>
                            </div>
                            {(missing.value === `password`) ? <p className={`col-11 pl-2 pt-1 warning-message mb-0`}>{missing.message}</p> : ``}
                            <button
                                className={'submit-button col-6 text-center py-2 mb-5 mt-3 '}
                                onClick={(e) => _formValidator(e, slide === 0 ? `l` : `r`)}><span>sign {slide === 0 ? `in` : `up`}</span>
                            </button>
                            <div className="col-12 row problems">
                                {
                                    slide === 0 ?
                                        <div className="col-12" onClick={() => setPasswordReset(true)}>
                                            <p>can't sign in?</p>
                                        </div>
                                        : ``
                                }
                                <div className="col-12" onClick={() => {
                                    setSlide(slide === 0 ? 1 : 0);
                                    setMissing({});
                                }
                                }>
                                    <p>{slide === 0 ? `create account` : `already member`}</p>
                                </div>
                            </div>
                        </div>
                    </form>

                </div>
            </div>

    )



};
