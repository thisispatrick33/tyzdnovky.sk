import React, {useEffect, useState} from 'react';
import {Additional} from "../Additional";
import {Router, navigate} from '@reach/router';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import $ from "jquery";
import axios from "axios";
import {Advertisement} from "../Forms/Advertisement";


export const Home =({edit = f => f, region, createAd = f => f, updateAd = f =>f, signOut}) => {
    var today = new Date();


    const [data, setData] = useState([]);
    const [ad, setAd] = useState("");
    const [create, setCreate] = useState({id: null, active: false});

    const handleChange = (data) =>{
        edit(data);
    };
    const handleCreate = (data) =>{
        createAd(data);
    };
    const handleUpdate = (data) =>{
        updateAd(data);
    };

    const settings = {
        dots: false,
        arrows : true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        adaptiveHeight : true,
        nextArrow: <NextArrow />,
        prevArrow: <PreviousArrow />,
        responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 3,
              }
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 2,
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
              }
            }
          ]
    };

    

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'api/advertisement',{
                    headers:{
                        "X-localization" : region,
                        "Authorization" : 'Bearer '+JSON.parse(localStorage.appState).user.auth_token
                    }
                }
            );
            console.log("get");
            console.log(result);
            setData(result.data);

        };
        fetchData();
    }, [region]);

    const viewAd = async(id) =>{
        console.log("sem som");
        const result = await axios(
            'api/advertisement/'+id,{
                headers:{
                    "X-localization" : region,
                    "Authorization" : 'Bearer '+JSON.parse(localStorage.appState).user.auth_token
                }
            }
            );
        console.log("get");
        console.log(result);
        setAd(result.data);
    };



    const showAdvertisementInfo = () => {
        return(
            <div className="advertisement-info-wrapper" id="advertisement-info">
                <div className="container-fluid row justify-content-center m-0 p-0">
                    <div className="advertisement-info-box col-11 m-0 p-0 mt-5 shadow row">
                        <div className="col-3  p-0 d-none d-lg-block">
                            <img className="advertisement-info-image" src="./images/poster.jpg"/>
                        </div>
                        <div className="col-12 col-lg-9 row justify-content-center pb-0">
                            <div className={"col-12 row justify-content-center py-5"}>
                                <div className={"col-12 col-sm-8 order-2 order-sm-1"}>
                                    <h1 className="advertisement-info-title text-center">{ad.title}</h1>
                                </div>
                                <div className={"col-12 col-sm-4 order-1 order-sm-2 "}>
                                    <div className={"cross float-right float-sm-none"}>
                                        <svg onClick={()=> setAd("")} className="ml-3" style={{transform:"scale(.8)"}} width="42" height="42" viewBox="0 0 42 42"><path d="M42,2.467,23.467,21,42,39.534,39.533,42,21,23.468,2.467,42,0,39.534,18.533,21,0,2.467,2.467,0,21,18.534,39.533,0Z" transform="translate(0 -0.001)" fill="#2c393f"/></svg>
                                    </div>
                                </div>

                                <div className="row justify-content-center order-3 order-md-4">
                                    <div className="col-md-8 order-4 order-m-3">
                                        <div className={"border-r pt-4 justify-content-center row "}>
                                            <div className="advertisement-info-tags row justify-content-center pb-5 col-11">
                                                {
                                                    ad.tags.map( (value) => {
                                                        return <div className="advertisement-info-tag py-2 mx-3 mt-1 mb-2 px-4 shadow col-auto colorful-text" >{value}</div>;
                                                    })
                                                }


                                            </div>
                                            <p className="advertisement-info-description mb-5 text-center">
                                                {ad.description}
                                            </p>
                                            <button className="my-2 mb-3 submit-button sign-in-button px-5 py-2 d-block">
                                                <span> mám  <span className={"strong"}>zaujem !</span></span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col-md-4 text-uppercase order-3 order-md-4">

                                        <div className="advertisement-info-branches border-b text-center py-3 px-2">
                                            {
                                                ad.branches.map( ({name}) => {
                                                    return <div className={"my-4"}>{name}</div>;
                                                })
                                            }

                                        </div>
                                        <div className="advertisement-info-additional row pt-4 border-b-res m-0">
                                            <div className="row col-12 my-3">
                                                <div className={"col-6 text-right pr-3"}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20.311" height="29" viewBox="0 0 20.311 29"><g transform="translate(-8.203)"><path d="M24.264,12a3.707,3.707,0,1,0,3.707,3.707A3.712,3.712,0,0,0,24.264,12Zm0,6.355a2.648,2.648,0,1,1,2.648-2.648A2.651,2.651,0,0,1,24.264,18.355Z" transform="translate(-5.811 -5.645)" fill="#00c7c7"/><path d="M25.541,2.975a10.156,10.156,0,0,0-14.363,0C7.628,6.524,7.186,13.2,10.222,17.249L18.359,29l8.125-11.735C29.532,13.2,29.091,6.524,25.541,2.975Zm.084,13.671L18.359,27.139,11.082,16.63a10.452,10.452,0,0,1,.845-12.906,9.1,9.1,0,0,1,12.865,0A10.456,10.456,0,0,1,25.625,16.646Z" transform="translate(0 0)" fill="#00c7c7"/></g></svg>
                                                </div>
                                                <div className={"col-6 text-left pl-0"}>
                                                    {ad.address}
                                                </div>
                                            </div>
                                            <div className="row col-12 my-3">
                                                <div className={"col-6 text-right pr-2"}>
                                                    <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="25.033" height="26.288" viewBox="0 0 25.033 26.288"><path d="M18.515,2.345A2.2,2.2,0,0,0,16.4.5a.447.447,0,0,0-.432.461.447.447,0,0,0,.432.461A1.343,1.343,0,0,1,17.7,2.806,1.343,1.343,0,0,1,16.4,4.19a.462.462,0,0,0,0,.922,2.2,2.2,0,0,0,2.114-1.845H24.17V7.418H.863V3.267H8.2a.447.447,0,0,0,.432-.461A.447.447,0,0,0,8.2,2.345H7.417a1.3,1.3,0,0,1,1.215-.922A1.343,1.343,0,0,1,9.927,2.806,1.343,1.343,0,0,1,8.632,4.19a.462.462,0,0,0,0,.922A2.238,2.238,0,0,0,10.79,2.806,2.238,2.238,0,0,0,8.632.5,2.2,2.2,0,0,0,6.518,2.345H0V26.788H25.033V2.345ZM24.17,25.865H.863V8.34H24.17Z" transform="translate(0 -0.5)" fill="#00c7c7"/><path d="M25.469,1.439a1.408,1.408,0,1,1,0,2.817.469.469,0,1,0,0,.939,2.347,2.347,0,1,0,0-4.695.469.469,0,1,0,0,.939Z" transform="translate(-14.319 -0.5)" fill="#00c7c7"/><path d="M31.469,1.439a1.408,1.408,0,1,1,0,2.817.469.469,0,1,0,0,.939,2.347,2.347,0,1,0,0-4.695.469.469,0,1,0,0,.939Z" transform="translate(-17.756 -0.5)" fill="#00c7c7"/><ellipse cx="0.469" cy="0.469" rx="0.469" ry="0.469" transform="translate(9.035 10.6)" fill="#00c7c7"/><ellipse cx="0.469" cy="0.469" rx="0.469" ry="0.469" transform="translate(12.047 10.6)" fill="#00c7c7"/><ellipse cx="0.469" cy="0.469" rx="0.469" ry="0.469" transform="translate(15.059 10.6)" fill="#00c7c7"/><ellipse cx="0.469" cy="0.469" rx="0.469" ry="0.469" transform="translate(18.07 10.6)" fill="#00c7c7"/><ellipse cx="0.469" cy="0.469" rx="0.469" ry="0.469" transform="translate(20.807 10.6)" fill="#00c7c7"/><ellipse cx="0.469" cy="0.469" rx="0.469" ry="0.469" transform="translate(3.286 14.288)" fill="#00c7c7"/><ellipse cx="0.469" cy="0.469" rx="0.469" ry="0.469" transform="translate(6.023 14.288)" fill="#00c7c7"/><ellipse cx="0.469" cy="0.469" rx="0.469" ry="0.469" transform="translate(9.035 14.288)" fill="#00c7c7"/><ellipse cx="0.469" cy="0.469" rx="0.469" ry="0.469" transform="translate(12.047 14.288)" fill="#00c7c7"/><ellipse cx="0.469" cy="0.469" rx="0.469" ry="0.469" transform="translate(15.059 14.288)" fill="#00c7c7"/><ellipse cx="0.469" cy="0.469" rx="0.469" ry="0.469" transform="translate(18.07 14.288)" fill="#00c7c7"/><ellipse cx="0.469" cy="0.469" rx="0.469" ry="0.469" transform="translate(20.807 14.288)" fill="#00c7c7"/><ellipse cx="0.469" cy="0.469" rx="0.469" ry="0.469" transform="translate(3.286 17.514)" fill="#00c7c7"/><ellipse cx="0.469" cy="0.469" rx="0.469" ry="0.469" transform="translate(6.023 17.514)" fill="#00c7c7"/><ellipse cx="0.469" cy="0.469" rx="0.469" ry="0.469" transform="translate(9.035 17.514)" fill="#00c7c7"/><ellipse cx="0.469" cy="0.469" rx="0.469" ry="0.469" transform="translate(12.047 17.514)" fill="#00c7c7"/><ellipse cx="0.469" cy="0.469" rx="0.469" ry="0.469" transform="translate(15.059 17.514)" fill="#00c7c7"/><ellipse cx="0.469" cy="0.469" rx="0.469" ry="0.469" transform="translate(18.07 17.514)" fill="#00c7c7"/><ellipse cx="0.469" cy="0.469" rx="0.469" ry="0.469" transform="translate(20.807 17.514)" fill="#00c7c7"/><ellipse cx="0.469" cy="0.469" rx="0.469" ry="0.469" transform="translate(3.286 21.124)" fill="#00c7c7"/><ellipse cx="0.469" cy="0.469" rx="0.469" ry="0.469" transform="translate(6.023 21.124)" fill="#00c7c7"/><ellipse cx="0.469" cy="0.469" rx="0.469" ry="0.469" transform="translate(9.035 21.124)" fill="#00c7c7"/><ellipse cx="0.469" cy="0.469" rx="0.469" ry="0.469" transform="translate(12.047 21.124)" fill="#00c7c7"/><ellipse cx="0.469" cy="0.469" rx="0.469" ry="0.469" transform="translate(15.059 21.124)" fill="#00c7c7"/></svg>
                                                </div>
                                                <div className={"col-6 text-left pl-0"}>
                                                    {ad.date}
                                                </div>
                                            </div>
                                            <div className="row col-12 my-3">
                                                <div className={"col-6 text-right pr-2"}>
                                                    <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="25.771" height="27.605" viewBox="0 0 25.771 27.605"><g transform="translate(-17.007)"><g transform="translate(17.007)"><path d="M42.134,19.25,36.408,8.167a4.615,4.615,0,0,1-.226-.589.458.458,0,0,0,.054-.216v-2.3a.46.46,0,0,0-.23-.4,4.517,4.517,0,0,1,.2-.6A2.715,2.715,0,0,1,36.875,3a1.67,1.67,0,0,0,.752-1.88A1.875,1.875,0,0,0,35.833,0a2.192,2.192,0,0,0-1.45.547,2.2,2.2,0,0,0-2.914.012A2.611,2.611,0,0,0,29.882,0a2.852,2.852,0,0,0-1.656.562A2.2,2.2,0,0,0,25.308.547,2.239,2.239,0,0,0,23.823,0h0a1.8,1.8,0,0,0-1.687,1.168,1.646,1.646,0,0,0,.69,1.838,2.757,2.757,0,0,1,.657,1.059,4.529,4.529,0,0,1,.2.591.46.46,0,0,0-.242.405v2.3a.457.457,0,0,0,.063.232,4.5,4.5,0,0,1-.216.563L17.669,19.032a5.876,5.876,0,0,0,5.22,8.573H37.046a5.727,5.727,0,0,0,5.088-8.355ZM24.361,6.9V5.521H35.316V6.9Zm-.975-4.625c-.333-.256-.467-.547-.377-.819A.89.89,0,0,1,23.857.92a1.279,1.279,0,0,1,1.067.575.478.478,0,0,0,.767,0,1.277,1.277,0,0,1,2.133,0,.478.478,0,0,0,.767,0A1.725,1.725,0,0,1,29.882.92a1.578,1.578,0,0,1,1.216.575.478.478,0,0,0,.767,0,1.277,1.277,0,0,1,2.133,0,.478.478,0,0,0,.767,0A1.287,1.287,0,0,1,35.853.92h0a.967.967,0,0,1,.9.5c.115.332-.241.685-.463.865a3.5,3.5,0,0,0-.938,1.43,5.349,5.349,0,0,0-.282.887H24.615a5.3,5.3,0,0,0-.282-.887A3.474,3.474,0,0,0,23.385,2.276Zm17.765,22.1a4.772,4.772,0,0,1-4.105,2.307H22.889a4.955,4.955,0,0,1-4.4-7.23L24.11,8.569a5.577,5.577,0,0,0,.287-.747h4.149A5.23,5.23,0,0,0,26.661,11.5a.46.46,0,1,0,.92,0,4.743,4.743,0,0,1,1.994-3.349c.321,1.285,1.24,3.81,3.51,3.81h.021a.46.46,0,0,0,0-.92h-.017c-1.678,0-2.4-2.189-2.642-3.221h4.85a5.693,5.693,0,0,0,.291.757l5.731,11.094A4.771,4.771,0,0,1,41.151,24.378Z" transform="translate(-17.007 0)" fill="#00c7c7"/><path d="M199.744,259.221a.46.46,0,0,0,.92,0,2.3,2.3,0,0,0-1.84-2.254v-.506a.46.46,0,0,0-.92,0v.506a2.3,2.3,0,0,0,0,4.508V264.2a1.383,1.383,0,0,1-.92-1.3.46.46,0,0,0-.92,0,2.3,2.3,0,0,0,1.84,2.254v.506a.46.46,0,1,0,.92,0v-.506a2.3,2.3,0,0,0,0-4.508v-2.728A1.383,1.383,0,0,1,199.744,259.221Zm-2.761,0a1.383,1.383,0,0,1,.92-1.3v2.6A1.383,1.383,0,0,1,196.983,259.221Zm2.761,3.681a1.383,1.383,0,0,1-.92,1.3v-2.6A1.383,1.383,0,0,1,199.744,262.9Z" transform="translate(-186.409 -242.197)" fill="#00c7c7"/></g></g></svg>
                                                </div>
                                                <div className={"col-6 text-left pl-0"}>
                                                    {ad.salary}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    };

    if(JSON.parse(localStorage.appState).isLoggedIn == true){
        if(data[0] == undefined){
            return (<div>loading</div>)
        }
        return (

            <div className={` home | container-fluid | row col-12 | justify-content-center align-items-center | m-0 p-0 pt-5`}>
                {JSON.parse(localStorage.appState).user.active==0 ? <Additional user={JSON.parse(localStorage.appState).user} func={handleChange} region={region}/> : ``}
                <div className="content col-11 row justify-content-center py-5">
                    <div className="header col-11 row justify-content-between">
                        <div className="menu col-1 row">
                            <svg className={`col-10 p-0`} viewBox="0 0 86.628 43.314" xmlns="http://www.w3.org/2000/svg">
                                <g transform="translate(0 -96.243)">
                                    <g transform="translate(0 96.243)" fill="#2c393f">
                                        <path transform="translate(0 -96.243)" d="M2.707,101.657H83.921a2.707,2.707,0,0,0,0-5.414H2.707a2.707,2.707,0,0,0,0,5.414Z" data-name="Path 41"/>
                                        <path transform="translate(0 -161.5)" d="M83.921,180.455H2.707a2.707,2.707,0,1,0,0,5.414H83.921a2.707,2.707,0,1,0,0-5.414Z" data-name="Path 42"/>
                                        <path transform="translate(-93.232 -226.77)" d="m177.15 264.67h-54.143a2.707 2.707 0 1 0 0 5.414h54.143a2.707 2.707 0 1 0 0-5.414z" data-name="Path 43"/>
                                    </g>
                                </g>
                            </svg>

                        </div>
                        <div className="finder col-9 d-flex justify-content-center">
                            <input type="text" className="col-11 finder" placeholder="…find work, company or group"/>
                        </div>
                        <div className="user-header-nofication col-1">
                            <img src={JSON.parse(localStorage.appState).user.profile_pic !==null ? JSON.parse(localStorage.appState).user.profile_pic.substring(JSON.parse(localStorage.appState).user.profile_pic.indexOf("images")) : "./images/user.svg"} className={`profile-photo`} alt=""/>
                            <div className="action-point text-center">7</div>
                        </div>
                    </div>
                    <div className="message col-11 mt-5">
                        {
                            JSON.parse(localStorage.appState).user.name == null ? <p>Hello !</p> : <p>Hello <span>{JSON.parse(localStorage.appState).user.name}</span> !</p>
                        }
                        <a onClick={()=>setCreate({id: null, active: false})}>Schovaj</a>
                    </div>
                    
                    <Slider {...settings} className={`work-options justify-content-between col-12 my-5 px-5 row`}>
                                {
                                    data.map( ({id, title, description, address, date, created_at}) => {
                                        return(
                                            <div className="work-option row justify-content-center col-12 p-0 mx-3 mb-5">
                                                <div className="content shadow p-0 col-10">
                                                    <div className="work-option-image-wrapper">
                                                        <img className="work-option-image" src="./images/poster.jpg"/>
                                                        <svg className="work-option-save" width="13.135" height="15.526" viewBox="0 0 13.135 15.526"><g transform="translate(-33.261)"><path d="M46.2.513a1.157,1.157,0,0,0-.539-.421A1.136,1.136,0,0,0,45.206,0H34.451A1.136,1.136,0,0,0,34,.092a1.156,1.156,0,0,0-.539.421,1.089,1.089,0,0,0-.2.636V14.377a1.09,1.09,0,0,0,.2.636,1.156,1.156,0,0,0,.539.421,1.135,1.135,0,0,0,.451.092,1.224,1.224,0,0,0,.852-.339l4.526-4.351,4.526,4.351a1.221,1.221,0,0,0,.852.328,1.194,1.194,0,0,0,.99-.5,1.088,1.088,0,0,0,.2-.636V1.149A1.089,1.089,0,0,0,46.2.513ZM45.083,14.059,40.742,9.892l-.913-.872-.913.872-4.341,4.166V1.314H45.083V14.059Z" fill="#fff"/></g></svg>
                                                        <svg className="work-option-edit" onClick={()=> setCreate({id: id, active: true})} width="16" height="16" viewBox="0 0 16 16"><g transform="translate(-0.063 0.001)"><path d="M.572,16a.509.509,0,0,1-.493-.632l.955-3.834a.51.51,0,0,1,.134-.237L11.92.545a1.868,1.868,0,0,1,2.638,0l.959.959a1.868,1.868,0,0,1,0,2.638L4.765,14.895a.505.505,0,0,1-.237.134l-3.834.955A.47.47,0,0,1,.572,16Zm1.415-4.083L1.27,14.791l2.875-.716L14.8,3.422a.85.85,0,0,0,0-1.2l-.959-.959a.849.849,0,0,0-1.2,0Zm2.419,2.619h0Zm0,0" transform="translate(0)" fill="#fff"/><path d="M319.56,68.392a.505.505,0,0,1-.36-.149l-2.879-2.878a.509.509,0,0,1,.72-.72l2.879,2.879a.508.508,0,0,1-.36.868Zm0,0" transform="translate(-306.057 -62.446)" fill="#fff"/><path d="M33.481,354.451a.5.5,0,0,1-.36-.149l-2.879-2.879a.509.509,0,0,1,.72-.72l2.879,2.879a.509.509,0,0,1-.36.869Zm0,0" transform="translate(-29.076 -339.408)" fill="#fff"/></g></svg>
                                                    </div>
                                                    <div className="work-option-content">

                                                            {
                                                                ((today.getTime()-(new Date(created_at.substring(0, created_at.indexOf('T'))).getTime()))/ (1000 * 3600 * 24)) <=3 ? <div className="text-center work-option-new"> NEW!</div>:""
                                                            }

                                                        <h5 className="work-option-title text-center mt-4 mb-2">
                                                            {title}
                                                        </h5>
                                                        <p className="work-option-description">
                                                            {description.substring(0, 74)}
                                                            <a className="colorful-text" onClick={()=>viewAd(id)}>... Zisti viac.</a>
                                                        </p>
                                                        <div className="row text-center h6 work-option-info pt-4 pb-5">
                                                            <div className="col-6 p-0">
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="13.512" height="19.292" viewBox="0 0 13.512 19.292"><path d="M23.023,12a2.466,2.466,0,1,0,2.466,2.466A2.469,2.469,0,0,0,23.023,12Zm0,4.228a1.762,1.762,0,1,1,1.762-1.762A1.764,1.764,0,0,1,23.023,16.228Z" transform="translate(-16.204 -7.772)" fill="#00c7c7"/><path d="M19.737,1.979a6.756,6.756,0,0,0-9.555,0,7.7,7.7,0,0,0-.636,9.5l5.413,7.817,5.405-7.806A7.7,7.7,0,0,0,19.737,1.979Zm.056,9.095-4.834,6.98-4.841-6.991a6.953,6.953,0,0,1,.562-8.586,6.052,6.052,0,0,1,8.558,0A6.956,6.956,0,0,1,19.793,11.074Z" transform="translate(-8.203 0)" fill="#00c7c7"/></svg>
                                                        {address}
                                                    </span>
                                                            </div>
                                                            <div className="col-6 p-0">
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="15.888" height="17.023" viewBox="0 0 15.888 17.023"><path d="M17.6,1.135H15.618V.284A.283.283,0,0,0,15.335,0H13.349a.283.283,0,0,0-.284.284v.851H6.823V.284A.283.283,0,0,0,6.539,0H4.553A.283.283,0,0,0,4.27.284v.851H2.284A.283.283,0,0,0,2,1.419V16.739a.283.283,0,0,0,.284.284H17.6a.283.283,0,0,0,.284-.284V1.419A.283.283,0,0,0,17.6,1.135ZM13.632.567h1.419v1.7H13.632V.567Zm-8.8,0H6.256v1.7H4.837V.567ZM2.567,1.7h1.7v.851a.283.283,0,0,0,.284.284H6.539a.283.283,0,0,0,.284-.284V1.7h6.242v.851a.283.283,0,0,0,.284.284h1.986a.283.283,0,0,0,.284-.284V1.7h1.7V4.256H2.567Zm0,14.753V4.823H17.321V16.455Z" transform="translate(-2)" fill="#00c7c7"/><path d="M18.66,23H11v8.228H21.781V23H18.66Zm-1.986.567H18.66v1.986H16.674Zm1.986,4.539H16.674V26.121H18.66Zm-4.539-1.986h1.986v1.986H14.121Zm0-2.553h1.986v1.986H14.121Zm-2.553,0h1.986v1.986H11.567Zm0,2.553h1.986v1.986H11.567Zm1.986,4.539H11.567V28.674h1.986Zm2.553,0H14.121V28.674h1.986Zm2.553,0H16.674V28.674H18.66Zm2.553,0H19.228V28.674h1.986Zm0-2.553H19.228V26.121h1.986Zm0-4.539v1.986H19.228V23.567Z" transform="translate(-8.447 -16.475)" fill="#00c7c7"/></svg>
                                                        {date}
                                                    </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                    </Slider>

                </div>
                <div className="row justify-content-center">
                    <button className={`col-auto text-center py-2 mb-5 mt-3 px-4 shadow home-button`} onClick={()=>setCreate({id: null, active: true})}>
                        <span>sign</span>
                    </button>
                    <div className="col-auto"></div>
                    <button className={`col-auto text-center py-2 mb-5 mt-3 px-4 shadow home-button`}>
                        <span>sign</span>
                    </button>
                    <div className="col-auto"></div>
                    <button className={`col-auto text-center py-2 mb-5 mt-3 px-4 shadow home-button`} onClick={signOut}>
                        <span>sign out</span>
                    </button>
                </div>
                {
                    ad === "" ? '' : showAdvertisementInfo()
                }
            </div>

        );
    }
    else {
        console.log("uspesne odhlaseny");
        navigate('/');
    }

    return null;


};

const NextArrow = props => {
    const { className, style, onClick } = props;
    return <svg className={className}  style={{ ...style, display: "block", transform: "scale(5)"}} onClick={onClick} width="112.756" height="76.79" viewBox="0 0 112.756 76.79"><defs><filter id="a" x="0" y="0" width="112.756" height="76.79" filterUnits="userSpaceOnUse"><feOffset dy="3" input="SourceAlpha"/><feGaussianBlur stdDeviation="3" result="b"/><feFlood flood-opacity="0.161"/><feComposite operator="in" in2="b"/><feComposite in="SourceGraphic"/></filter></defs><g transform="translate(103.756 140.704) rotate(180)"><g transform="matrix(-1, 0, 0, -1, 103.76, 140.7)" filter="url(#a)"><path d="M90.654,101.207H14l18.29-18.291a4.1,4.1,0,0,0-5.8-5.8L1.2,102.408a4.1,4.1,0,0,0,0,5.8L26.494,133.5a4.1,4.1,0,1,0,5.8-5.8L14,109.41h76.65a4.1,4.1,0,1,0,0-8.2Z" transform="translate(103.76 140.7) rotate(180)" fill="#2c393f"/></g></g></svg>
};

const PreviousArrow = props => {
    const { className, style, onClick } = props;
    return <svg className={className}  style={{ ...style, display: "block", transform: "scale(5)"}} onClick={onClick} width="112.756" height="76.79" viewBox="0 0 112.756 76.79"><defs><filter id="a" x="0" y="0" width="112.756" height="76.79" filterUnits="userSpaceOnUse"><feOffset dy="3" input="SourceAlpha"/><feGaussianBlur stdDeviation="3" result="b"/><feFlood flood-opacity="0.161"/><feComposite operator="in" in2="b"/><feComposite in="SourceGraphic"/></filter></defs><g transform="translate(9 -69.914)"><g transform="matrix(1, 0, 0, 1, -9, 69.91)" filter="url(#a)"><path d="M90.654,101.207H14l18.29-18.291a4.1,4.1,0,0,0-5.8-5.8L1.2,102.408a4.1,4.1,0,0,0,0,5.8L26.494,133.5a4.1,4.1,0,1,0,5.8-5.8L14,109.41h76.65a4.1,4.1,0,1,0,0-8.2Z" transform="translate(9 -69.91)" fill="#2c393f"/></g></g></svg>
};
