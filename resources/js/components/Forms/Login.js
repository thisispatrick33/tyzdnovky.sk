import React, {useState} from 'react';
export const Login = ({login = f => f, register = f => f}) => {

    const [data,setData] = useState({type : 2});

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
        <div className={`form | container-fluid | row col-12 | justify-content-center align-items-center | m-0 p-0 `}>
                <div className={`content-frame | row col-xl-10 col-lg-10 col-11 | justify-content-center | px-0 | shadow `} id="container">
                    <div className="editable-content sign-up-container col-12 row m-0 justify-content-center align-items-start">
                        <form id={`login-form`} className={` row col-12 | align-items-start | justify-content-center | m-0 p-3 `}>
                            <h1>Register</h1>
                            <div className="choose row col-12">
                                <p className={`col-6 text-center p-0 ${data.type === 1 ? `on` : ``}`} onClick={() => setData({...data, type : 1})}>company</p>
                                <p className={`col-6 text-center p-0 ${data.type === 2 ? `on` : ``}`} onClick={() => setData({...data, type : 2})}>user</p>
                            </div>
                            <div className={` field sign-up-field | col-11 `}>
                                <input
                                    id={`email`}
                                    type={`text`}
                                    name={`email`}
                                    placeholder={`Enter your email`}
                                    onChange={(e) => setData({...data, email: e.target.value})}
                                    value={data.email ? data.email : ``}
                                    className={` px-2 `}
                                />
                                <label htmlFor={`email`} className={`col-12 px-2`}>{`email`}</label>
                            </div>
                            <div className={` field sign-up-field | col-11 mt-3`}>
                                <input
                                    id={`password`}
                                    type={`password`}
                                    name={`password`}
                                    placeholder={`Enter your password`}
                                    onChange={(e) => setData({...data, passwordR: e.target.value})}
                                    value={data.passwordR ? data.passwordR : ``}
                                    className={` px-2 `}
                                />
                                <label htmlFor={`password`} className={`col-12 px-2`}>{`password`}</label>
                            </div>
                            <button className={`submit-button sign-up-button col-4 text-center shadow py-2 mt-3`} onClick={(e)=>_formValidator(e,"r")}><span>sign up</span></button>
                        </form>
                    </div>

                    <div className="editable-content sign-in-container col-12 row m-0 justify-content-center align-items-center">
                        <form id={`login-form`} className={` row col-12 | align-items-start | justify-content-center | m-0`}>
                            <h1>Login</h1>
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
                                <label htmlFor={`login`} className={`col-12 px-2`}>{`username`}</label>
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
                                <label htmlFor={`password`} className={`col-12 px-2`}>{`password`}</label>
                            </div>
                            <div className="sign-in-field forgotten col-11" onClick={() => _forgottenPassword()}>
                                <p className={`text-right`}>forgotten password ?</p>
                            </div>
                            <button className={`submit-button sign-in-button col-4 text-center shadow py-2 mb-5 mt-3 `} onClick={(e)=>_formValidator(e,"l")}><span>sign in</span></button>
                            <div className="col-11 row justify-content-around align-items-center">
                                <p className={`col-auto log-in-with m-0`}>or login with</p>
                                <div onClick={() => _loginFacebook()} className={`col-3 row sign-in-with justify-content-center`} style={{background : `#3B5998`}}>
                                    <svg className="p-2" enableBackground="new 0 0 96.124 96.123" version="1.1" viewBox="0 0 96.124 96.123" space="preserve" xmlns="http://www.w3.org/2000/svg">
                                    <path className="active-path"
                                          d="m72.089 0.02-12.465-0.02c-14.004 0-23.054 9.285-23.054 23.656v10.907h-12.533c-1.083 0-1.96 0.878-1.96 1.961v15.803c0 1.083 0.878 1.96 1.96 1.96h12.533v39.876c0 1.083 0.877 1.96 1.96 1.96h16.352c1.083 0 1.96-0.878 1.96-1.96v-39.876h14.654c1.083 0 1.96-0.877 1.96-1.96l6e-3 -15.803c0-0.52-0.207-1.018-0.574-1.386s-0.867-0.575-1.387-0.575h-14.659v-9.246c0-4.444 1.059-6.7 6.848-6.7l8.397-3e-3c1.082 0 1.959-0.878 1.959-1.96v-14.674c0-1.081-0.876-1.958-1.957-1.96z"
                                          fill="#fff" data-old_color="#000000" data-original="#000000"/>
                                 </svg></div>
                                <div onClick={() => _loginLinkedIn()} className={`col-3 row sign-in-with justify-content-center`} style={{background : `#0077b5`}}>
                                    <svg className={`p-2`} xmlns="http://www.w3.org/2000/svg" id="Bold" enable-background="new 0 0 24 24"
                                         viewBox="0 0 24 24" >
                                        <g>
                                            <path
                                                d="m23.994 24v-.001h.006v-8.802c0-4.306-.927-7.623-5.961-7.623-2.42 0-4.044 1.328-4.707 2.587h-.07v-2.185h-4.773v16.023h4.97v-7.934c0-2.089.396-4.109 2.983-4.109 2.549 0 2.587 2.384 2.587 4.243v7.801z"
                                                data-original="#000000" className="active-path" data-old_color="#000000"
                                                fill="#FFFFFF"/>
                                            <path d="m.396 7.977h4.976v16.023h-4.976z" data-original="#000000"
                                                  className="active-path" data-old_color="#000000" fill="#FFFFFF"/>
                                            <path
                                                d="m2.882 0c-1.591 0-2.882 1.291-2.882 2.882s1.291 2.909 2.882 2.909 2.882-1.318 2.882-2.909c-.001-1.591-1.292-2.882-2.882-2.882z"
                                                data-original="#000000" className="active-path" data-old_color="#000000"
                                                fill="#FFFFFF"/>
                                        </g>
                                    </svg>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1>Welcome Back!</h1>
                                <p>To keep connected with us please login with your personal info</p>
                                <button className="ghost py-2 px-4" id="signIn">Sign In</button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1>Hello, Friend!</h1>
                                <p>Enter your personal details and start journey with us</p>
                                <button className="ghost py-2 px-4" id="signUp">Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
        </div>

    )

};
