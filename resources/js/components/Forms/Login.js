import React, {useState} from 'react';
export const Login = ({login = f => f, register = f => f}) => {

    const [data,setData] = useState({type : 2});
    const [slide, setSlide] = useState(0);
    const [missing, setMissing] = useState(``);

    const submit = (control) => {
        if(control=="r"){
            register(data);
        }
        else {
            if (control=="l"){
                login(data);
            }
        }
    };


    const _formValidator = (e, control) => {
        e.preventDefault();
        if(control == "r"){
            if (data.email !== undefined && data.email.length > 0) {
                if(data.email.includes('@')){
                    if (data.passwordR !== undefined && data.passwordR.length > 0) {
                        submit("r");
                    } else {
                        setMissing({value: 'password', message: `Nezadali ste heslo.`});
                        console.log(missing);
                    }
                }else {
                    setMissing({value: '@', message: `Nezadali ste nevhodny email.`});
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
       console.log("forgotten password");
    };

    const _loginFacebook = () => {
        console.log("login by facebook");
    };

    const _loginLinkedIn = () => {
        console.log("login by linkedin");
    };
    return (
        <div className={`authentication-form | container-fluid | row col-12 | justify-content-end align-items-center | m-0 p-0 `}>
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 d-xl-flex d-lg-flex d-md-flex d-sm-flex d-none row m-0 justify-content-end p-0">
                <div className={`col-xl-5 col-lg-5 col-md-6 col-sm-10 col-11 row mx-0 mt-5 p-0`} onClick={() => setSlide(slide === 0 ? 1 : 0)}>
                    <p className={`${slide === 1 ? `shadow` : ``} col-12 text-center py-3 px-0 mb-0 ss`} style={{borderRadius : `25px 0 0 0 `, color : (slide === 1 ? `red` : ``)}}>sign-in</p>
                    <p className={`${slide === 0 ? `shadow` : ``} col-12 text-center py-3 px-0 mb-0 ss`} style={{borderRadius : `0 0 0 25px`}}>sign-up</p>
                </div>
            </div>
                <div className={`content-frame | row col-xl-7 col-lg-9 col-md-9 col-sm-9 col-12 | justify-content-center align-items-center | px-0 m-0 | shadow `} id="container">
                    <div className="col-12 row justify-content-center d-xl-flex d-lg-flex d-md-flex d-none">
                        {
                            slide === 0 ?
                                <svg className={`col-4`} background="transparent" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/1999/xlink"
                                     viewBox="0 0 400 400"  enableBackground="0 0 400 400" space="preserve">
                                    <defs>
                                        <linearGradient id="my-cool-gradient" x2="1" y2="1">
                                            <stop offset="10%" stop-color="#3a7bd5" />
                                            <stop offset="100%" stop-color="#50a0ca" />
                                        </linearGradient>
                                    </defs>
                                    <g id="qsayiR.tif">
                                        <text transform="matrix(1 0 0 1 91.1514 300.9902)" className="st0 st1 st2">T</text>
                                        <text transform="matrix(1 0 0 1 133.1514 332.9902)" className="st1 st2" fill={"url(#my-cool-gradient)"}>T</text>
                                    </g>
                                </svg>
                                :
                                <svg className={`col-4`} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/1999/xlink"
                                     viewBox="0 0 400 400"  enableBackground="0 0 400 400" space="preserve">
                                    <defs>
                                        <linearGradient id="my-coo-gradient" x2="1" y2="1">
                                            <stop offset="5%" stop-color="#50a0ca" />
                                            <stop offset="100%" stop-color="#00C7C7" />

                                        </linearGradient>
                                    </defs>
                                    <g id="qsayiR.tif" className={"shadow"}>
                                        <text transform="matrix(1 0 0 1 91.1514 300.9902)" className="st0 st1 st2 shadow">T</text>
                                        <text transform="matrix(1 0 0 1 133.1514 332.9902)" className="st1 st2 shadow" fill={"url(#my-coo-gradient)"}>T</text>
                                    </g>
                                </svg>
                        }
                    </div>
                    <form id={`login-form`} className={` row col-12 | align-items-start | justify-content-center | m-0`}>
                        {
                            slide === 0 ? <div className="col-xl-9 col-lg-9 col-md-10 col-12 m-0 p-1 justify-content-center row">
                                <div className=" row m-0 p-0 col-12 header">
                                    <h1 className={`col-12 p-0 text-center sign-up`}>Register</h1>
                                </div>
                                <div className="choose row col-xl-8 col-lg-8 col-md-9 col-sm-10 col-11 p-0 shadow-sm my-4">
                                    <p className={`col-6 m-0 text-center px-0 py-2 ${data.type === 2 ? `on` : ``}`}  onClick={() => setData({...data, type : 2})}>personal</p>
                                    <p className={`col-6 m-0 text-center px-0 py-2 ${data.type === 1 ? `on` : ``}`}  onClick={() => setData({...data, type : 1})}>company</p>
                                </div>
                                <div className={` field sign-up-field | col-xl-11 col-lg-11 col-md-11 col-12 `}>
                                    <input
                                        id={`email`}
                                        type={`text`}
                                        name={`email`}
                                        placeholder={`Enter your email`}
                                        onChange={(e) => setData({...data, email: e.target.value})}
                                        value={data.email ? data.email : ``}
                                        className={` px-2 `}
                                    />
                                    <label htmlFor={`email`} className={`px-2`}>{`email`}</label>
                                </div>
                                <div className={` field sign-up-field | col-xl-11 col-lg-11 col-md-11 col-12 mt-3`}>
                                    <input
                                        id={`password`}
                                        type={`password`}
                                        name={`password`}
                                        placeholder={`Enter your password`}
                                        onChange={(e) => setData({...data, passwordR: e.target.value})}
                                        value={data.passwordR ? data.passwordR : ``}
                                        className={` px-2 `}
                                    />
                                    <label htmlFor={`password`} className={`px-2`}>{`password`}</label>
                                </div>
                                <button className={`submit-button sign-up-button col-xl-4 col-lg-4 col-md-5 col-sm-8 col-10 text-center shadow py-2 mb-xl-5 mb-lg-5 mb-md-4 mb-sm-3 mb-3 mt-3`}
                                        onClick={(e) => _formValidator(e, "r")}><span>sign up</span></button>
                                    <div className="col-12 row mb-3 mx-0 align-items-center">
                                        <hr className="col-xl-4 col-lg-4 col-md-3 col-sm-3 col-2 p-0"/>
                                        <p className={`col-xl-4 col-lg-4 col-md-6 col-sm-6 col-7 log-in-with m-0 text-center`}>{window.innerWidth > 991 ? `or continue with` : `or`}</p>
                                        <hr className="col-xl-4 col-lg-4 col-md-3 col-sm-3 col-2 p-0"/>
                                    </div>
                                    <div className="col-xl-11 col-lg-11 col-md-11 col-12 m-0 p-0 row justify-content-around align-items-center">
                                        <div onClick={() => _loginFacebook()}
                                             className={`col-xl-3 col-lg-3 col-md-3 col-sm-3 col-4 row m-0 sign-in-with justify-content-center`}
                                             style={{background: `#3B5998`}}>
                                            <svg className="p-2" enableBackground="new 0 0 96.124 96.123" version="1.1"
                                                 viewBox="0 0 96.124 96.123" space="preserve"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path className="active-path"
                                                      d="m72.089 0.02-12.465-0.02c-14.004 0-23.054 9.285-23.054 23.656v10.907h-12.533c-1.083 0-1.96 0.878-1.96 1.961v15.803c0 1.083 0.878 1.96 1.96 1.96h12.533v39.876c0 1.083 0.877 1.96 1.96 1.96h16.352c1.083 0 1.96-0.878 1.96-1.96v-39.876h14.654c1.083 0 1.96-0.877 1.96-1.96l6e-3 -15.803c0-0.52-0.207-1.018-0.574-1.386s-0.867-0.575-1.387-0.575h-14.659v-9.246c0-4.444 1.059-6.7 6.848-6.7l8.397-3e-3c1.082 0 1.959-0.878 1.959-1.96v-14.674c0-1.081-0.876-1.958-1.957-1.96z"
                                                      fill="#fff" data-old_color="#000000" data-original="#000000"/>
                                            </svg>
                                        </div>
                                        <div onClick={() => _loginLinkedIn()}
                                             className={`col-xl-3 col-lg-3 col-md-3 col-sm-3 col-4 row m-0 sign-in-with justify-content-center`}
                                             style={{background: `#0077b5`}}>
                                            <svg className={`p-2`} xmlns="http://www.w3.org/2000/svg" id="Bold"
                                                 enable-background="new 0 0 24 24"
                                                 viewBox="0 0 24 24">
                                                <g>
                                                    <path
                                                        d="m23.994 24v-.001h.006v-8.802c0-4.306-.927-7.623-5.961-7.623-2.42 0-4.044 1.328-4.707 2.587h-.07v-2.185h-4.773v16.023h4.97v-7.934c0-2.089.396-4.109 2.983-4.109 2.549 0 2.587 2.384 2.587 4.243v7.801z"
                                                        data-original="#000000" className="active-path"
                                                        data-old_color="#000000"
                                                        fill="#FFFFFF"/>
                                                    <path d="m.396 7.977h4.976v16.023h-4.976z" data-original="#000000"
                                                          className="active-path" data-old_color="#000000" fill="#FFFFFF"/>
                                                    <path
                                                        d="m2.882 0c-1.591 0-2.882 1.291-2.882 2.882s1.291 2.909 2.882 2.909 2.882-1.318 2.882-2.909c-.001-1.591-1.292-2.882-2.882-2.882z"
                                                        data-original="#000000" className="active-path"
                                                        data-old_color="#000000"
                                                        fill="#FFFFFF"/>
                                                </g>
                                            </svg>
                                        </div>
                                        <div onClick={() => _loginLinkedIn()}
                                             className={`col-xl-3 col-lg-3 col-md-3 col-sm-3 col-4 m-0 row sign-in-with justify-content-center`}
                                             style={{background: `#DC4E41`}}>
                                            <svg className="p-2" enableBackground="new 0 0 512 512" version="1.1"
                                                 viewBox="0 0 512 512" space="preserve"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <g fill="#fff">
                                                    <path className=""
                                                          d="m113.47 309.41-17.822 66.532-65.139 1.378c-19.467-36.107-30.509-77.418-30.509-121.32 0-42.451 10.324-82.483 28.624-117.73h0.014l57.992 10.632 25.404 57.644c-5.317 15.501-8.215 32.141-8.215 49.456 2e-3 18.792 3.406 36.797 9.651 53.408z"
                                                          data-old_color="#FBBB00" data-original="#FBBB00"/>
                                                    <path
                                                        className="active-path"
                                                        d="m507.53 208.18c2.94 15.486 4.473 31.479 4.473 47.824 0 18.328-1.927 36.206-5.598 53.451-12.462 58.683-45.025 109.92-90.134 146.19l-0.014-0.014-73.044-3.727-10.338-64.535c29.932-17.554 53.324-45.025 65.646-77.911h-136.89v-101.28h138.89 107.01z"
                                                        data-old_color="#518EF8" data-original="#518EF8"/>
                                                    <path className=""
                                                          d="m416.25 455.62 0.014 0.014c-43.871 35.263-99.601 56.362-160.27 56.362-97.491 0-182.25-54.491-225.49-134.68l82.961-67.91c21.619 57.698 77.278 98.771 142.53 98.771 28.047 0 54.323-7.582 76.87-20.818l83.383 68.262z"
                                                          data-old_color="#28B446"
                                                          data-original="#28B446"/>
                                                    <path
                                                        className=""
                                                        d="m419.4 58.936-82.933 67.896c-23.335-14.586-50.919-23.012-80.471-23.012-66.729 0-123.43 42.957-143.96 102.72l-83.397-68.276h-0.014c42.606-82.145 128.44-138.27 227.38-138.27 62.115 0 119.07 22.126 163.4 58.936z"
                                                        data-old_color="#F14336" data-original="#F14336"/>
                                                </g>
                                            </svg>


                                        </div>
                                    </div>
                            </div> : <div className="col-9 justify-content-center row">
                                <div className=" row m-0 p-0 col-12 header">
                                    <h1 className={`col-12 p-0 text-center sign-in`}>Login</h1>
                                </div>
                                <div className={` field sign-in-field | col-11 `}>
                                    <input
                                        id={`login`}
                                        type={`text`}
                                        name={`login`}
                                        placeholder={`Enter your username`}
                                        onChange={(e) => setData({...data, login: e.target.value})}
                                        value={data.login ? data.login : ``}
                                        className={` px-2 `}
                                    />
                                    <label htmlFor={`login`} className={`px-2`}>{`username`}</label>
                                </div>
                                <div className={` field sign-in-field | col-11 mt-3`}>
                                    <input
                                        id={`password`}
                                        type={`password`}
                                        name={`password`}
                                        placeholder={`Enter your password`}
                                        onChange={(e) => setData({...data, passwordL: e.target.value})}
                                        value={data.passwordL ? data.passwordL : ``}
                                        className={` px-2 `}
                                    />
                                    <label htmlFor={`password`} className={` px-2`}>{`password`}</label>
                                </div>
                                <div className="sign-in-field forgotten col-11" onClick={() => _forgottenPassword()}>
                                    <p className={`text-right`}>forgotten password ?</p>
                                </div>
                                <button
                                    className={`submit-button sign-in-button col-4 text-center shadow py-2 mb-5 mt-3 `}
                                    onClick={(e) => _formValidator(e, "l")}><span>sign in</span></button>

                                <div className="col-12 row mb-3 mx-0 align-items-center">
                                    <hr className="col-xl-4 col-lg-4 col-md-3 col-sm-3 col-2 p-0"/>
                                    <p className={`col-xl-4 col-lg-4 col-md-6 col-sm-6 col-7 log-in-with m-0 text-center`}>{window.innerWidth > 991 ? `or continue with` : `or`}</p>
                                    <hr className="col-xl-4 col-lg-4 col-md-3 col-sm-3 col-2 p-0"/>
                                </div>
                                <div className="col-xl-11 col-lg-11 col-md-11 col-12 m-0 p-0 row justify-content-around align-items-center">
                                    <div onClick={() => _loginFacebook()}
                                         className={`col-xl-3 col-lg-3 col-md-3 col-sm-3 col-4 row m-0 sign-in-with justify-content-center`}
                                         style={{background: `#3B5998`}}>
                                        <svg className="p-2" enableBackground="new 0 0 96.124 96.123" version="1.1"
                                             viewBox="0 0 96.124 96.123" space="preserve"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path className="active-path"
                                                  d="m72.089 0.02-12.465-0.02c-14.004 0-23.054 9.285-23.054 23.656v10.907h-12.533c-1.083 0-1.96 0.878-1.96 1.961v15.803c0 1.083 0.878 1.96 1.96 1.96h12.533v39.876c0 1.083 0.877 1.96 1.96 1.96h16.352c1.083 0 1.96-0.878 1.96-1.96v-39.876h14.654c1.083 0 1.96-0.877 1.96-1.96l6e-3 -15.803c0-0.52-0.207-1.018-0.574-1.386s-0.867-0.575-1.387-0.575h-14.659v-9.246c0-4.444 1.059-6.7 6.848-6.7l8.397-3e-3c1.082 0 1.959-0.878 1.959-1.96v-14.674c0-1.081-0.876-1.958-1.957-1.96z"
                                                  fill="#fff" data-old_color="#000000" data-original="#000000"/>
                                        </svg>
                                    </div>
                                    <div onClick={() => _loginLinkedIn()}
                                         className={`col-xl-3 col-lg-3 col-md-3 col-sm-3 col-4 row m-0 sign-in-with justify-content-center`}
                                         style={{background: `#0077b5`}}>
                                        <svg className={`p-2`} xmlns="http://www.w3.org/2000/svg" id="Bold"
                                             enable-background="new 0 0 24 24"
                                             viewBox="0 0 24 24">
                                            <g>
                                                <path
                                                    d="m23.994 24v-.001h.006v-8.802c0-4.306-.927-7.623-5.961-7.623-2.42 0-4.044 1.328-4.707 2.587h-.07v-2.185h-4.773v16.023h4.97v-7.934c0-2.089.396-4.109 2.983-4.109 2.549 0 2.587 2.384 2.587 4.243v7.801z"
                                                    data-original="#000000" className="active-path"
                                                    data-old_color="#000000"
                                                    fill="#FFFFFF"/>
                                                <path d="m.396 7.977h4.976v16.023h-4.976z" data-original="#000000"
                                                      className="active-path" data-old_color="#000000" fill="#FFFFFF"/>
                                                <path
                                                    d="m2.882 0c-1.591 0-2.882 1.291-2.882 2.882s1.291 2.909 2.882 2.909 2.882-1.318 2.882-2.909c-.001-1.591-1.292-2.882-2.882-2.882z"
                                                    data-original="#000000" className="active-path"
                                                    data-old_color="#000000"
                                                    fill="#FFFFFF"/>
                                            </g>
                                        </svg>
                                    </div>
                                    <div onClick={() => _loginLinkedIn()}
                                         className={`col-xl-3 col-lg-3 col-md-3 col-sm-3 col-4 m-0 row sign-in-with justify-content-center align-items-start`}
                                         style={{background: `#DC4E41`}}>
                                        <svg className="p-2" enableBackground="new 0 0 512 512" version="1.1"
                                             viewBox="0 0 512 512" space="preserve"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <g fill="#fff">
                                                <path className=""
                                                      d="m113.47 309.41-17.822 66.532-65.139 1.378c-19.467-36.107-30.509-77.418-30.509-121.32 0-42.451 10.324-82.483 28.624-117.73h0.014l57.992 10.632 25.404 57.644c-5.317 15.501-8.215 32.141-8.215 49.456 2e-3 18.792 3.406 36.797 9.651 53.408z"
                                                      data-old_color="#FBBB00" data-original="#FBBB00"/>
                                                <path
                                                    className="active-path"
                                                    d="m507.53 208.18c2.94 15.486 4.473 31.479 4.473 47.824 0 18.328-1.927 36.206-5.598 53.451-12.462 58.683-45.025 109.92-90.134 146.19l-0.014-0.014-73.044-3.727-10.338-64.535c29.932-17.554 53.324-45.025 65.646-77.911h-136.89v-101.28h138.89 107.01z"
                                                    data-old_color="#518EF8" data-original="#518EF8"/>
                                                <path className=""
                                                      d="m416.25 455.62 0.014 0.014c-43.871 35.263-99.601 56.362-160.27 56.362-97.491 0-182.25-54.491-225.49-134.68l82.961-67.91c21.619 57.698 77.278 98.771 142.53 98.771 28.047 0 54.323-7.582 76.87-20.818l83.383 68.262z"
                                                      data-old_color="#28B446"
                                                      data-original="#28B446"/>
                                                <path
                                                    className=""
                                                    d="m419.4 58.936-82.933 67.896c-23.335-14.586-50.919-23.012-80.471-23.012-66.729 0-123.43 42.957-143.96 102.72l-83.397-68.276h-0.014c42.606-82.145 128.44-138.27 227.38-138.27 62.115 0 119.07 22.126 163.4 58.936z"
                                                    data-old_color="#F14336" data-original="#F14336"/>
                                            </g>
                                        </svg>


                                    </div>
                                </div>
                            </div>
                        }
                    </form>

                </div>
        </div>

    )

};
