import React, {useState} from 'react';


export const Login = ({login = f => f}) => {
    const [data,setData] = useState({});

    const submit = () => {
        login(data);
    };
    return (
        <div className={` registration-form | container-fluid | row col-12 | justify-content-center | mb-5 m-0 p-0 `}>
            <h1 className={` main-title | col-11 | my-4 p-0 | text-center `}>Login<span className={`doth`}>.</span></h1>
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

                    <input name={'email'} onChange={(e) => setData({...data, email : e.target.value})} value={data.email === undefined ? `` : data.email}/>
                    <input name={'password'} onChange={(e)=>setData({...data, password : e.target.value})} value={data.password ? data.password : ``}/>
                    <input type={'button'} onClick={submit}/>

                </form>
            </div>
        </div>
    )

};
