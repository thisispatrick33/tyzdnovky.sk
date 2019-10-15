import React, {useState} from 'react';

export const Register = ({register = f => f}) => {
    const [slide, setSlide] = useState(1);
    const [data,setData] = useState({});
    const [missing, setMissing] = useState(``);
    const choose = (value) => {
        setData({type : value});
        setSlide(slide + 1);
    };
    const submit = () => {
        register(data);
    };

    const _formValidator = () => {
        if(slide === 2){
            if(data.type===1){
                if(data.name!==undefined&&data.name.length>0){
                    if(data.ico!==undefined&&data.ico.length>0){
                        if(data.phone!==undefined&&data.phone.length>0){
                            if(data.email!==undefined&&data.email.length>0){
                                if(data.email.includes('@')){
                                    if(data.password!==undefined&&data.password.length>0){
                                        submit();
                                    }else {
                                        setMissing({value : 'password', message : `Nezadali ste heslo.`});
                                    }
                                }else {
                                    setMissing({value : '@', message : `Nezadali ste platný email.`});
                                }
                            }else{
                                setMissing({value : 'email', message : `Nezadali ste email.`});
                            }
                        }else{
                            setMissing({value : 'phone', message : `Nezadali ste telefon.`});
                        }
                    }else {
                        setMissing({value : 'ico', message : `Nezadali ste ico.`});
                    }
                }else{
                    setMissing({value : 'company name', message : `Nezadali ste meno.`});
                }
            }
            else{
                if(data.firstName!==undefined&&data.firstName.length>0){
                    if(data.lastName!==undefined&&data.lastName.length>0){
                        if(data.phone!==undefined&&data.phone.length>0){
                            if(data.email!==undefined&&data.email.length>0){
                                if(data.email.includes('@')){
                                    if(data.password!==undefined&&data.password.length>0){
                                        submit();
                                    }else {
                                        setMissing({value : 'password', message : `Nezadali ste heslo.`});
                                    }
                                }else {
                                    setMissing({value : '@', message : `Nezadali ste platný email.`});
                                }
                            }else{
                                setMissing({value : 'email', message : `Nezadali ste email.`});
                            }
                        }else{
                            setMissing({value : 'phone', message : `Nezadali ste telefon.`});
                        }
                    }else {
                        setMissing({value : 'last name', message : `Nezadali ste priezvisko.`});
                    }
                }else{
                    setMissing({value : 'first name', message : `Nezadali ste meno.`});
                }
            }
        }

    };
    return (
        console.log(missing),
        <div className={` registration-form | container-fluid | row col-12 | justify-content-center | mb-5 m-0 p-0 `}>
            <h1 className={` main-title | col-11 | my-4 p-0 | text-center `}>registrácia<span className={`doth`}>.</span></h1>
            <div className={` content-frame rounded | row col-xl-10 col-lg-10 col-11 | justify-content-center | py-xl-5 py-lg-5 py-3 | shadow `}>
                <div className={` side-bar | row col-xl-3 col-lg-3 col-0 | align-item-center | justify-content-center | m-0 | d-xl-flex d-lg-flex d-none `}>
                    <div className={` col-xl-9 | align-item-center | justify-content-center | p-0 | border-r | d-flex | text-center `}>
                        <div className={` svg | col-12 | align-item-center | justify-content-center | d-flex `}>
                            <svg className={` col-12 `} xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 747.62 1696">
                                <defs>
                                </defs>
                                <title>logo</title>
                                <text className={` cls-1 `} transform="translate(0 1002.2)">T</text>
                                <text className={` cls-2 `} transform="translate(118 1098.2)">T</text>
                            </svg>
                        </div>
                    </div>
                </div>
                <form className={` row col-xl-9 col-lg-9 col-12 | align-items-start | justify-content-center | m-0 p-4 `}>
                    {(() => {
                        switch (slide) {
                            case 1 : return <div className={` title | col-12 | mb-3 pb-4 `}><span className={`doth`}>koho</span> registrujeme ?</div>;
                            case 2 : return <div className={` title | col-12 | mb-3 pb-4 `}>všeobecné {window.innerWidth <= 991 ? `info` : ` informácie` }<span className={`doth`}>{window.innerWidth <= 991 ? `...` : `.` }</span></div>;
                        }
                    })()}
                    {(() => {
                        switch(slide) {
                            case 1 :
                                return <div className={` data | row col-12 | justify-content-center `}>
                                    <div className={` slide | col-xl-6 `} onClick={() => choose(1)}>
                                        <div className={` menu-item pointer svg | my-xl-0 my-5 `}>
                                            <div className={` col-12 | justify-content-center | d-flex `}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="56.253" height="56.253"
                                                     viewBox="0 0 56.253 56.253">
                                                    <g transform="translate(27.042)">
                                                        <g>
                                                            <path
                                                                d="M248.005.322a1.1,1.1,0,0,0-1.875.777,1.1,1.1,0,1,0,1.875-.777Z"
                                                                transform="translate(-246.13)"/>
                                                        </g>
                                                    </g>
                                                    <g>
                                                        <g>
                                                            <path
                                                                d="M55.931,26.251,44.607,14.921V8.13a2.2,2.2,0,0,0-2.2-2.2h-2.2V1.1a1.1,1.1,0,0,0-1.1-1.1H32.265a1.1,1.1,0,0,0,0,2.2h5.75V5.933H18.238V2.2h5.786a1.1,1.1,0,0,0,0-2.2H17.139a1.1,1.1,0,0,0-1.1,1.1V5.933h-2.2a2.2,2.2,0,0,0-2.2,2.2V48.122H9.229a1.1,1.1,0,0,0-1.1,1.1v4.834H2.2V29.225H9.229a1.1,1.1,0,1,0,0-2.2H1.1a1.1,1.1,0,0,0-1.1,1.1V55.154a1.1,1.1,0,0,0,1.1,1.1H55.154a1.1,1.1,0,0,0,1.1-1.1V27.028A1.1,1.1,0,0,0,55.931,26.251ZM34.352,8.13h8.057v8.35H34.352Zm0,10.547h8.057v8.35H34.352Zm0,10.547h8.057v8.35H34.352Zm0,10.547h8.057v8.35H34.352ZM24.1,8.13h8.057v8.35H24.1Zm0,10.547h8.057v8.35H24.1Zm0,10.547h8.057v8.35H24.1Zm0,10.547h8.057v8.35H24.1ZM13.843,8.13H21.9v8.35H13.843Zm0,10.547H21.9v8.35H13.843Zm0,10.547H21.9v8.35H13.843Zm0,10.547H21.9v8.35H13.843ZM45.925,54.055h-35.6V50.32h35.6Zm8.13,0H48.122V49.221a1.1,1.1,0,0,0-1.1-1.1H44.607v-3.09h3.5a1.1,1.1,0,0,0,0-2.2h-3.5V39.763h3.5a1.1,1.1,0,1,0,0-2.2h-3.5V34.494h3.5a1.1,1.1,0,1,0,0-2.2h-3.5V29.225h3.5a1.1,1.1,0,1,0,0-2.2h-3.5v-9l9.449,9.453Z"/>
                                                        </g>
                                                    </g>
                                                    <g transform="translate(5.823 43.691)">
                                                        <g>
                                                            <path
                                                                d="M54.875,397.992a1.1,1.1,0,1,0,.322.777A1.1,1.1,0,0,0,54.875,397.992Z"
                                                                transform="translate(-53 -397.67)"/>
                                                        </g>
                                                    </g>
                                                    <g transform="translate(5.823 31.722)">
                                                        <g>
                                                            <path
                                                                d="M54.1,288.724a1.1,1.1,0,0,0-1.1,1.1v7.831a1.1,1.1,0,1,0,2.2,0v-7.831A1.1,1.1,0,0,0,54.1,288.724Z"
                                                                transform="translate(-53 -288.724)"/>
                                                        </g>
                                                    </g>
                                                </svg>
                                            </div>
                                            <h2 className={` name | col-12 | mt-3 | text-center `}>Firma</h2>
                                        </div>

                                    </div>
                                    <div className={` slide | col-xl-6 `} onClick={() => choose(2)}>
                                        <div className={` menu-item pointer svg | row | my-xl-0 my-5 `}>
                                            <div className={` col-12 | justify-content-center | d-flex `}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="63.427" height="63.427"
                                                     viewBox="0 0 63.427 63.427">
                                                    <g transform="translate(1 1)">
                                                        <g transform="translate(-1 -1)">
                                                            <path
                                                                d="M59.255,51.644C52.946,48.3,48.107,46.422,43.8,45.7l.446-.613a.822.822,0,0,0,.211-.846l-.991-3.963a22.614,22.614,0,0,0,4.162-12.74V23.314H50.8a1.057,1.057,0,0,0,0-2.114H49.741V20.142A18.378,18.378,0,0,0,36,2.383V2.171A3.18,3.18,0,0,0,32.828-1H28.6a3.18,3.18,0,0,0-3.171,3.171v.211A18.378,18.378,0,0,0,11.685,20.142V21.2H10.628a1.057,1.057,0,0,0,0,2.114H13.8v4.228a22.615,22.615,0,0,0,4.162,12.74l-.991,3.963a1.271,1.271,0,0,0,.211.846l.446.613c-4.308.719-9.148,2.6-15.457,5.941A5.622,5.622,0,0,0-1,56.824V61.37A1,1,0,0,0,.057,62.427H61.37a1,1,0,0,0,1.057-1.057V56.824A6.061,6.061,0,0,0,59.255,51.644Zm-29.176-.978.64-1.44L32.3,52.7l1.033,2.325H28.176Zm-2.707,6.475h6.673l.6,3.171H26.739Zm14.44-14.8.423,1.9-1.08,1.483a.942.942,0,0,0-.189.209l-4.4,6.088-1.4,1.916-2.85-6.412a15.273,15.273,0,0,0,8.9-4.583l.082-.081.02-.02Q41.574,42.6,41.813,42.342ZM40.436,6.732q.176.117.349.238a18.38,18.38,0,0,1,3.566,3.447l-4.863.951Zm-18.5,4.637-4.863-.951A18.378,18.378,0,0,1,20.642,6.97q.172-.121.349-.238ZM13.8,20.142a16.033,16.033,0,0,1,1.99-7.786L23.1,13.8h.211a2.486,2.486,0,0,0,.846-.211.853.853,0,0,0,.317-.951L23.025,5.574a17.534,17.534,0,0,1,2.4-.943V7.457a1.057,1.057,0,0,0,2.114,0V2.171A1.059,1.059,0,0,1,28.6,1.114h4.228a1.059,1.059,0,0,1,1.057,1.057V7.457a1.057,1.057,0,1,0,2.114,0V4.63a17.518,17.518,0,0,1,2.479.98l-1.422,6.921a1.476,1.476,0,0,0,.317.951.96.96,0,0,0,.74.317h.211l7.265-1.53a16.032,16.032,0,0,1,2.037,7.872V21.2H13.8V20.142Zm2.114,3.171h29.6v4.228a19.476,19.476,0,0,1-3.955,11.819l-.062.021-.317.317a17.715,17.715,0,0,1-1.68,1.939A13.515,13.515,0,0,1,31.18,45.5a1.191,1.191,0,0,0-.467-.093,1.012,1.012,0,0,0-.44.094,11.952,11.952,0,0,1-5.242-1.585A17.173,17.173,0,0,1,20.248,39.7l-.317-.317-.062-.021a19.476,19.476,0,0,1-3.955-11.819V23.314ZM29.1,47.528l-2.85,6.412-1.4-1.916-4.4-6.088c-.034-.034-.071-.067-.109-.1l-1.159-1.592.423-1.9c.143.154.289.3.435.453A15.34,15.34,0,0,0,29.1,47.528Zm-27.987,9.3a3.629,3.629,0,0,1,2.009-3.277c6.738-3.58,11.589-5.376,15.91-5.913l6.308,8.674-.8,4H1.114Zm59.2,3.489H36.887l-.8-4,6.377-8.768c4.306.65,9.243,2.445,15.841,5.9a3.911,3.911,0,0,1,2.009,3.383Z"
                                                                transform="translate(1 1)"/>
                                                        </g>
                                                    </g>
                                                </svg>
                                            </div>
                                            <h2 className={` name | col-12 | mt-3 | text-center `}>Jednotlivec</h2>
                                        </div>
                                    </div>
                                </div>;
                            case 2 :
                                return <div className={` row col-12 | align-items-start`}>
                                    <div className={` field | col-xl-5 col-lg-6 col-12 | p-0 ml-2 `}>
                                        <input
                                            id={`firstName`}
                                            type={`text`}
                                            name={`firstName`}
                                            placeholder={data.type === 1 ? `Zadajte názov firmy` : `Napíšte vaše meno`}
                                            onChange={(e) => setData(data.type === 1 ? {
                                                ...data,
                                                name: e.target.value
                                            } : {...data, firstName: e.target.value})}
                                            value={data.type === 1 ? (data.name ? data.name : ``) : (data.firstName ? data.firstName : ``)}
                                            className={` px-2 `}
                                            onFocus={() => setMissing(``)}
                                            style={{borderBottomColor: (missing === `first name` ? `#DE0D0D` : ``)}}
                                        />
                                        <label htmlFor="firstName">{data.type === 1 ? `názov` : `meno`}</label>
                                    </div>
                                    <div className={` field | col-xl-5 col-lg-5 col-12 | p-0  ml-xl-5 ml-lg-3 ml-2`}>
                                        <input
                                            id={`lastName`}
                                            type={`text`}
                                            name={`lastName`}
                                            className={` px-2 `}
                                            placeholder={data.type === 1 ? `Zadajte ičo firmy` : `Napíšte vaše priezvisko`}
                                            onChange={(e) => setData(data.type === 1 ? {
                                                ...data,
                                                ico: e.target.value
                                            } : {...data, lastName: e.target.value})}
                                            value={data.type === 1 ? (data.ico ? data.ico : ``) : (data.lastName ? data.lastName : ``)}
                                            onFocus={() => setMissing(``)}
                                            style={{borderBottomColor: (missing === `last name` ? `#DE0D0D` : ``)}}
                                        />
                                        <label htmlFor={"lastName"}>{data.type === 1 ? `ičo` : `priezvisko`}</label>
                                    </div>
                                    <div className={` field | col-xl-5 col-lg-6 col-12 | p-0 ml-2`}>
                                        <input
                                            id={`phone`}
                                            type={`text`}
                                            name={`phone`}
                                            placeholder={`Zadajte váš telefón`}
                                            onChange={(e) => setData({...data, phone: e.target.value})}
                                            value={data.phone ? data.phone : ``}
                                            className={` px-2 `}
                                            onFocus={() => setMissing(``)}
                                            style={{borderBottomColor: (missing === `phone` ? `#DE0D0D` : ``)}}
                                        />
                                        <label htmlFor={`phone`}>{`telefón`}</label>
                                    </div>
                                    <div className={` field | col-xl-5 col-lg-5 col-12 | p-0 ml-xl-5 ml-lg-3 ml-2`}>
                                        <input
                                            id={`email`}
                                            type={`email`}
                                            name={`email`}
                                            placeholder={`Zadajte váš email`}
                                            onChange={(e) => setData({...data, email: e.target.value})}
                                            value={data.email ? data.email : ``}
                                            className={` px-2 `}
                                            onFocus={() => setMissing(``)}
                                            style={{borderBottomColor: ((missing === `email` || missing === `@`) ? `#DE0D0D` : ``)}}
                                        />
                                        <label htmlFor={`email`}>{`email`}</label>
                                    </div>
                                    <div className={` field | col-xl-5 col-lg-5 col-12 | p-0 ml-2`}>
                                        <input
                                            id={`password`}
                                            type={`password`}
                                            name={`password`}
                                            placeholder={`Zadajte váš password`}
                                            onChange={(e) => setData({...data, password: e.target.value})}
                                            value={data.password ? data.password : ``}
                                            className={` px-2 `}
                                            onFocus={() => setMissing(``)}
                                            style={{borderBottomColor: (missing === `password`  ? `#DE0D0D` : ``)}}
                                        />
                                        <label htmlFor={`password`}>{`password`}</label>
                                    </div>
                                </div>;
                        }

                    })()}
                    { slide <= 1 || slide > 2 ? `` :
                        <div className={` navigators | col-12 row | mt-4 p-0`}>
                                <div className={` align-items-center | row arrow col-6 | justify-content-start m-0`} onClick={() => setSlide(slide-1)}>
                                    <div className={` col-xl-1 col-lg-1 col-md-1 col-sm-2 col-4 | p-0 `}>
                                        <svg className={` col-12 | p-0 `} enableBackground="new 0 0 477.175 477.175" version="1.1" viewBox="0 0 477.175 477.175" space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="m145.19 238.58l215.5-215.5c5.3-5.3 5.3-13.8 0-19.1s-13.8-5.3-19.1 0l-225.1 225.1c-5.3 5.3-5.3 13.8 0 19.1l225.1 225c2.6 2.6 6.1 4 9.5 4s6.9-1.3 9.5-4c5.3-5.3 5.3-13.8 0-19.1l-215.4-215.5z"></path></svg>
                                    </div>
                                    <p className={` col-auto | mb-0 | d-xl-flex d-lg-flex d-md-flex d-none `}>späť</p>
                                </div>
                                <div className={` row arrow col-6 | align-items-center | justify-content-end m-0`} onClick={() => _formValidator()}>
                                    <p className={` col-auto | mb-0 | d-xl-flex d-lg-flex d-md-flex d-none `}>{slide + 1 > 2 ? `odoslať` : `pokračovať`}</p>

                                    <div className={` col-xl-1 col-lg-1 col-md-1 col-sm-2 col-4 | p-0 `}>
                                        {
                                            slide + 1 > 3 ?
                                                <svg className={` col-12 | p-0 `} viewBox="0 -65 424.032 424" xmlns="http://www.w3.org/2000/svg"><path d="m146.660156 293.367188c-4.09375 0-8.191406-1.558594-11.304687-4.695313l-130.667969-130.667969c-6.25-6.25-6.25-16.382812 0-22.632812s16.382812-6.25 22.636719 0l119.359375 119.359375 250.027344-250.027344c6.25-6.25 16.382812-6.25 22.632812 0s6.25 16.386719 0 22.636719l-261.332031 261.332031c-3.160157 3.136719-7.253907 4.695313-11.351563 4.695313zm0 0"/></svg>
                                                : <svg className={` col-12 | p-0 `} enable-background="new 0 0 477.175 477.175" version="1.1" viewBox="0 0 477.175 477.175" space="preserve" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="m360.73 229.08l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1 0s-5.3 13.8 0 19.1l215.5 215.5-215.5 215.5c-5.3 5.3-5.3 13.8 0 19.1 2.6 2.6 6.1 4 9.5 4s6.9-1.3 9.5-4l225.1-225.1c5.3-5.2 5.3-13.8 0.1-19z"/>
                                                </svg>
                                        }
                                    </div>
                                </div>
                        </div>
                    }
                </form>
            </div>
        </div>
    )

};
