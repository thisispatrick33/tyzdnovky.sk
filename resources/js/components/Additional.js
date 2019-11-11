import React, {useEffect, useState} from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import $ from 'jquery';
import axios from "axios";

export const Additional = ({user, func = f => f}) => {
    const [additionalData,setAdditionalData] = useState({drivingLicense: false, email: user.email, profile_pic: null});
    const [languages, setLanguages] = useState([]);
    const languagesInUse = [{full : "czech", short : "cze"}, {full : "spanish", short : "spa"}, {full : "english", short : "eng"}, {full : "hungarian", short : "hun"}, {full : "arabic", short : "arb"}, {full : "portugese", short : "ptg"}, {full : "russian", short : "rus"}, {full : "japanese", short : "jap"}, {full : "german", short : "ger"}, {full : "korean", short : "kor"}, {full : "french", short : "fre"}, {full : "turkish", short : "tur"}, {full : "vietnamese", short : "vie"}];
    const [additionalLanguage, setAdditionalLanguage] = useState("");
    const [missing, setMissing] = useState(``);
    const [dataAdditional, setDataAdditional] = useState({});
    const [categories, setCategories] = useState({fullTimeCategories: [], freeTimeCategories:[]});

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'api/register-additional',
            );
            setDataAdditional(result.data);
        };
        fetchData();
    }, []);


    function readURL(input) {
        console.log("input");
        console.log(input);
        setAdditionalData({...additionalData, profile_pic: input});
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

    const handleLang = (value) => {
        let array = [...languages];
        array.includes(value) ? array=array.filter(lan => value !== lan) : array.push(value);
        setLanguages(array);
    };

    const handleFullWork = (value) => {
        let array = [...categories.fullTimeCategories];
        array.includes(value) ? array=array.filter(work => value !== work) : array.push(value);
        setCategories({...categories, fullTimeCategories: array});
    };

    const handleFreeWork = (value) => {
        let array = [...categories.freeTimeCategories];
        array.includes(value) ? array=array.filter(work => value !== work) : array.push(value);
        setCategories({...categories, freeTimeCategories: array});
    };

    const formValidator=()=>{
            if(additionalData.username !== undefined && additionalData.username.length > 0){
                if(additionalData.name !== undefined && additionalData.name.length > 0){
                    if((user.type==="user"&&additionalData.lastName !== undefined && additionalData.lastName.length > 0)||(user.type==="company"&&additionalData.ico !== undefined && additionalData.ico.length > 0)){
                        if(additionalData.phone !== undefined && additionalData.phone.length > 0){
                            if(additionalData.email !== undefined && additionalData.email.length > 0){
                                if(additionalData.email.includes('@')){
                                    if((languages !== undefined && languages.length>0)||(additionalLanguage!=""&&additionalLanguage.length>0)){
                                        submit();
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

    const submit = async () =>{
        if(user.type === "user"){
            if(additionalLanguage!=""){
                await func({...additionalData, categories: categories, languages: [...languages, additionalLanguage]});
            }
            else {
                await func({...additionalData, categories: categories, languages: languages});
            }
        }else{
            await func({...additionalData});
        }

    };

    const settings = {
        dots: true,
        arrows : true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight : false,
        nextArrow: <NextArrow />,
        prevArrow: <PreviousArrow />
    };

    if(dataAdditional==undefined){
        console.log(dataAdditional==undefined);
        return <div>Loading</div>
    }
    return (
        console.log(dataAdditional),
        <div className={`additional-info-form | container-fluid | row col-12 | justify-content-center align-items-center | m-0 p-0`} style={{overflowY : `scroll`}}>
            <div className="content-frame | row  col-xl-6 col-lg-6 col-md-7 col-12 | justify-content-center align-items-center | px-0 | shadow-sm py-xl-5 py-lg-5 py-md-5 py-0 my-xl-5 my-lg-5 my-md-5 my-0">
                <div className="col-10 row main-info p-0 m-0 align-items-center">
                    <h1 className={'col-12 p-0 text-center'}><span className="doth">Set up</span> your profile <span className="doth">...</span></h1>
                    <Slider {...settings} className={`col-12 p-0 py-xl-3 py-lg-3 py-md-2 py-md-1 py-1`}>
                        <div className={`col-12 m-0 p-0 row justify-content-center`}>
                            <div className="col-12 mx-0 p-0 row my-xl-4 my-lg-4 my-md-3 my-sm-3 my-3 justify-content-around">
                                <h3 className="col-12 mb-3 p-0 text-center"><span className="doth">Who</span> are you <span className="doth">?</span></h3>
                                <div className={` input col-xl-10 col-lg-10 col-md-11 col-sm-11 col-12 mt-3 row p-0 m-0 `}>
                                    <div className="col-2 pl-3 d-flex justify-content-center align-items-center">
                                        <svg style={{width : `24px`, height : `24px`}} fill="#2c393f" className={`col-12 p-0 d-xl-flex d-lg-flex d-md-flex d-none`} viewBox="-20 -99 640 640" >
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
                                        placeholder={user.type=== "user" ? `Enter your first name` : `Enter your company name`}
                                        onChange={(e) => setAdditionalData({...additionalData, name: e.target.value})}
                                        value={additionalData.name ? additionalData.name  : ``}
                                        className={` pl-xl-2 pl-lg-2 pl-md-2 pl-sm-3 pl-3 py-2 col-xl-10 col-lg-10 col-md-10 col-12`}
                                    />
                                </div>
                                <div className={` input col-xl-10 col-lg-10 col-md-11 col-sm-11 col-12 mt-3 row p-0 mx-0 `}>
                                    <div className="col-2 pl-3 d-flex justify-content-center align-items-center">
                                        <svg style={{width : `24px`, height : `24px`}} fill="#2c393f" className={`col-12 p-0 d-xl-flex d-lg-flex d-md-flex d-none`} viewBox="-20 -99 640 640" >
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
                                        placeholder={user.type=== "user" ? `Enter your surname` : `Enter your business id`}
                                        onChange={(e) => setAdditionalData(user.type=== "user" ? {...additionalData, lastName: e.target.value} : {...additionalData, ico: e.target.value})}
                                        value={user.type=== "user" ? (additionalData.lastName ? additionalData.lastName  : ``) : (additionalData.ico ? additionalData.ico  : ``)}
                                        className={`pl-xl-2 pl-lg-2 pl-md-2 pl-sm-3 pl-3 py-2 col-xl-10 col-lg-10 col-md-10 col-12`}
                                    />
                                </div>
                            </div>
                            <div className="col-12 row m-0 p-0 justify-content-center">
                                <hr className={`col-6 m-0 my-3`}/>
                            </div>
                            <div className="col-12 mx-0 p-0 row my-xl-4 my-lg-4 my-md-3 my-sm-3 my-3 justify-content-around">
                                <h3 className="col-12 mb-3 p-0 text-center"><span className="doth">Contact</span> {user.type === `user` ? `me` : `us`} here<span className="doth">.</span></h3>
                                <div className={` input col-xl-10 col-lg-10 col-md-11 col-sm-11 col-12 my-3 row p-0 mx-0`}>
                                    <div className="col-2 pl-3 d-flex justify-content-center align-items-center">
                                        <svg fill="#2c393f" style={{width : `24px`, height : `24px`}} className={`col-12 p-0 d-xl-flex d-lg-flex d-md-flex d-none`} enableBackground="new 0 0 511.991 511.991"  viewBox="0 0 511.99 511.99" space="preserve" >
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
                                        disabled={true}
                                        placeholder={`Enter your email`}
                                        onChange={(e) => setAdditionalData({...additionalData, email : e.target.value})}
                                        value={additionalData.email ? additionalData.email  : ``}
                                        className={` pl-xl-2 pl-lg-2 pl-md-2 pl-sm-3 pl-3 py-2 col-xl-10 col-lg-10 col-md-10 col-12`}
                                    />
                                </div>
                                <div className={` input col-xl-10 col-lg-10 col-md-11 col-sm-11 col-12 mt-3 row p-0 mx-0`}>
                                    <div className="col-2 pl-3 d-flex justify-content-center align-items-center">
                                        <svg fill="#2c393f" style={{width : `24px`, height : `24px`}} className={`col-12 p-0 d-xl-flex d-lg-flex d-md-flex d-none`} enableBackground="new 0 0 512.076 512.076" version="1.1" viewBox="0 0 512.08 512.08" space="preserve" xmlns="http://www.w3.org/2000/svg">
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
                                        className={` pl-xl-2 pl-lg-2 pl-md-2 pl-sm-3 pl-3 py-2 col-xl-10 col-lg-10 col-md-10 col-12`}
                                    />
                                </div>
                            </div>
                        </div>
                        {user.type === "user" ?
                            <div className={`col-12 m-0 p-0 row justify-content-center`}>
                                <div className="col-12 mx-0 p-0 row my-4 languages justify-content-around">
                                    <h3 className="col-12 mb-3 p-0 text-center"><span className="doth">language</span> skills <span className="doth">.</span></h3>
                                    < div className="col-xl-10 col-lg-11 col-md-11 col-12 p-0 row justify-content-center">
                                        {
                                            languagesInUse.map( ({full,short}) => {
                                                return <div className={`language d-block col-auto row mx-2 my-2 px-3 align-items-center py-2 justify-content-center shadow-sm ${languages.includes(full) ? `on` : ``}`} onClick={() => handleLang(full)}>{window.innerHeight <= 768 ? short : full}</div>;
                                            })
                                        }
                                    </div>
                                    <div className={` input col-xl-10 col-lg-10 col-md-11 col-sm-11 col-12 mt-4 row p-0 m-0 `}>
                                        <div className="col-2 pl-3 d-flex justify-content-center align-items-center">
                                            <svg viewBox="0 0 512 512" style={{width : `px`, height : `24px`}} fill="#2c393f" className={`col-12 p-0 d-xl-flex d-lg-flex d-md-flex d-none`}>
                                                <path d="m470 180h-140.644531c.445312-4.933594.6875-9.929688.6875-14.980469 0-90.992187-74.03125-165.019531-165.023438-165.019531-28.984375 0-57.496093 7.625-82.453125 22.046875-4.78125 2.761719-6.417968 8.878906-3.65625 13.660156 2.765625 4.785157 8.882813 6.417969 13.664063 3.65625 21.917969-12.667969 46.96875-19.363281 72.445312-19.363281 79.964844 0 145.023438 65.054688 145.023438 145.019531 0 79.964844-65.058594 145.023438-145.023438 145.023438-33.472656 0-64.917969-11.089844-90.9375-32.066407-2.609375-2.101562-6.066406-2.730468-9.214843-1.765624l-26.542969 6.941406 10.398437-22.851563c1.496094-3.28125 1.105469-7.109375-1.015625-10.027343-18.125-24.894532-27.707031-54.375-27.707031-85.253907 0-25.542969 6.730469-50.65625 19.464844-72.621093 2.769531-4.78125 1.140625-10.898438-3.636719-13.667969s-10.894531-1.144531-13.667969 3.636719c-14.496094 25.007812-22.160156 53.589843-22.160156 82.652343 0 33.160157 9.714844 64.914063 28.152344 92.199219l-16.742188 36.785156c-1.601562 3.511719-1.035156 7.628906 1.449219 10.582032 2.484375 2.953124 6.445313 4.210937 10.179687 3.234374l42.527344-11.117187c28.507813 21.535156 63.621094 33.339844 99.453125 33.339844 7.800781 0 15.46875-.558594 22.980469-1.609375v87.566406c0 23.15625 18.839844 42 41.996094 42h141.433594l63.238281 51.738281c1.820312 1.492188 4.066406 2.257813 6.332031 2.257813 1.457031 0 2.917969-.316406 4.28125-.960938 3.492188-1.65625 5.71875-5.171875 5.71875-9.039062v-43.996094h19c23.160156 0 42-18.84375 42-42v-194c0-23.160156-18.839844-42-42-42zm22 236c0 12.128906-9.867188 22-22 22h-29c-5.523438 0-10 4.476562-10 10v32.894531l-49.390625-40.410156c-2.722656-2.484375-5.105469-2.484375-10.460937-2.484375h-141.152344c-12.128906 0-21.996094-9.871094-21.996094-22v-91.648438c59.152344-15.972656 105.238281-64.074218 118.296875-124.351562h143.703125c12.132812 0 22 9.867188 22 22zm0 0"/><path d="m399.761719 348.605469c3.390625-1.597657 5.742187-5.039063 5.742187-9.039063 0-5.519531-4.476562-10-10-10h-4.09375l-32.25-73.5c-1.597656-3.636718-5.191406-5.984375-9.160156-5.984375s-7.5625 2.347657-9.15625 5.984375l-32.25 73.5h-4.09375c-5.523438 0-10 4.480469-10 10 0 4 2.351562 7.441406 5.742188 9.039063l-12.011719 27.375c-2.21875 5.058593.082031 10.957031 5.136719 13.175781 5.058593 2.21875 10.957031-.082031 13.175781-5.140625l15.117187-34.449219h56.683594l15.117188 34.449219c1.644531 3.75 5.3125 5.984375 9.164062 5.984375 1.339844 0 2.703125-.269531 4.011719-.84375 5.054687-2.21875 7.359375-8.117188 5.136719-13.175781zm-69.328125-19.039063 19.566406-44.59375 19.566406 44.59375zm0 0"/><path d="m55.402344 65.398438c2.628906 0 5.207031-1.070313 7.070312-2.929688 1.859375-1.859375 2.929688-4.4375 2.929688-7.070312 0-2.628907-1.070313-5.207032-2.929688-7.070313-1.863281-1.859375-4.441406-2.929687-7.070312-2.929687-2.640625 0-5.210938 1.070312-7.070313 2.929687-1.859375 1.863281-2.929687 4.441406-2.929687 7.070313 0 2.632812 1.070312 5.210937 2.929687 7.070312 1.859375 1.863281 4.4375 2.929688 7.070313 2.929688zm0 0"/><path d="m105.328125 225.878906c-4.84375 2.65625-6.617187 8.734375-3.960937 13.578125 1.820312 3.316407 5.246093 5.195313 8.777343 5.195313 1.625 0 3.273438-.398438 4.800781-1.234375 22.300782-12.230469 39.457032-31.253907 49.492188-53.6875 10.039062 22.433593 27.191406 41.457031 49.492188 53.6875 1.527343.835937 3.175781 1.234375 4.800781 1.234375 3.53125 0 6.957031-1.878906 8.777343-5.195313 2.65625-4.84375.882813-10.921875-3.960937-13.578125-26.105469-14.316406-43.675781-39.902344-48.039063-68.8125h44.398438c5.523438 0 10-4.476562 10-10 0-5.523437-4.476562-10-10-10h-45.46875v-41.671875c0-5.523437-4.476562-10-10-10s-10 4.476563-10 10v41.671875h-36.125c-5.523438 0-10 4.476563-10 10 0 5.523438 4.476562 10 10 10h35.054688c-4.363282 28.910156-21.933594 54.5-48.039063 68.8125zm0 0"/></svg>
                                        </div>
                                        <input
                                            id={`name`}
                                            type={`text`}
                                            name={`another`}
                                            placeholder={`another language?`}
                                            onChange={(e) => setAdditionalLanguage(e.target.value)}
                                            className={`  pl-xl-2 pl-lg-2 pl-md-2 pl-sm-3 pl-3 py-2 col-xl-10 col-lg-10 col-md-10 col-12`}
                                        />
                                    </div>
                                </div>

                            </div> : ``
                        }
                        <div className={`col-12 m-0 p-0 row justify-content-center align-items-center d-flex`}>
                            <div className="col-12 mx-0 p-0 row my-4 languages justify-content-around">
                                <h3 className="col-12 mb-3 p-0 text-center"><span className="doth">fulltime</span> job <span className="doth">?</span></h3>
                                <h6 className="col-12 mb-3 p-0 text-center">z akého odvetvia chcete dostávať pracovné ponuky ?</h6>
                                <div className="categories row col-12 mb-3 p-0 m-0 justify-content-center align-items-center">
                                    <div className={`category col-auto mx-2 my-2 py-2 shadow-sm ${categories.fullTimeCategories.includes('a') ? `on` : ``}`} onClick={() => handleFullWork('a')}>
                                        a
                                    </div>
                                    {
                                        dataAdditional.branches.map( ({full,short}) => {
                                            return <div className={`language d-block col-auto row mx-2 my-2 px-3 align-items-center py-2 justify-content-center shadow-sm ${languages.includes(full) ? `on` : ``}`} onClick={() => handleLang(full)}>{window.innerHeight <= 768 ? short : full}</div>;
                                        })
                                    }

                                </div>
                            </div>
                        </div>
                        <div className={`col-12 m-0 p-0 row justify-content-center align-items-center d-flex`}>
                            <div className="col-12 mx-0 p-0 row my-4 languages justify-content-around">
                                <h3 className="col-12 mb-3 p-0 text-center"><span className="doth">freetime</span> job <span className="doth">?</span></h3>
                                <h6 className="col-12 mb-3 p-0 text-center">čo by ste chceli robiť ?</h6>
                                <div className="categories row col-12 mb-3 p-0 m-0 justify-content-center align-items-center">
                                    <div className={`category col-auto mx-2 my-2 py-2 shadow-sm ${categories.freeTimeCategories.includes('lawn') ? `on` : ``}`} onClick={() => handleFreeWork('lawn')}>
                                        lawn moving
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`col-12 m-0 p-0 row justify-content-center align-items-center d-flex`}>
                           <div className="container d-flex justify-content-center">
                                <div className="avatar-upload">
                                    <div className="avatar-edit">
                                        <input onChange={e => readURL(e.target.files)} type='file' id="imageUpload" accept=".png, .jpg, .jpeg"/>
                                        <label htmlFor="imageUpload" className={`d-flex justify-content-center align-items-center`}>
                                            <svg style={window.innerWidth > 991 ? {width : `20px`, height : `20px`} : {width : `16px`, height : `16px`}} fill="#2c393f" enableBackground="new 0 0 469.331 469.331" version="1.1" viewBox="0 0 469.33 469.33" space="preserve" xmlns="http://www.w3.org/2000/svg">
                                            <path d="m438.93 30.403c-40.4-40.5-106.1-40.5-146.5 0l-268.6 268.5c-2.1 2.1-3.4 4.8-3.8 7.7l-19.9 147.4c-0.6 4.2 0.9 8.4 3.8 11.3 2.5 2.5 6 4 9.5 4 0.6 0 1.2 0 1.8-0.1l88.8-12c7.4-1 12.6-7.8 11.6-15.2s-7.8-12.6-15.2-11.6l-71.2 9.6 13.9-102.8 108.2 108.2c2.5 2.5 6 4 9.5 4s7-1.4 9.5-4l268.6-268.5c19.6-19.6 30.4-45.6 30.4-73.3s-10.8-53.7-30.4-73.2zm-141.3 33 45.1 45.1-245.1 245.1-45.1-45.1 245.1-245.1zm-136.7 353.4-44.1-44.1 245.1-245.1 44.1 44.1-245.1 245.1zm263.9-264.4-107.9-107.9c13.7-11.3 30.8-17.5 48.8-17.5 20.5 0 39.7 8 54.2 22.4s22.4 33.7 22.4 54.2c0 18.1-6.2 35.1-17.5 48.8z"/></svg></label>
                                    </div>
                                    <div className="avatar-preview">
                                        <div id="imagePreview"
                                        >
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={` input col-xl-10 col-lg-10 col-md-11 col-sm-11 col-12 mt-3 row p-0 m-0 justify-content-center `}>
                                <div className="col-2 pl-3 d-flex justify-content-center align-items-center">
                                    <svg style={{width : `24px`, height : `24px`}} fill="#2c393f" className={`col-12 p-0 d-xl-flex d-lg-flex d-md-flex d-none`} viewBox="-20 -99 640 640" >
                                        <path d="m179.25 211c35.691406 0 64.625-28.9375 64.625-64.625 0-35.691406-28.933594-64.625-64.625-64.625s-64.625 28.933594-64.625 64.625c.046875 35.671875 28.953125 64.578125 64.625 64.625zm0-104.125c21.882812 0 39.625 17.738281 39.625 39.625 0 21.882812-17.742188 39.625-39.625 39.625-21.886719 0-39.625-17.742188-39.625-39.625.007812-21.882812 17.742188-39.617188 39.625-39.625zm0 0"/>
                                        <path d="m179.25 234.875c-26.441406-.195312-51.820312 10.417969-70.25 29.375-18.75 19.125-29 45.125-29 73.375.019531 6.894531 5.605469 12.480469 12.5 12.5h173.5c6.894531-.019531 12.480469-5.605469 12.5-12.5 0-28.25-10.25-54.25-29-73.375-18.429688-18.957031-43.804688-29.570312-70.25-29.375zm-73.375 90.25c2.140625-16.34375 9.507812-31.554688 21-43.375 13.832031-13.996094 32.695312-21.875 52.375-21.875s38.542969 7.878906 52.375 21.875c11.46875 11.832031 18.835938 27.039062 21 43.375zm0 0"/>
                                        <path d="m537.5-5.25h-475c-34.511719.015625-62.484375 27.988281-62.5 62.5v317.5c.015625 34.511719 27.988281 62.484375 62.5 62.5h475c34.511719-.015625 62.484375-27.988281 62.5-62.5v-317.5c-.015625-34.511719-27.988281-62.484375-62.5-62.5zm37.5 380c-.058594 20.683594-16.816406 37.441406-37.5 37.5h-475c-20.683594-.058594-37.441406-16.816406-37.5-37.5v-317.5c.058594-20.683594 16.816406-37.441406 37.5-37.5h475c20.683594.058594 37.441406 16.816406 37.5 37.5zm0 0"/>
                                        <path fill={`#00C7C7`} d="m506.75 203.5h-145.625c-6.902344 0-12.5 5.59375-12.5 12.5s5.597656 12.5 12.5 12.5h145.625c6.902344 0 12.5-5.59375 12.5-12.5s-5.597656-12.5-12.5-12.5zm0 0"/>
                                        <path d="m506.75 283.5h-145.625c-6.902344 0-12.5 5.59375-12.5 12.5s5.597656 12.5 12.5 12.5h145.625c6.902344 0 12.5-5.59375 12.5-12.5s-5.597656-12.5-12.5-12.5zm0 0"/>
                                        <path d="m506.75 123.5h-145.625c-6.902344 0-12.5 5.59375-12.5 12.5s5.597656 12.5 12.5 12.5h145.625c6.902344 0 12.5-5.59375 12.5-12.5s-5.597656-12.5-12.5-12.5zm0 0"/>
                                    </svg>
                                </div>
                                <input
                                    id={`name`}
                                    type={`text`}
                                    name={`name`}
                                    placeholder={`Enter your username`}
                                    onChange={(e) => setAdditionalData({...additionalData, username: "@"+e.target.value})}
                                    value={additionalData.username ? additionalData.username  : ``}
                                    className={` pl-xl-2 pl-lg-2 pl-md-2 pl-sm-3 pl-3 py-2 col-xl-10 col-lg-10 col-md-10 col-12 text-lowercase`}
                                />
                            </div>
                            <div className="col-xl-10 col-lg-10 col-12 row driving-licence align-items-center my-4" onClick={() => setAdditionalData({...additionalData, drivingLicense: !additionalData.drivingLicense})}>
                                <div className="col-1 d-flex justify-content-center p-0"><div className="square" style={additionalData.drivingLicense ? {background : `#00C7C7`} :  {background : `white`}}></div></div>
                                <div className="col-10 pl-3 py-0 pr-0">I have a driving license for group B</div>
                            </div>
                            <button
                                className={`submit-button sign-in-button col-xl-5 col-lg-6 col-md-9 col-11 text-center py-2 mb-5 mt-3 `}
                                onClick={formValidator}><span>update profile</span></button>
                        </div>
                    </Slider>
                </div>
            </div>
        </div>
    );
};

const NextArrow = props => {
    const { className, style, onClick } = props;
    return <svg className={className}  style={{ ...style, display: "block"}} onClick={onClick} enableBackground="new 0 0 477.175 477.175" viewBox="0 0 477.18 477.18" space="preserve">
        <path d="m360.73 229.08-225.1-225.1c-5.3-5.3-13.8-5.3-19.1 0s-5.3 13.8 0 19.1l215.5 215.5-215.5 215.5c-5.3 5.3-5.3 13.8 0 19.1 2.6 2.6 6.1 4 9.5 4s6.9-1.3 9.5-4l225.1-225.1c5.3-5.2 5.3-13.8 0.1-19z"/>
    </svg>
};

const PreviousArrow = props => {
    const { className, style, onClick } = props;
    return <svg className={className}  style={{ ...style, display: "block"}} onClick={onClick} enableBackground="new 0 0 477.175 477.175" viewBox="0 0 477.18 477.18" space="preserve" >
            <path d="m145.19 238.58 215.5-215.5c5.3-5.3 5.3-13.8 0-19.1s-13.8-5.3-19.1 0l-225.1 225.1c-5.3 5.3-5.3 13.8 0 19.1l225.1 225c2.6 2.6 6.1 4 9.5 4s6.9-1.3 9.5-4c5.3-5.3 5.3-13.8 0-19.1l-215.4-215.5z"/>
           </svg>
};
