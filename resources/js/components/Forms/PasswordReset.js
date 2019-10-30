import React, {useState} from 'react';
export const PasswordReset = ({reset=f=>f}) => {

    const [password, setPassword] = useState("");
    const [verify, setVerify] = useState("");
    const [missing, setMissing] = useState(``);
    const [token, setToken] = useState(new URL(window.location.href).searchParams.get("token"));



    const submit = ()=>{
        if(password!==undefined && password.length>0){
                if(verify!==undefined && verify.length>0){
                    if(verify==password){
                        reset({password: password, token: token});
                    }
                    else {
                        setMissing({value: 'different', message: `Hesla sa nezhoduju.`});
                        console.log(missing);
                    }
                }
                else {
                    setMissing({value: 'verify password', message: `Nezadali ste heslo 2.`});
                    console.log(missing);
                }
        }
        else {
            setMissing({value: 'password', message: `Nezadali ste heslo.`});
            console.log(missing);
        }

    };


    return(
        <div>
            <input type="password" className={`col-5 p-0 my-2 py-2 px-4`} placeholder={`password`} onChange={(e)=>setPassword(e.target.value)}/>
            <input type="password" className={`col-5 p-0 my-2 py-2 px-4`} placeholder={`Also password`} onChange={(e)=>setVerify(e.target.value)}/>
            <div className="submit" onClick={()=>submit()} >
                submit
            </div>
        </div>
    )
};