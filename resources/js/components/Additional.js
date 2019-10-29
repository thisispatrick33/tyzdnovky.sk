import React, {useState} from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import $ from 'jquery';

export const Additional = ({user, func = f => f}) => {
    function readURL(input) {
        console.log(input[0])
        if (input && input[0]) {
            let reader = new FileReader();
            reader.onload = function(e) {
                console.log(e.target.result);
                $('#imagePreview').css('background-image', 'url('+e.target.result +')');
                $('#imagePreview').hide();
                $('#imagePreview').fadeIn(650);
            }
            reader.readAsDataURL(input[0]);
        }
    }

    const [additionalData,setAdditionalData] = useState({drivingLicense: false});
    const [categories, setCategories] = useState([{value: null, practise: null, ready: null}]);
    const [languages, setLanguages] = useState([]);
    const [languagesInUse, setLanguagesInUse] = useState([{full : "czech", short : "cze"}, {full : "spanish", short : "spa"}, {full : "english", short : "eng"}, {full : "hungarian", short : "hun"}, {full : "arabic", short : "arb"}, {full : "portugese", short : "ptg"}, {full : "russian", short : "rus"}, {full : "japanese", short : "jap"}, {full : "german", short : "ger"}, {full : "korean", short : "kor"}, {full : "french", short : "fre"}, {full : "turkish", short : "tur"}, {full : "vietnamese", short : "vie"}]);
    const [additionalLanguage, setAdditionalLanguage] = useState("");
    const [missing, setMissing] = useState(``);
    var settings = {
        dots: true,
        arrows : true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true
    };
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
        if(categories.length<3){
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
            values[i].practise = value;
        }
        if(type=="r"){
            values[i].ready = value;
        }
        setCategories(values)

    };


    return (
        <div className={`additional-info-form | container-fluid | row col-12 | justify-content-center align-items-center | m-0 p-0`} style={{overflowY : `scroll`}}>
            <div className="content-frame | row  col-xl-6 col-lg-6 col-md-7 col-sm-9 col-11 | justify-content-center align-items-start | px-0 | shadow-sm py-5 my-5">
                <h1 className={'pt-3'}><span className="doth">Set up</span> your profile <span className="doth">...</span></h1>
                <div className="col-10 row main-info p-0 m-0 align-items-center">
                    <Slider {...settings} className={`col-12 p-0 py-3`}>
                        <div className={`col-12 m-0 p-0 row justify-content-center`}>
                            <div className="col-12 mx-0 p-0 row my-4 justify-content-around">
                                <h3 className="col-12 mb-3 p-0 text-center"><span className="doth">Who</span> are you <span className="doth">?</span></h3>
                                <div className={` input col-10 mt-3 row p-0 m-0 `}>
                                    <div className="col-2 pl-3 d-flex justify-content-center align-items-center">
                                        <svg style={{width : `24px`, height : `24px`}} fill="#2c393f" className={`col-12 p-0`} viewBox="-20 -99 640 640" >
                                            <path d="m179.25 211c35.691406 0 64.625-28.9375 64.625-64.625 0-35.691406-28.933594-64.625-64.625-64.625s-64.625 28.933594-64.625 64.625c.046875 35.671875 28.953125 64.578125 64.625 64.625zm0-104.125c21.882812 0 39.625 17.738281 39.625 39.625 0 21.882812-17.742188 39.625-39.625 39.625-21.886719 0-39.625-17.742188-39.625-39.625.007812-21.882812 17.742188-39.617188 39.625-39.625zm0 0"/>
                                            <path d="m179.25 234.875c-26.441406-.195312-51.820312 10.417969-70.25 29.375-18.75 19.125-29 45.125-29 73.375.019531 6.894531 5.605469 12.480469 12.5 12.5h173.5c6.894531-.019531 12.480469-5.605469 12.5-12.5 0-28.25-10.25-54.25-29-73.375-18.429688-18.957031-43.804688-29.570312-70.25-29.375zm-73.375 90.25c2.140625-16.34375 9.507812-31.554688 21-43.375 13.832031-13.996094 32.695312-21.875 52.375-21.875s38.542969 7.878906 52.375 21.875c11.46875 11.832031 18.835938 27.039062 21 43.375zm0 0"/>
                                            <path d="m537.5-5.25h-475c-34.511719.015625-62.484375 27.988281-62.5 62.5v317.5c.015625 34.511719 27.988281 62.484375 62.5 62.5h475c34.511719-.015625 62.484375-27.988281 62.5-62.5v-317.5c-.015625-34.511719-27.988281-62.484375-62.5-62.5zm37.5 380c-.058594 20.683594-16.816406 37.441406-37.5 37.5h-475c-20.683594-.058594-37.441406-16.816406-37.5-37.5v-317.5c.058594-20.683594 16.816406-37.441406 37.5-37.5h475c20.683594.058594 37.441406 16.816406 37.5 37.5zm0 0"/>
                                            <path d="m506.75 203.5h-145.625c-6.902344 0-12.5 5.59375-12.5 12.5s5.597656 12.5 12.5 12.5h145.625c6.902344 0 12.5-5.59375 12.5-12.5s-5.597656-12.5-12.5-12.5zm0 0"/>
                                            <path d="m506.75 283.5h-145.625c-6.902344 0-12.5 5.59375-12.5 12.5s5.597656 12.5 12.5 12.5h145.625c6.902344 0 12.5-5.59375 12.5-12.5s-5.597656-12.5-12.5-12.5zm0 0"/>
                                            <path fill={`#00C7C7`} d="m506.75 123.5h-145.625c-6.902344 0-12.5 5.59375-12.5 12.5s5.597656 12.5 12.5 12.5h145.625c6.902344 0 12.5-5.59375 12.5-12.5s-5.597656-12.5-12.5-12.5zm0 0"/>
                                        </svg>
                                    </div>
                                    <input
                                        id={`name`}
                                        type={`text`}
                                        name={`name`}
                                        placeholder={`Enter your name`}
                                        onChange={(e) => setAdditionalData({...additionalData, name: e.target.value})}
                                        value={additionalData.name ? additionalData.name  : ``}
                                        className={` pl-2 py-2 col-10`}
                                    />
                                </div>
                                <div className={` input col-10 my-3 row p-0 mx-0 `}>
                                    <div className="col-2 pl-3 d-flex justify-content-center align-items-center">
                                        <svg style={{width : `24px`, height : `24px`}} fill="#2c393f" className={`col-12 p-0`} viewBox="-20 -99 640 640" >
                                            <path d="m179.25 211c35.691406 0 64.625-28.9375 64.625-64.625 0-35.691406-28.933594-64.625-64.625-64.625s-64.625 28.933594-64.625 64.625c.046875 35.671875 28.953125 64.578125 64.625 64.625zm0-104.125c21.882812 0 39.625 17.738281 39.625 39.625 0 21.882812-17.742188 39.625-39.625 39.625-21.886719 0-39.625-17.742188-39.625-39.625.007812-21.882812 17.742188-39.617188 39.625-39.625zm0 0"/>
                                            <path d="m179.25 234.875c-26.441406-.195312-51.820312 10.417969-70.25 29.375-18.75 19.125-29 45.125-29 73.375.019531 6.894531 5.605469 12.480469 12.5 12.5h173.5c6.894531-.019531 12.480469-5.605469 12.5-12.5 0-28.25-10.25-54.25-29-73.375-18.429688-18.957031-43.804688-29.570312-70.25-29.375zm-73.375 90.25c2.140625-16.34375 9.507812-31.554688 21-43.375 13.832031-13.996094 32.695312-21.875 52.375-21.875s38.542969 7.878906 52.375 21.875c11.46875 11.832031 18.835938 27.039062 21 43.375zm0 0"/>
                                            <path d="m537.5-5.25h-475c-34.511719.015625-62.484375 27.988281-62.5 62.5v317.5c.015625 34.511719 27.988281 62.484375 62.5 62.5h475c34.511719-.015625 62.484375-27.988281 62.5-62.5v-317.5c-.015625-34.511719-27.988281-62.484375-62.5-62.5zm37.5 380c-.058594 20.683594-16.816406 37.441406-37.5 37.5h-475c-20.683594-.058594-37.441406-16.816406-37.5-37.5v-317.5c.058594-20.683594 16.816406-37.441406 37.5-37.5h475c20.683594.058594 37.441406 16.816406 37.5 37.5zm0 0"/>
                                            <path  fill={`#00C7C7`} d="m506.75 203.5h-145.625c-6.902344 0-12.5 5.59375-12.5 12.5s5.597656 12.5 12.5 12.5h145.625c6.902344 0 12.5-5.59375 12.5-12.5s-5.597656-12.5-12.5-12.5zm0 0"/>
                                            <path  d="m506.75 283.5h-145.625c-6.902344 0-12.5 5.59375-12.5 12.5s5.597656 12.5 12.5 12.5h145.625c6.902344 0 12.5-5.59375 12.5-12.5s-5.597656-12.5-12.5-12.5zm0 0"/>
                                            <path  d="m506.75 123.5h-145.625c-6.902344 0-12.5 5.59375-12.5 12.5s5.597656 12.5 12.5 12.5h145.625c6.902344 0 12.5-5.59375 12.5-12.5s-5.597656-12.5-12.5-12.5zm0 0"/>
                                        </svg>
                                    </div>
                                    <input
                                        id={`surname`}
                                        type={`text`}
                                        name={`surname`}
                                        placeholder={`Enter your surname`}
                                        onChange={(e) => setAdditionalData(user.type==="user" ? {...additionalData, lastName: e.target.value} : {...additionalData, ico: e.target.value})}
                                        value={additionalData.lastName ? additionalData.lastName  : ``}
                                        className={` pl-2 py-2 col-10`}
                                    />
                                </div>
                            </div>
                            <div className="col-12 row m-0 p-0 justify-content-center">
                                <hr className={`col-6 m-0`}/>
                            </div>
                            <div className="col-12 mx-0 p-0 row my-4 justify-content-around">
                                <h3 className="col-12 mb-3 p-0 text-center"><span className="doth">Contact</span> me here<span className="doth">.</span></h3>
                                <div className={` input col-10 mt-3 row p-0 mx-0`}>
                                    <div className="col-2 pl-3 d-flex justify-content-center align-items-center">
                                        <svg fill="#2c393f" style={{width : `24px`, height : `24px`}} className={`col-12 p-0`} enableBackground="new 0 0 512.076 512.076" version="1.1" viewBox="0 0 512.08 512.08" space="preserve" xmlns="http://www.w3.org/2000/svg">
                                            <g transform="translate(-1 -1)">
                                                <path d="m499.64 396.04-103.65-69.12c-13.153-8.701-30.784-5.838-40.508 6.579l-30.191 38.818c-3.88 5.116-10.933 6.6-16.546 3.482l-5.743-3.166c-19.038-10.377-42.726-23.296-90.453-71.04s-60.672-71.45-71.049-90.453l-3.149-5.743c-3.161-5.612-1.705-12.695 3.413-16.606l38.792-30.182c12.412-9.725 15.279-27.351 6.588-40.508l-69.12-103.65c-8.907-13.398-26.777-17.42-40.566-9.131l-43.341 26.035c-13.618 8.006-23.609 20.972-27.878 36.181-15.607 56.866-3.866 155.01 140.71 299.6 115 115 200.62 145.92 259.46 145.92 13.543 0.058 27.033-1.704 40.107-5.239 15.212-4.264 28.18-14.256 36.181-27.878l26.061-43.315c8.301-13.792 4.281-31.673-9.123-40.585zm-5.581 31.829-26.001 43.341c-5.745 9.832-15.072 17.061-26.027 20.173-52.497 14.413-144.21 2.475-283.01-136.32s-150.73-230.5-136.32-283.01c3.116-10.968 10.354-20.307 20.198-26.061l43.341-26.001c5.983-3.6 13.739-1.855 17.604 3.959l37.547 56.371 31.514 47.266c3.774 5.707 2.534 13.356-2.85 17.579l-38.801 30.182c-11.808 9.029-15.18 25.366-7.91 38.332l3.081 5.598c10.906 20.002 24.465 44.885 73.967 94.379 49.502 49.493 74.377 63.053 94.37 73.958l5.606 3.089c12.965 7.269 29.303 3.898 38.332-7.91l30.182-38.801c4.224-5.381 11.87-6.62 17.579-2.85l103.64 69.12c5.818 3.862 7.563 11.622 3.958 17.604z"/>
                                                <path fill={`#00C7C7`} d="m291.16 86.39c80.081 0.089 144.98 64.986 145.07 145.07 0 4.713 3.82 8.533 8.533 8.533s8.533-3.82 8.533-8.533c-0.099-89.503-72.63-162.04-162.13-162.13-4.713 0-8.533 3.82-8.533 8.533s3.82 8.533 8.533 8.533z"/>
                                                <path fill={`#00C7C7`} d="m291.16 137.59c51.816 0.061 93.806 42.051 93.867 93.867 0 4.713 3.821 8.533 8.533 8.533 4.713 0 8.533-3.82 8.533-8.533-0.071-61.238-49.696-110.86-110.93-110.93-4.713 0-8.533 3.82-8.533 8.533s3.82 8.533 8.533 8.533z"/>
                                                <path fill={`#00C7C7`} d="m291.16 188.79c23.552 0.028 42.638 19.114 42.667 42.667 0 4.713 3.821 8.533 8.533 8.533s8.533-3.82 8.533-8.533c-0.038-32.974-26.759-59.696-59.733-59.733-4.713 0-8.533 3.82-8.533 8.533s3.82 8.533 8.533 8.533z"/>
                                            </g>
                                        </svg>
                                    </div>
                                    <input
                                        id={`phone`}
                                        type={`text`}
                                        name={`phone`}
                                        placeholder={`Enter your phone number`}
                                        onChange={(e) => setAdditionalData({...additionalData, phone : e.target.value})}
                                        value={additionalData.phone ? additionalData.phone  : ``}
                                        className={` pl-2 py-2 col-10`}
                                    />
                                </div>
                                <div className={` input col-10 my-3 row p-0 mx-0`}>
                                    <div className="col-2 pl-3 d-flex justify-content-center align-items-center">
                                        <svg fill="#2c393f" style={{width : `24px`, height : `24px`}} className={`col-12 p-0`} enableBackground="new 0 0 511.991 511.991"  viewBox="0 0 511.99 511.99" space="preserve" >
			                                <path d="m511.99 196.24c0-0.179-0.094-0.333-0.102-0.503-0.053-0.591-0.17-1.175-0.35-1.741-0.118-0.505-0.281-0.999-0.486-1.476-0.244-0.452-0.529-0.881-0.853-1.28-0.338-0.489-0.727-0.941-1.161-1.348-0.137-0.12-0.196-0.282-0.341-0.393l-82.039-63.735v-66.057c0-14.138-11.462-25.6-25.6-25.6h-92.476l-37.027-28.749c-9.149-7.128-21.972-7.128-31.121 0l-37.034 28.749h-92.476c-14.138 0-25.6 11.461-25.6 25.6v66.057l-82.031 63.735c-0.145 0.111-0.205 0.273-0.341 0.393-0.434 0.407-0.823 0.859-1.161 1.348-0.324 0.399-0.61 0.828-0.853 1.28-0.207 0.476-0.37 0.97-0.486 1.476-0.178 0.555-0.295 1.127-0.35 1.707 0 0.171-0.102 0.324-0.102 0.503v290.17c0.034 2.748 0.515 5.471 1.425 8.064-1.959 2.954-1.867 6.816 0.229 9.674s5.752 4.106 9.158 3.126c4.312 3.081 9.48 4.737 14.78 4.736h460.8c5.322-0.011 10.506-1.691 14.822-4.804 0.728 0.224 1.483 0.347 2.244 0.367 3.117 0.018 5.991-1.68 7.479-4.419s1.349-6.074-0.362-8.679c0.907-2.593 1.385-5.317 1.417-8.064v-290.13zm-261.12-177.42c2.98-2.368 7.2-2.368 10.18 0l19.686 15.283h-49.493l19.627-15.283zm-223.16 476.08 223.16-173.35c2.982-2.354 7.19-2.354 10.172 0l223.23 173.35h-456.57zm467.22-13.329-223.39-173.49c-9.143-7.118-21.952-7.118-31.095 0l-223.39 173.49v-272.34l139.84 108.59c3.726 2.889 9.088 2.211 11.977-1.515s2.211-9.088-1.515-11.977l-142.06-110.32 60.032-46.643v65.937c0 4.713 3.821 8.533 8.533 8.533 4.713 0 8.533-3.821 8.533-8.533v-153.6c0-4.713 3.82-8.533 8.533-8.533h290.13c4.713 0 8.533 3.82 8.533 8.533v153.6c0 4.713 3.82 8.533 8.533 8.533s8.533-3.821 8.533-8.533v-65.937l60.032 46.643-142.32 110.52c-3.723 2.891-4.397 8.253-1.506 11.977 2.891 3.723 8.253 4.397 11.977 1.506l140.08-108.77v272.34z"/>
                                            <path fill={`#00C7C7`} d="m170.66 110.91h170.67c4.713 0 8.533-3.82 8.533-8.533s-3.82-8.533-8.533-8.533h-170.67c-4.713 0-8.533 3.82-8.533 8.533s3.82 8.533 8.533 8.533z"/>
                                            <path fill={`#00C7C7`} d="m349.86 153.58c0-4.713-3.82-8.533-8.533-8.533h-170.67c-4.713 0-8.533 3.821-8.533 8.533 0 4.713 3.82 8.533 8.533 8.533h170.67c4.713 0 8.533-3.821 8.533-8.533z"/>
                                            <path fill={`#00C7C7`} d="m349.86 204.78c0-4.713-3.82-8.533-8.533-8.533h-76.8c-4.713 0-8.533 3.82-8.533 8.533s3.82 8.533 8.533 8.533h76.8c4.713 0 8.533-3.821 8.533-8.533z"/>
                                        </svg>
                                    </div>
                                    <input
                                        id={`email`}
                                        type={`email`}
                                        name={`email`}
                                        placeholder={`Enter your email`}
                                        onChange={(e) => setAdditionalData({...additionalData, email : e.target.value})}
                                        value={additionalData.email ? additionalData.email  : ``}
                                        className={` pl-2 py-2 col-10`}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={`col-12 m-0 p-0 row justify-content-center`}>
                            <div className="col-12 mx-0 p-0 row my-4 languages justify-content-around">
                                <h3 className="col-12 mb-3 p-0 text-center"><span className="doth">language</span> skills <span className="doth">.</span></h3>
                                <div className="col-10 row justify-content-center">
                                    {
                                        languagesInUse.map( ({full,short}) => {
                                            return <div className={`language d-block col-auto row mx-2 my-2 px-3 align-items-center py-2 justify-content-center shadow-sm ${languages.includes(full) ? `on` : ``}`} onClick={() => handleLang(full)}>{window.innerHeight <= 768 ? short : full}</div>;
                                        })
                                    }
                                </div>
                                <div className={` input col-10 mt-4 row p-0 m-0 `}>
                                    <div className="col-2 pl-3 d-flex justify-content-center align-items-center">
                                        <svg viewBox="0 0 512 512" style={{width : `24px`, height : `24px`}} fill="#2c393f" className={`col-12 p-0`}>
                                            <path d="m470 180h-140.644531c.445312-4.933594.6875-9.929688.6875-14.980469 0-90.992187-74.03125-165.019531-165.023438-165.019531-28.984375 0-57.496093 7.625-82.453125 22.046875-4.78125 2.761719-6.417968 8.878906-3.65625 13.660156 2.765625 4.785157 8.882813 6.417969 13.664063 3.65625 21.917969-12.667969 46.96875-19.363281 72.445312-19.363281 79.964844 0 145.023438 65.054688 145.023438 145.019531 0 79.964844-65.058594 145.023438-145.023438 145.023438-33.472656 0-64.917969-11.089844-90.9375-32.066407-2.609375-2.101562-6.066406-2.730468-9.214843-1.765624l-26.542969 6.941406 10.398437-22.851563c1.496094-3.28125 1.105469-7.109375-1.015625-10.027343-18.125-24.894532-27.707031-54.375-27.707031-85.253907 0-25.542969 6.730469-50.65625 19.464844-72.621093 2.769531-4.78125 1.140625-10.898438-3.636719-13.667969s-10.894531-1.144531-13.667969 3.636719c-14.496094 25.007812-22.160156 53.589843-22.160156 82.652343 0 33.160157 9.714844 64.914063 28.152344 92.199219l-16.742188 36.785156c-1.601562 3.511719-1.035156 7.628906 1.449219 10.582032 2.484375 2.953124 6.445313 4.210937 10.179687 3.234374l42.527344-11.117187c28.507813 21.535156 63.621094 33.339844 99.453125 33.339844 7.800781 0 15.46875-.558594 22.980469-1.609375v87.566406c0 23.15625 18.839844 42 41.996094 42h141.433594l63.238281 51.738281c1.820312 1.492188 4.066406 2.257813 6.332031 2.257813 1.457031 0 2.917969-.316406 4.28125-.960938 3.492188-1.65625 5.71875-5.171875 5.71875-9.039062v-43.996094h19c23.160156 0 42-18.84375 42-42v-194c0-23.160156-18.839844-42-42-42zm22 236c0 12.128906-9.867188 22-22 22h-29c-5.523438 0-10 4.476562-10 10v32.894531l-49.390625-40.410156c-2.722656-2.484375-5.105469-2.484375-10.460937-2.484375h-141.152344c-12.128906 0-21.996094-9.871094-21.996094-22v-91.648438c59.152344-15.972656 105.238281-64.074218 118.296875-124.351562h143.703125c12.132812 0 22 9.867188 22 22zm0 0"/><path d="m399.761719 348.605469c3.390625-1.597657 5.742187-5.039063 5.742187-9.039063 0-5.519531-4.476562-10-10-10h-4.09375l-32.25-73.5c-1.597656-3.636718-5.191406-5.984375-9.160156-5.984375s-7.5625 2.347657-9.15625 5.984375l-32.25 73.5h-4.09375c-5.523438 0-10 4.480469-10 10 0 4 2.351562 7.441406 5.742188 9.039063l-12.011719 27.375c-2.21875 5.058593.082031 10.957031 5.136719 13.175781 5.058593 2.21875 10.957031-.082031 13.175781-5.140625l15.117187-34.449219h56.683594l15.117188 34.449219c1.644531 3.75 5.3125 5.984375 9.164062 5.984375 1.339844 0 2.703125-.269531 4.011719-.84375 5.054687-2.21875 7.359375-8.117188 5.136719-13.175781zm-69.328125-19.039063 19.566406-44.59375 19.566406 44.59375zm0 0"/><path d="m55.402344 65.398438c2.628906 0 5.207031-1.070313 7.070312-2.929688 1.859375-1.859375 2.929688-4.4375 2.929688-7.070312 0-2.628907-1.070313-5.207032-2.929688-7.070313-1.863281-1.859375-4.441406-2.929687-7.070312-2.929687-2.640625 0-5.210938 1.070312-7.070313 2.929687-1.859375 1.863281-2.929687 4.441406-2.929687 7.070313 0 2.632812 1.070312 5.210937 2.929687 7.070312 1.859375 1.863281 4.4375 2.929688 7.070313 2.929688zm0 0"/><path d="m105.328125 225.878906c-4.84375 2.65625-6.617187 8.734375-3.960937 13.578125 1.820312 3.316407 5.246093 5.195313 8.777343 5.195313 1.625 0 3.273438-.398438 4.800781-1.234375 22.300782-12.230469 39.457032-31.253907 49.492188-53.6875 10.039062 22.433593 27.191406 41.457031 49.492188 53.6875 1.527343.835937 3.175781 1.234375 4.800781 1.234375 3.53125 0 6.957031-1.878906 8.777343-5.195313 2.65625-4.84375.882813-10.921875-3.960937-13.578125-26.105469-14.316406-43.675781-39.902344-48.039063-68.8125h44.398438c5.523438 0 10-4.476562 10-10 0-5.523437-4.476562-10-10-10h-45.46875v-41.671875c0-5.523437-4.476562-10-10-10s-10 4.476563-10 10v41.671875h-36.125c-5.523438 0-10 4.476563-10 10 0 5.523438 4.476562 10 10 10h35.054688c-4.363282 28.910156-21.933594 54.5-48.039063 68.8125zm0 0"/></svg>
                                    </div>
                                    <input
                                        id={`name`}
                                        type={`text`}
                                        name={`another`}
                                        placeholder={`Do you know another language?`}
                                        onChange={(e) => setAdditionalLanguage(e.target.value)}
                                        className={` pl-2 py-2 col-10`}
                                    />
                                </div>
                               </div>
                        </div>
                        <div className={`col-12 m-0 p-0 row justify-content-center`}>
                            <div className="col-12 mx-0 p-0 row my-4 languages justify-content-around">
                                <h3 className="col-12 mb-3 p-0 text-center"><span className="doth">work</span> skills <span className="doth">.</span></h3>
                                <div className="col-12 m-0 p-0 row justify-content-center">
                                    {
                                        categories.map(({value, practise, ready},i)=>{
                                            return (
                                                <div className={`shadow-sm  work-option-frame col-12 justify-content-center p-0 row mx-0 my-3 position-relative`}>
                                                    <div className="col-12 justify-content-around row py-3 px-2">
                                                        <div className={` input col-6 row p-0 m-0 `}>
                                                            <div className="col-4 pl-3 d-flex justify-content-center align-items-center">
                                                                <svg style={{width : `24px`, height : `24px`}} fill="#2c393f" className={`col-12 p-0`}  viewBox="0 -24 480 480"><path d="m456 72h-104v-32c-.027344-22.082031-17.917969-39.9726562-40-40h-144c-22.082031.0273438-39.972656 17.917969-40 40v32h-104c-13.253906 0-24 10.746094-24 24v178.078125c.0507812 10.148437 6.445312 19.175781 16 22.585937v111.335938c0 13.253906 10.746094 24 24 24h400c13.253906 0 24-10.746094 24-24v-111.328125c9.554688-3.414063 15.953125-12.445313 16-22.59375v-178.078125c0-13.253906-10.746094-24-24-24zm-312-32c0-13.253906 10.746094-24 24-24h144c13.253906 0 24 10.746094 24 24v32h-16v-32c0-4.417969-3.582031-8-8-8h-144c-4.417969 0-8 3.582031-8 8v32h-16zm160 32h-128v-24h128zm144 336c0 4.417969-3.582031 8-8 8h-400c-4.417969 0-8-3.582031-8-8v-108.585938l176 24.273438v20.3125c0 13.253906 10.746094 24 24 24h16c13.253906 0 24-10.746094 24-24v-20.3125l176-24.273438zm-192-64c0 4.417969-3.582031 8-8 8h-16c-4.417969 0-8-3.582031-8-8v-48c0-4.417969 3.582031-8 8-8h16c4.417969 0 8 3.582031 8 8zm208-69.921875c.003906 3.988281-2.929688 7.371094-6.878906 7.929687l-2.21875.304688-182.902344 25.222656v-11.535156c0-13.253906-10.746094-24-24-24h-16c-13.253906 0-24 10.746094-24 24v11.535156l-185.113281-25.527344c-3.949219-.554687-6.890625-3.9375-6.886719-7.929687v-178.078125c0-4.417969 3.582031-8 8-8h432c4.417969 0 8 3.582031 8 8zm0 0"/></svg>
                                                            </div>
                                                            <input
                                                                id={`name`}
                                                                type={`text`}
                                                                name={`another`}
                                                                className={` pl-2 py-2 col-8`}
                                                                placeholder={`work option`}
                                                                value={categories[i].value}
                                                                onChange={(e)=>onChangeInput(e.target.value, "w", i)}
                                                            />
                                                        </div>
                                                        <div className={`input col-5 row p-0 m-0 `}>
                                                            <div className="col-5 pl-3 d-flex justify-content-center align-items-center">
                                                                <svg style={{width : `24px`, height : `24px`}} fill="#2c393f" className={`col-12 p-0`} enableBackground="new 0 0 58 58" viewBox="0 0 58 58" space="preserve">
                                                                    <path d="m42.899 4.5c-0.465-2.279-2.484-4-4.899-4-0.553 0-1 0.447-1 1s0.447 1 1 1c1.654 0 3 1.346 3 3s-1.346 3-3 3c-0.553 0-1 0.447-1 1s0.447 1 1 1c2.414 0 4.434-1.721 4.899-4h13.101v9h-54v-9h17c0.553 0 1-0.447 1-1s-0.447-1-1-1h-1.816c0.414-1.162 1.514-2 2.816-2 1.654 0 3 1.346 3 3s-1.346 3-3 3c-0.553 0-1 0.447-1 1s0.447 1 1 1c2.757 0 5-2.243 5-5s-2.243-5-5-5c-2.414 0-4.434 1.721-4.899 4h-15.101v53h58v-53h-15.101zm13.101 51h-54v-38h54v38z"/>
                                                                    <path d="m26 2.5c1.654 0 3 1.346 3 3s-1.346 3-3 3c-0.553 0-1 0.447-1 1s0.447 1 1 1c2.757 0 5-2.243 5-5s-2.243-5-5-5c-0.553 0-1 0.447-1 1s0.447 1 1 1z"/>
                                                                    <path d="m32 2.5c1.654 0 3 1.346 3 3s-1.346 3-3 3c-0.553 0-1 0.447-1 1s0.447 1 1 1c2.757 0 5-2.243 5-5s-2.243-5-5-5c-0.553 0-1 0.447-1 1s0.447 1 1 1z"/>
                                                                    <circle cx="22" cy="24.5" r="1"/>
                                                                    <circle cx="29" cy="24.5" r="1"/>
                                                                    <circle cx="36" cy="24.5" r="1"/>
                                                                    <circle cx="43" cy="24.5" r="1"/>
                                                                    <circle cx="50" cy="24.5" r="1"/>
                                                                    <circle cx="8" cy="32.5" r="1"/>
                                                                    <circle cx="15" cy="32.5" r="1"/>
                                                                    <circle cx="22" cy="32.5" r="1"/>
                                                                    <circle cx="29" cy="32.5" r="1"/>
                                                                    <circle cx="36" cy="32.5" r="1"/>
                                                                    <circle cx="43" cy="32.5" r="1"/>
                                                                    <circle cx="50" cy="32.5" r="1"/>
                                                                    <circle cx="8" cy="39.5" r="1"/>
                                                                    <circle cx="15" cy="39.5" r="1"/>
                                                                    <circle cx="22" cy="39.5" r="1"/>
                                                                    <circle cx="29" cy="39.5" r="1"/>
                                                                    <circle cx="36" cy="39.5" r="1"/>
                                                                    <circle cx="43" cy="39.5" r="1"/>
                                                                    <circle cx="50" cy="39.5" r="1"/>
                                                                    <circle cx="8" cy="47.5" r="1"/>
                                                                    <circle cx="15" cy="47.5" r="1"/>
                                                                    <circle cx="22" cy="47.5" r="1"/>
                                                                    <circle cx="29" cy="47.5" r="1"/>
                                                                    <circle cx="36" cy="47.5" r="1"/>
                                                                </svg>
                                                            </div>
                                                            <input
                                                                id={`name`}
                                                                type={`text`}
                                                                name={`another`}
                                                                className={` pl-2 py-2 col-7`}
                                                                placeholder={`practise`}
                                                                value={categories[i].practise}
                                                                onChange={(e)=>onChangeInput(e.target.value, "p", i)}
                                                            />
                                                        </div>
                                                        <p className={`col-12 text-center mt-3 mb-0`}><span className="doth">When</span> can you get to work <span className="doth">?</span></p>
                                                        <div className={` input col-8 mt-1 row p-0 m-0 `}>
                                                            <div className="col-4 pl-3 d-flex justify-content-center align-items-center">
                                                                <svg style={{width : `24px`, height : `24px`}} fill="#2c393f" enableBackground="new 0 0 41.301 41.301" version="1.1" viewBox="0 0 41.301 41.301" space="preserve">
                                                                    <path d="m20.642 0c5.698 0 10.857 2.317 14.602 6.047 3.73 3.746 6.047 8.905 6.047 14.603s-2.317 10.857-6.047 14.603c-3.746 3.73-8.904 6.047-14.602 6.047s-10.856-2.317-14.586-6.047c-3.746-3.746-6.048-8.904-6.048-14.603 0-5.698 2.301-10.857 6.047-14.603 3.731-3.73 8.889-6.047 14.587-6.047zm10.524 19.523c0.619 0 1.111 0.508 1.111 1.127s-0.492 1.127-1.111 1.127h-10.524c-0.413 0-0.778-0.238-0.968-0.571l-0.016-0.016-0.016-0.032v-0.016l-0.032-0.064v-0.016l-0.016-0.032-0.016-0.016v-0.032l-0.016-0.032v-0.016l-0.016-0.032v-0.064l-0.016-0.016v-13.616c0-0.619 0.492-1.111 1.111-1.111s1.127 0.492 1.127 1.111v12.317h9.398zm2.491-11.888c-3.333-3.333-7.936-5.381-13.015-5.381s-9.682 2.047-13.015 5.381c-3.317 3.333-5.381 7.936-5.381 13.015s2.063 9.682 5.381 13.016c3.333 3.333 7.936 5.381 13.015 5.381s9.682-2.048 13.015-5.381 5.397-7.936 5.397-13.016c0-5.079-2.063-9.682-5.397-13.015z" /></svg>
                                                            </div>
                                                            <input
                                                                id={`name`}
                                                                type={`date`}
                                                                name={`another`}
                                                                className={` pl-2 py-2 col-8`}
                                                                value={categories[i].ready}
                                                                onChange={(e)=>onChangeInput(e.target.value, "r", i)}
                                                                placeholder={`ready`}
                                                            />
                                                        </div>

                                                    </div>
                                                    {
                                                        categories.length > 1 ? <div className="remove-button shadow" onClick={() => removeWork(i)}> <svg className={`m-2`} style={{width : `16px`, height : `16px`}} fill="#d10003" enableBackground="new 0 0 22.88 22.88" version="1.1" viewBox="0 0 22.88 22.88" space="preserve" xmlns="http://www.w3.org/2000/svg"><path fill="#d10003"  d="m0.324 1.909c-0.429-0.429-0.429-1.143 0-1.587 0.444-0.429 1.143-0.429 1.587 0l9.523 9.539 9.539-9.539c0.429-0.429 1.143-0.429 1.571 0 0.444 0.444 0.444 1.159 0 1.587l-9.523 9.524 9.523 9.539c0.444 0.429 0.444 1.143 0 1.587-0.429 0.429-1.143 0.429-1.571 0l-9.539-9.539-9.523 9.539c-0.444 0.429-1.143 0.429-1.587 0-0.429-0.444-0.429-1.159 0-1.587l9.523-9.539-9.523-9.524z" fill="#1E201D"/> </svg></div> : ``
                                                    }

                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                {
                                    categories.length <= 1 ? <div className={`col-11 p-0 m-0 text-right`} onClick={addWork}>
                                        <span className="doth">+ another profession</span>
                                    </div> : ``
                                }

                            </div>
                        </div>
                        <div className={`col-12 m-0 p-0 row justify-content-center`}>
                            <div className="container">
                                <div className="avatar-upload">
                                    <div className="avatar-edit">
                                        <input onChange={(e) => readURL(e.target.files)} type='file' id="imageUpload" accept=".png, .jpg, .jpeg"/>
                                        <label htmlFor="imageUpload" className={`d-flex justify-content-center align-items-center`}><svg style={{width : `20px`, height : `20px`}} fill="#2c393f" enableBackground="new 0 0 469.331 469.331" version="1.1" viewBox="0 0 469.33 469.33" space="preserve" xmlns="http://www.w3.org/2000/svg">
                                            <path d="m438.93 30.403c-40.4-40.5-106.1-40.5-146.5 0l-268.6 268.5c-2.1 2.1-3.4 4.8-3.8 7.7l-19.9 147.4c-0.6 4.2 0.9 8.4 3.8 11.3 2.5 2.5 6 4 9.5 4 0.6 0 1.2 0 1.8-0.1l88.8-12c7.4-1 12.6-7.8 11.6-15.2s-7.8-12.6-15.2-11.6l-71.2 9.6 13.9-102.8 108.2 108.2c2.5 2.5 6 4 9.5 4s7-1.4 9.5-4l268.6-268.5c19.6-19.6 30.4-45.6 30.4-73.3s-10.8-53.7-30.4-73.2zm-141.3 33 45.1 45.1-245.1 245.1-45.1-45.1 245.1-245.1zm-136.7 353.4-44.1-44.1 245.1-245.1 44.1 44.1-245.1 245.1zm263.9-264.4-107.9-107.9c13.7-11.3 30.8-17.5 48.8-17.5 20.5 0 39.7 8 54.2 22.4s22.4 33.7 22.4 54.2c0 18.1-6.2 35.1-17.5 48.8z"/></svg></label>
                                    </div>
                                    <div className="avatar-preview">
                                        <div id="imagePreview"
                                             style={{backgroundImage: "url('http://i.pravatar.cc/500?img=7');"}}>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="SUBMIT">submit</div>
                        </div>
                    </Slider>
                </div>


            </div>
        </div>

    )

};
