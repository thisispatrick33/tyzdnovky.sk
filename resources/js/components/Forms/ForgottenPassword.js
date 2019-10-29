import React, {useState} from 'react';
export const ForgottenPassword = ({reset=f=>f}) => {

    const [email, setEmail] = useState("");
    const [missing, setMissing] = useState(``);

    const submit = ()=>{
        if(email!==undefined && email.length>0){
            if(email.includes("@")){
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
        <div>
            <input type="email" className={`col-5 p-0 my-2 py-2 px-4`} placeholder={`Email`} onChange={(e)=>setEmail(e.target.value)}/>
            <div className="submit" onClick={()=>submit()} >
                submit
            </div>
        </div>
    )
};