import React, {useState, useEffect} from 'react';
import $ from "jquery";
export const ForgottenPassword = ({reset=f=>f, close = f =>f}) => {

    const [email, setEmail] = useState("");
    const [missing, setMissing] = useState(``);
    useEffect(() => {
        $('.forgotten-password-form').css("display", "flex")
            .hide()
            .fadeIn();
    },[]);
    const backToLogin = () => {
        $.when($('.forgotten-password-form').fadeOut()).done(() => close());
    }
    const submit = ()=>{
        if(email !== undefined && email.length>0){
            if(email.includes("@")){
                setMissing({});
                reset({login: email});
            }
            else {
                setMissing({value: '@', message: `Nezadali ste platny email.`});
                console.log(missing);
            }
        }
        else {
            setMissing({value: 'email', message: `Nezadali ste email.`});
            console.log(missing);
        }

    };


    return(
            <div className={`forgotten-password-form row col-xl-4 col-lg-5 col-md-6 col-sm-8 col-12 | align-items-start | justify-content-center align-items-center | m-0`}>
                <div className="col-11 justify-content-center row">
                    <div className=" row m-0 p-0 col-12 header justify-content-center">
                        <h1 className={`col-11 p-0 text-center sign-in`}> forgotten <span className="highlighted">password.</span></h1>
                    </div>
                    <div className={` input col-11 mt-3 row p-0 mx-0 ${(missing.value === "@" || missing.value === "email") ? `warning-frame` : ``}`}>
                            <input
                                id={`email`}
                                type={`text`}
                                name={`email`}
                                placeholder={`Enter your email`}
                                onChange={(e)=>setEmail(e.target.value)}
                                value={email !== `` ? email : ``}
                                className={` pl-3 py-2 col-xl-10 col-lg-10 col-md-10 col-12`}
                            />
                    </div>
                    {(missing.value === "@" || missing.value === "email" || missing.value === "login") ? <p className={`col-11 pl-2 pt-1 warning-message mb-0`}>{missing.message}</p> : ``}
                    <button
                        className={`submit-button sign-in-button col-6 text-center py-2 mb-5 mt-3 `}
                        onClick={()=>submit()}><span>send email</span></button>

                    <div className="col-12 row problems">
                                <div className="col-12" onClick={backToLogin}>
                                    <p>back to login</p>
                                </div>
                        </div>
                    </div>
            </div>
    )
};
