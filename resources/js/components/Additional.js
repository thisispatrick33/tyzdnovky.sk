import React, {useState} from 'react';
export const Additional = ({user, func = f => f}) => {

    const [additionalData,setAdditionalData] = useState({drivingLicense: false});
    const [categories, setCategories] = useState([{value: null, practise: null, ready: null}]);
    const [languages, setLanguages] = useState([]);
    const [additionalLanguage, setAdditionalLanguage] = useState("");
    const [missing, setMissing] = useState(``);

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd
    }
    if(mm<10){
        mm='0'+mm
    }

    today = yyyy+'-'+mm+'-'+dd;


    const handleLang = (value) => {
        let array = [...languages];
        array.includes(value) ? array=array.filter(lan => value !== lan) : array.push(value);
        setLanguages(array);
    };

    const formValidator=()=>{
        if(additionalData.username !== undefined && additionalData.username.length > 0){
            if(additionalData.name !== undefined && additionalData.name.length > 0){
                if((user.type==="user"&&additionalData.lastName !== undefined && additionalData.lastName.length > 0)||(user.type==="company"&&additionalData.ico !== undefined && additionalData.ico.length > 0)){
                    if(additionalData.phone !== undefined && additionalData.phone.length > 0){
                        if(additionalData.email !== undefined && additionalData.email.length > 0){
                            if(additionalData.email.includes('@')){
                                if((languages !== undefined && languages.length>0)||(additionalLanguage!=""&&additionalLanguage.length>0)){
                                    if(categories[0].value!==null && categories[0].value.length>0){
                                        if(categories[0].practise!==null && categories[0].value.length>0){
                                            if(categories[0].practise>0){
                                                if(categories[0].ready!==null && categories[0].ready.length>0){
                                                    if(categories[0].ready>today){
                                                        if(categories.length==1){
                                                            submit();
                                                        }else {
                                                            if(categories.length==2){
                                                                console.log("sem");
                                                                if(categories[1].value!==null && categories[1].value.length>0) {
                                                                    if (categories[1].practise !== null && categories[1].value.length > 0) {
                                                                        if (categories[1].practise > 0) {
                                                                            if (categories[1].ready !== null && categories[1].ready.length > 0) {
                                                                                if (categories[1].ready > today) {
                                                                                    submit();
                                                                                }else {
                                                                                    setMissing({value: 'ready', message: `Nezadali ste platny datum nastupu.`});
                                                                                    console.log(missing);
                                                                                }
                                                                            }else {
                                                                                setMissing({value: 'ready', message: `Nezadali ste datum nastupu.`});
                                                                                console.log(missing);
                                                                            }
                                                                        }else {
                                                                            setMissing({value: 'practise', message: `Nezadali ste platnu prax v odbore.`});
                                                                            console.log(missing);
                                                                        }
                                                                    }else {
                                                                        setMissing({value: 'practise', message: `Nezadali ste prax v odbore.`});
                                                                        console.log(missing);
                                                                    }
                                                                }else {
                                                                    setMissing({value: 'category', message: `Nezadali ste odbor.`});
                                                                    console.log(missing);
                                                                }
                                                            }
                                                            if(categories.length==3){
                                                                if(categories[2].value!== null && categories[2].value.length>0) {
                                                                    if (categories[2].practise !== null && categories[2].value.length > 0) {
                                                                        if (categories[2].practise > 0) {
                                                                            if (categories[2].ready !== null && categories[1].ready.length > 0) {
                                                                                if (categories[2].ready > today) {
                                                                                    submit();
                                                                                }else {
                                                                                    setMissing({value: 'ready', message: `Nezadali ste platny datum nastupu.`});
                                                                                    console.log(missing);
                                                                                }
                                                                            }else {
                                                                                setMissing({value: 'ready', message: `Nezadali ste datum nastupu.`});
                                                                                console.log(missing);
                                                                            }
                                                                        }else {
                                                                            setMissing({value: 'practise', message: `Nezadali ste platnu prax v odbore.`});
                                                                            console.log(missing);
                                                                        }
                                                                    }else {
                                                                        setMissing({value: 'practise', message: `Nezadali ste prax v odbore.`});
                                                                        console.log(missing);
                                                                    }
                                                                }else {
                                                                    setMissing({value: 'category', message: `Nezadali ste odbor.`});
                                                                    console.log(missing);
                                                                }
                                                            }
                                                        }
                                                    }
                                                    else {
                                                        setMissing({value: 'ready', message: `Nezadali ste platny datum nastupu.`});
                                                        console.log(missing);
                                                    }
                                                }
                                                else {
                                                    setMissing({value: 'ready', message: `Nezadali ste datum nastupu.`});
                                                    console.log(missing);
                                                }

                                            }
                                            else {
                                                setMissing({value: 'practise', message: `Nezadali ste platnu prax v odbore.`});
                                                console.log(missing);
                                            }
                                        }
                                        else {
                                            setMissing({value: 'practise', message: `Nezadali ste prax v odbore.`});
                                            console.log(missing);
                                        }
                                    }
                                    else {
                                        setMissing({value: 'category', message: `Nezadali ste ziaden odbor.`});
                                        console.log(missing);
                                    }
                                }
                                else {
                                    setMissing({value: 'language', message: `Nezadali ste ziaden jazyk.`});
                                    console.log(missing);
                                }
                            }
                            else {
                                setMissing({value: '@', message: `Nezadali ste platny email.`});
                                console.log(missing);
                            }
                        }else {
                            setMissing({value: 'email', message: `Nezadali ste email.`});
                            console.log(missing);
                        }
                    }else {
                        setMissing({value: 'phone', message: `Nezadali ste telefon.`});
                        console.log(missing);
                    }
                }
                else {
                    if(user.type==="user"){
                        setMissing({value: 'lastName', message: `Nezadali ste priezvisko.`});
                        console.log(missing);
                    }
                    if(user.type==="company"){
                        setMissing({value: 'ico', message: `Nezadali ste ICO.`});
                        console.log(missing);
                    }

                }
            }else {
                setMissing({value: 'name', message: `Nezadali ste meno.`});
                console.log(missing);
            }
        }
        else {
            setMissing({value: 'username', message: `Nezadali ste username.`});
            console.log(missing);
        }
    };

    const submit= async()=>{
        if(additionalLanguage!=""){
            await func({...additionalData, categories: categories,languages: [...languages, additionalLanguage]});
        }
        else {
            await func({...additionalData, categories: categories,languages: languages});
        }
        console.log("addit")
    };

    const addWork=()=>{
        let values = [...categories];
        if(categories.length<2){
            values.push({value: null, practise: null, ready: null});
            setCategories(values);
        }
    };

    const removeWork=(i)=>{
        let values = [...categories];
        values = values.filter((value, index)=>index!==i);
        setCategories(values);
    };

    const onChangeInput=(value, type, i)=>{
        let values = [...categories];

        if(type=="w"){
            values[i].value = value;
        }
        if(type=="p"){
            let validatedValue = "";
            for (let i=0; i<value.length; i++){
                if(value.charCodeAt(i)>47&&value.charCodeAt(i)<58){
                    validatedValue+=value.charAt(i);
                }
            }
            values[i].practise = validatedValue;
        }
        if(type=="r"){
            values[i].ready = value;
        }
        setCategories(values)

    };





    return (
        <div className={`additional-info-form | container-fluid | row col-12 | justify-content-center align-items-center | m-0 p-0`} style={{overflowY : `scroll`}}>
            <div className="content-frame | row  col-10 | justify-content-center align-items-start | px-0 | shadow-sm py-5 my-5">
                <h1 className={'pt-5'}>update your profile</h1>
                <div className="col-10 row main-info p-0 m-0 align-items-center">
                    <div className="col-3 row">
                        <div className="col-12 profile-photo">
                            <img src={`./images/profile-photo.png`} alt="" className={`col-12`}/>
                        </div>
                    </div>
                    <div className="col-9 row">
                        <input type="text" className={`col-12 p-0 my-2 py-2 px-4`} placeholder={`Username`}
                               onChange={(e) => setAdditionalData({...additionalData, username: e.target.value})}/>
                        <input type="text" className={`col-12 p-0 my-2 py-2 px-4`} placeholder={user.type==="user" ? `First name` : `Company name`}
                               onChange={(e) => setAdditionalData({...additionalData, name: e.target.value})}/>
                        <input type="text" className={`col-12 p-0 my-2 py-2 px-4`} placeholder={user.type==="user" ? `Last name` : `Business ID`}
                               onChange={(e) => setAdditionalData(user.type==="user" ? {...additionalData, lastName: e.target.value} : {...additionalData, ico: e.target.value})}/>
                    </div>
                </div>
                <div className="col-10 row main-info">
                    <h3 className="col-12">kontakt</h3>
                    <div className="col-12 row justify-content-around">
                        <input type="text" className={`col-5 p-0 my-2 py-2 px-4`} placeholder={`Phone`}
                               onChange={(e) => setAdditionalData({...additionalData, phone: e.target.value})}/>
                        <input type="text" className={`col-5 p-0 my-2 py-2 px-4`} value={user.email}
                               onChange={(e) => setAdditionalData({...additionalData, email: user.email})}/>
                    </div>
                </div>
                <div className="col-10 row languages justify-content-center">
                    <h3 className="col-12">jazykové znalosti</h3>
                    <div className="col-10 row justify-content-around">
                       <div className={`col-2 row m-0 px-0 py-2 justify-content-center`}><div className={`language col-10 px-0 py-2 text-center`} onClick={() => handleLang("english")}>english</div></div>
                       <div className={`col-2 row m-0 px-0 py-2 justify-content-center`}><div className="language col-10 px-0 py-2 text-center" onClick={() => handleLang("slovak")}>slovak</div></div>
                       <div className={`col-2 row m-0 px-0 py-2 justify-content-center`}><div className="language col-10 px-0 py-2 text-center" onClick={() => handleLang("danish")}>danish</div></div>
                       <div className={`col-2 row m-0 px-0 py-2 justify-content-center`}><div className="language col-10 px-0 py-2 text-center" onClick={() => handleLang("french")}>french</div></div>
                       <div className={`col-2 row m-0 px-0 py-2 justify-content-center`}><div className="language col-10 px-0 py-2 text-center" onClick={() => handleLang("czech")}>czech</div></div>
                       <div className={`col-2 row m-0 px-0 py-2 justify-content-center`}><div className="language col-10 px-0 py-2 text-center" onClick={() => handleLang("cigansky")}>cigansky</div></div>
                       <div className={`col-2 row m-0 px-0 py-2 justify-content-center`}><div className="language col-10 px-0 py-2 text-center" onClick={() => handleLang("hungarian")}>hungarian</div></div>
                    </div>
                    <input type="text" className={`col-6 p-0 my-2 py-2 px-4`} placeholder={`another`}
                           onChange={(e) => setAdditionalLanguage(e.target.value)}/>
                </div>

                <div className="col-10 row work-info justify-content-center">
                    <h3 className="col-12">work</h3>
                    {
                        categories.map(({value, practise, ready},i)=>{
                            return (
                                <div>
                                    <div className="col-10 row">
                                        <input type="text" className={`col-8 p-0 my-2 py-2 px-4 mr-4`} placeholder={`work option`} value={categories[i].value} onChange={(e)=>onChangeInput(e.target.value, "w", i)}/>
                                        <input type="text" className={`col-2 p-0 my-2 py-2 px-4`} placeholder={`practise`} value={categories[i].practise} onChange={(e)=>onChangeInput(e.target.value, "p", i)}/>
                                        <input type="date" className={`col-2 p-0 my-2 py-2 px-4`} placeholder={`ready`} value={categories[i].ready} min={today} onChange={(e)=>onChangeInput(e.target.value, "r", i)}/>
                                    </div>
                                    {
                                        categories.length>1 ? <div className="submit" onClick={() => removeWork(i)}> X </div> : ``
                                    }

                                </div>
                            )
                        })
                    }
                    <div className="submit" onClick={addWork}>
                        dalsie
                    </div>


                </div>
                <div className="col-10 row work-info justify-content-center" onClick={() => setAdditionalData({...additionalData, drivingLicense : true})}>vodicak</div>
                <div className="submit" onClick={()=>formValidator()}>
                    submit
                </div>
            </div>
        </div>

    )

};
