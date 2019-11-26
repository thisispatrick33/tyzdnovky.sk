import React from 'react';
import {Additional} from "../Additional";
import {Router, navigate} from '@reach/router';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Home =({location, edit = f => f, region}) => {
    const handleChange = (data) =>{
        edit(data);
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

    if(location.state != undefined){
        return (
            <div className={` home | container-fluid | row col-12 | justify-content-center align-items-center | m-0 p-0 `}>
                {location.state.data.user.active==0 ? <Additional user={location.state.data.user} func={handleChange} region={region}/> : ``}
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
                            <img src={location.state.data.user.profile_pic !==null ? location.state.data.user.profile_pic.substring(location.state.data.user.profile_pic.indexOf("images")) : "./images/user.svg"} className={`profile-photo`} alt=""/>
                            <div className="action-point text-center">7</div>
                        </div>
                    </div>
                    <div className="message col-11 mt-5">
                        {
                            location.state.data.user.name == null ? <p>Hello !</p> : <p>Hello <span>{location.state.data.user.name}</span> !</p>
                        }
                    </div>
                    <Slider {...settings} className={`container-fluid row col-11`}>
                        <div className="work-options-slide col-12">
                            <div className="work-options justify-content-between col-12 my-5 row">
                                <div className="work-option row justify-content-center col-3 p-0">
                                    <div className="content shadow p-0 col-10">
                                        <div className="work-option-image-wrapper">
                                            <img  className="work-option-image" src="./images/poster.jpg"/>
                                            <svg  className="work-option-save" width="13.135" height="15.526" viewBox="0 0 13.135 15.526"><g transform="translate(-33.261)"><path d="M46.2.513a1.157,1.157,0,0,0-.539-.421A1.136,1.136,0,0,0,45.206,0H34.451A1.136,1.136,0,0,0,34,.092a1.156,1.156,0,0,0-.539.421,1.089,1.089,0,0,0-.2.636V14.377a1.09,1.09,0,0,0,.2.636,1.156,1.156,0,0,0,.539.421,1.135,1.135,0,0,0,.451.092,1.224,1.224,0,0,0,.852-.339l4.526-4.351,4.526,4.351a1.221,1.221,0,0,0,.852.328,1.194,1.194,0,0,0,.99-.5,1.088,1.088,0,0,0,.2-.636V1.149A1.089,1.089,0,0,0,46.2.513ZM45.083,14.059,40.742,9.892l-.913-.872-.913.872-4.341,4.166V1.314H45.083V14.059Z" fill="#fff"/></g></svg>
                                        </div>
                                        <div className="work-option-content">
                                            <div className="text-center work-option-new">
                                                NEW!
                                            </div>
                                            <h5 className="work-option-title text-center mt-4 mb-2">
                                                AUTOMECHANIK
                                            </h5>
                                            <p className="work-option-description">
                                            Jujubes chupa chups gummies. Biscuit sugar plum lemon drops dessert cupcake sweet... 
                                            <a href="#">Zisti viac.</a>        
                                            </p>
                                            <div className="row text-center h6 work-option-info mt-4 mb-5">
                                                <div className="col-6 p-0">
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="13.512" height="19.292" viewBox="0 0 13.512 19.292"><path d="M23.023,12a2.466,2.466,0,1,0,2.466,2.466A2.469,2.469,0,0,0,23.023,12Zm0,4.228a1.762,1.762,0,1,1,1.762-1.762A1.764,1.764,0,0,1,23.023,16.228Z" transform="translate(-16.204 -7.772)" fill="#00c7c7"/><path d="M19.737,1.979a6.756,6.756,0,0,0-9.555,0,7.7,7.7,0,0,0-.636,9.5l5.413,7.817,5.405-7.806A7.7,7.7,0,0,0,19.737,1.979Zm.056,9.095-4.834,6.98-4.841-6.991a6.953,6.953,0,0,1,.562-8.586,6.052,6.052,0,0,1,8.558,0A6.956,6.956,0,0,1,19.793,11.074Z" transform="translate(-8.203 0)" fill="#00c7c7"/></svg>
                                                        NEMECKO
                                                    </span>
                                                </div>
                                                <div className="col-6 p-0">
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="15.888" height="17.023" viewBox="0 0 15.888 17.023"><path d="M17.6,1.135H15.618V.284A.283.283,0,0,0,15.335,0H13.349a.283.283,0,0,0-.284.284v.851H6.823V.284A.283.283,0,0,0,6.539,0H4.553A.283.283,0,0,0,4.27.284v.851H2.284A.283.283,0,0,0,2,1.419V16.739a.283.283,0,0,0,.284.284H17.6a.283.283,0,0,0,.284-.284V1.419A.283.283,0,0,0,17.6,1.135ZM13.632.567h1.419v1.7H13.632V.567Zm-8.8,0H6.256v1.7H4.837V.567ZM2.567,1.7h1.7v.851a.283.283,0,0,0,.284.284H6.539a.283.283,0,0,0,.284-.284V1.7h6.242v.851a.283.283,0,0,0,.284.284h1.986a.283.283,0,0,0,.284-.284V1.7h1.7V4.256H2.567Zm0,14.753V4.823H17.321V16.455Z" transform="translate(-2)" fill="#00c7c7"/><path d="M18.66,23H11v8.228H21.781V23H18.66Zm-1.986.567H18.66v1.986H16.674Zm1.986,4.539H16.674V26.121H18.66Zm-4.539-1.986h1.986v1.986H14.121Zm0-2.553h1.986v1.986H14.121Zm-2.553,0h1.986v1.986H11.567Zm0,2.553h1.986v1.986H11.567Zm1.986,4.539H11.567V28.674h1.986Zm2.553,0H14.121V28.674h1.986Zm2.553,0H16.674V28.674H18.66Zm2.553,0H19.228V28.674h1.986Zm0-2.553H19.228V26.121h1.986Zm0-4.539v1.986H19.228V23.567Z" transform="translate(-8.447 -16.475)" fill="#00c7c7"/></svg>
                                                        27.03.2020
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="work-option row justify-content-center col-3 p-0">
                                    <div className="content shadow p-0 col-10">
                                        <div className="work-option-image-wrapper">
                                            <img  className="work-option-image" src="./images/poster.jpg"/>
                                            <svg  className="work-option-save" width="13.135" height="15.526" viewBox="0 0 13.135 15.526"><g transform="translate(-33.261)"><path d="M46.2.513a1.157,1.157,0,0,0-.539-.421A1.136,1.136,0,0,0,45.206,0H34.451A1.136,1.136,0,0,0,34,.092a1.156,1.156,0,0,0-.539.421,1.089,1.089,0,0,0-.2.636V14.377a1.09,1.09,0,0,0,.2.636,1.156,1.156,0,0,0,.539.421,1.135,1.135,0,0,0,.451.092,1.224,1.224,0,0,0,.852-.339l4.526-4.351,4.526,4.351a1.221,1.221,0,0,0,.852.328,1.194,1.194,0,0,0,.99-.5,1.088,1.088,0,0,0,.2-.636V1.149A1.089,1.089,0,0,0,46.2.513ZM45.083,14.059,40.742,9.892l-.913-.872-.913.872-4.341,4.166V1.314H45.083V14.059Z" fill="#fff"/></g></svg>
                                        </div>
                                        <div className="work-option-content">
                                            <div className="text-center work-option-new">
                                                NEW!
                                            </div>
                                            <h5 className="work-option-title text-center mt-4 mb-2">
                                                AUTOMECHANIK
                                            </h5>
                                            <p className="work-option-description">
                                            Jujubes chupa chups gummies. Biscuit sugar plum lemon drops dessert cupcake sweet... 
                                            <a href="#">Zisti viac.</a>        
                                            </p>
                                            <div className="row text-center h6 work-option-info my-4">
                                                <div className="col-6 p-0">
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="13.512" height="19.292" viewBox="0 0 13.512 19.292"><path d="M23.023,12a2.466,2.466,0,1,0,2.466,2.466A2.469,2.469,0,0,0,23.023,12Zm0,4.228a1.762,1.762,0,1,1,1.762-1.762A1.764,1.764,0,0,1,23.023,16.228Z" transform="translate(-16.204 -7.772)" fill="#00c7c7"/><path d="M19.737,1.979a6.756,6.756,0,0,0-9.555,0,7.7,7.7,0,0,0-.636,9.5l5.413,7.817,5.405-7.806A7.7,7.7,0,0,0,19.737,1.979Zm.056,9.095-4.834,6.98-4.841-6.991a6.953,6.953,0,0,1,.562-8.586,6.052,6.052,0,0,1,8.558,0A6.956,6.956,0,0,1,19.793,11.074Z" transform="translate(-8.203 0)" fill="#00c7c7"/></svg>
                                                        NEMECKO
                                                    </span>
                                                </div>
                                                <div className="col-6 p-0">
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="15.888" height="17.023" viewBox="0 0 15.888 17.023"><path d="M17.6,1.135H15.618V.284A.283.283,0,0,0,15.335,0H13.349a.283.283,0,0,0-.284.284v.851H6.823V.284A.283.283,0,0,0,6.539,0H4.553A.283.283,0,0,0,4.27.284v.851H2.284A.283.283,0,0,0,2,1.419V16.739a.283.283,0,0,0,.284.284H17.6a.283.283,0,0,0,.284-.284V1.419A.283.283,0,0,0,17.6,1.135ZM13.632.567h1.419v1.7H13.632V.567Zm-8.8,0H6.256v1.7H4.837V.567ZM2.567,1.7h1.7v.851a.283.283,0,0,0,.284.284H6.539a.283.283,0,0,0,.284-.284V1.7h6.242v.851a.283.283,0,0,0,.284.284h1.986a.283.283,0,0,0,.284-.284V1.7h1.7V4.256H2.567Zm0,14.753V4.823H17.321V16.455Z" transform="translate(-2)" fill="#00c7c7"/><path d="M18.66,23H11v8.228H21.781V23H18.66Zm-1.986.567H18.66v1.986H16.674Zm1.986,4.539H16.674V26.121H18.66Zm-4.539-1.986h1.986v1.986H14.121Zm0-2.553h1.986v1.986H14.121Zm-2.553,0h1.986v1.986H11.567Zm0,2.553h1.986v1.986H11.567Zm1.986,4.539H11.567V28.674h1.986Zm2.553,0H14.121V28.674h1.986Zm2.553,0H16.674V28.674H18.66Zm2.553,0H19.228V28.674h1.986Zm0-2.553H19.228V26.121h1.986Zm0-4.539v1.986H19.228V23.567Z" transform="translate(-8.447 -16.475)" fill="#00c7c7"/></svg>
                                                        27.03.2020
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="work-option row justify-content-center col-3 p-0">
                                    <div className="content shadow p-0 col-10">
                                        <div className="work-option-image-wrapper">
                                            <img  className="work-option-image" src="./images/poster.jpg"/>
                                            <svg  className="work-option-save" width="13.135" height="15.526" viewBox="0 0 13.135 15.526"><g transform="translate(-33.261)"><path d="M46.2.513a1.157,1.157,0,0,0-.539-.421A1.136,1.136,0,0,0,45.206,0H34.451A1.136,1.136,0,0,0,34,.092a1.156,1.156,0,0,0-.539.421,1.089,1.089,0,0,0-.2.636V14.377a1.09,1.09,0,0,0,.2.636,1.156,1.156,0,0,0,.539.421,1.135,1.135,0,0,0,.451.092,1.224,1.224,0,0,0,.852-.339l4.526-4.351,4.526,4.351a1.221,1.221,0,0,0,.852.328,1.194,1.194,0,0,0,.99-.5,1.088,1.088,0,0,0,.2-.636V1.149A1.089,1.089,0,0,0,46.2.513ZM45.083,14.059,40.742,9.892l-.913-.872-.913.872-4.341,4.166V1.314H45.083V14.059Z" fill="#fff"/></g></svg>
                                        </div>
                                        <div className="work-option-content">
                                            <h5 className="work-option-title text-center mt-4 mb-2">
                                                AUTOMECHANIK
                                            </h5>
                                            <p className="work-option-description">
                                            Jujubes chupa chups gummies. Biscuit sugar plum lemon drops dessert cupcake sweet... 
                                            <a href="#">Zisti viac.</a>        
                                            </p>
                                            <div className="row text-center h6 work-option-info my-4">
                                                <div className="col-6 p-0">
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="13.512" height="19.292" viewBox="0 0 13.512 19.292"><path d="M23.023,12a2.466,2.466,0,1,0,2.466,2.466A2.469,2.469,0,0,0,23.023,12Zm0,4.228a1.762,1.762,0,1,1,1.762-1.762A1.764,1.764,0,0,1,23.023,16.228Z" transform="translate(-16.204 -7.772)" fill="#00c7c7"/><path d="M19.737,1.979a6.756,6.756,0,0,0-9.555,0,7.7,7.7,0,0,0-.636,9.5l5.413,7.817,5.405-7.806A7.7,7.7,0,0,0,19.737,1.979Zm.056,9.095-4.834,6.98-4.841-6.991a6.953,6.953,0,0,1,.562-8.586,6.052,6.052,0,0,1,8.558,0A6.956,6.956,0,0,1,19.793,11.074Z" transform="translate(-8.203 0)" fill="#00c7c7"/></svg>
                                                        NEMECKO
                                                    </span>
                                                </div>
                                                <div className="col-6 p-0">
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="15.888" height="17.023" viewBox="0 0 15.888 17.023"><path d="M17.6,1.135H15.618V.284A.283.283,0,0,0,15.335,0H13.349a.283.283,0,0,0-.284.284v.851H6.823V.284A.283.283,0,0,0,6.539,0H4.553A.283.283,0,0,0,4.27.284v.851H2.284A.283.283,0,0,0,2,1.419V16.739a.283.283,0,0,0,.284.284H17.6a.283.283,0,0,0,.284-.284V1.419A.283.283,0,0,0,17.6,1.135ZM13.632.567h1.419v1.7H13.632V.567Zm-8.8,0H6.256v1.7H4.837V.567ZM2.567,1.7h1.7v.851a.283.283,0,0,0,.284.284H6.539a.283.283,0,0,0,.284-.284V1.7h6.242v.851a.283.283,0,0,0,.284.284h1.986a.283.283,0,0,0,.284-.284V1.7h1.7V4.256H2.567Zm0,14.753V4.823H17.321V16.455Z" transform="translate(-2)" fill="#00c7c7"/><path d="M18.66,23H11v8.228H21.781V23H18.66Zm-1.986.567H18.66v1.986H16.674Zm1.986,4.539H16.674V26.121H18.66Zm-4.539-1.986h1.986v1.986H14.121Zm0-2.553h1.986v1.986H14.121Zm-2.553,0h1.986v1.986H11.567Zm0,2.553h1.986v1.986H11.567Zm1.986,4.539H11.567V28.674h1.986Zm2.553,0H14.121V28.674h1.986Zm2.553,0H16.674V28.674H18.66Zm2.553,0H19.228V28.674h1.986Zm0-2.553H19.228V26.121h1.986Zm0-4.539v1.986H19.228V23.567Z" transform="translate(-8.447 -16.475)" fill="#00c7c7"/></svg>
                                                        27.03.2020
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="work-option row justify-content-center col-3 p-0">
                                    <div className="content shadow p-0 col-10">
                                        <div className="work-option-image-wrapper">
                                            <img  className="work-option-image" src="./images/poster.jpg"/>
                                            <svg  className="work-option-save" width="13.135" height="15.526" viewBox="0 0 13.135 15.526"><g transform="translate(-33.261)"><path d="M46.2.513a1.157,1.157,0,0,0-.539-.421A1.136,1.136,0,0,0,45.206,0H34.451A1.136,1.136,0,0,0,34,.092a1.156,1.156,0,0,0-.539.421,1.089,1.089,0,0,0-.2.636V14.377a1.09,1.09,0,0,0,.2.636,1.156,1.156,0,0,0,.539.421,1.135,1.135,0,0,0,.451.092,1.224,1.224,0,0,0,.852-.339l4.526-4.351,4.526,4.351a1.221,1.221,0,0,0,.852.328,1.194,1.194,0,0,0,.99-.5,1.088,1.088,0,0,0,.2-.636V1.149A1.089,1.089,0,0,0,46.2.513ZM45.083,14.059,40.742,9.892l-.913-.872-.913.872-4.341,4.166V1.314H45.083V14.059Z" fill="#fff"/></g></svg>
                                        </div>
                                        <div className="work-option-content">
                                            <h5 className="work-option-title text-center mt-4 mb-2">
                                                AUTOMECHANIK
                                            </h5>
                                            <p className="work-option-description">
                                            Jujubes chupa chups gummies. Biscuit sugar plum lemon drops dessert cupcake sweet... 
                                            <a href="#">Zisti viac.</a>        
                                            </p>
                                            <div className="row text-center h6 work-option-info my-4">
                                                <div className="col-6 p-0">
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="13.512" height="19.292" viewBox="0 0 13.512 19.292"><path d="M23.023,12a2.466,2.466,0,1,0,2.466,2.466A2.469,2.469,0,0,0,23.023,12Zm0,4.228a1.762,1.762,0,1,1,1.762-1.762A1.764,1.764,0,0,1,23.023,16.228Z" transform="translate(-16.204 -7.772)" fill="#00c7c7"/><path d="M19.737,1.979a6.756,6.756,0,0,0-9.555,0,7.7,7.7,0,0,0-.636,9.5l5.413,7.817,5.405-7.806A7.7,7.7,0,0,0,19.737,1.979Zm.056,9.095-4.834,6.98-4.841-6.991a6.953,6.953,0,0,1,.562-8.586,6.052,6.052,0,0,1,8.558,0A6.956,6.956,0,0,1,19.793,11.074Z" transform="translate(-8.203 0)" fill="#00c7c7"/></svg>
                                                        NEMECKO
                                                    </span>
                                                </div>
                                                <div className="col-6 p-0">
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="15.888" height="17.023" viewBox="0 0 15.888 17.023"><path d="M17.6,1.135H15.618V.284A.283.283,0,0,0,15.335,0H13.349a.283.283,0,0,0-.284.284v.851H6.823V.284A.283.283,0,0,0,6.539,0H4.553A.283.283,0,0,0,4.27.284v.851H2.284A.283.283,0,0,0,2,1.419V16.739a.283.283,0,0,0,.284.284H17.6a.283.283,0,0,0,.284-.284V1.419A.283.283,0,0,0,17.6,1.135ZM13.632.567h1.419v1.7H13.632V.567Zm-8.8,0H6.256v1.7H4.837V.567ZM2.567,1.7h1.7v.851a.283.283,0,0,0,.284.284H6.539a.283.283,0,0,0,.284-.284V1.7h6.242v.851a.283.283,0,0,0,.284.284h1.986a.283.283,0,0,0,.284-.284V1.7h1.7V4.256H2.567Zm0,14.753V4.823H17.321V16.455Z" transform="translate(-2)" fill="#00c7c7"/><path d="M18.66,23H11v8.228H21.781V23H18.66Zm-1.986.567H18.66v1.986H16.674Zm1.986,4.539H16.674V26.121H18.66Zm-4.539-1.986h1.986v1.986H14.121Zm0-2.553h1.986v1.986H14.121Zm-2.553,0h1.986v1.986H11.567Zm0,2.553h1.986v1.986H11.567Zm1.986,4.539H11.567V28.674h1.986Zm2.553,0H14.121V28.674h1.986Zm2.553,0H16.674V28.674H18.66Zm2.553,0H19.228V28.674h1.986Zm0-2.553H19.228V26.121h1.986Zm0-4.539v1.986H19.228V23.567Z" transform="translate(-8.447 -16.475)" fill="#00c7c7"/></svg>
                                                        27.03.2020
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="work-options-slide col-12">
                            <div className="work-options justify-content-between col-12 my-5 row">
                                <div className="work-option row justify-content-center col-3 p-0">
                                    <div className="content shadow p-0 col-10">
                                        <div className="work-option-image-wrapper">
                                            <img  className="work-option-image" src="./images/poster.jpg"/>
                                            <svg  className="work-option-save" width="13.135" height="15.526" viewBox="0 0 13.135 15.526"><g transform="translate(-33.261)"><path d="M46.2.513a1.157,1.157,0,0,0-.539-.421A1.136,1.136,0,0,0,45.206,0H34.451A1.136,1.136,0,0,0,34,.092a1.156,1.156,0,0,0-.539.421,1.089,1.089,0,0,0-.2.636V14.377a1.09,1.09,0,0,0,.2.636,1.156,1.156,0,0,0,.539.421,1.135,1.135,0,0,0,.451.092,1.224,1.224,0,0,0,.852-.339l4.526-4.351,4.526,4.351a1.221,1.221,0,0,0,.852.328,1.194,1.194,0,0,0,.99-.5,1.088,1.088,0,0,0,.2-.636V1.149A1.089,1.089,0,0,0,46.2.513ZM45.083,14.059,40.742,9.892l-.913-.872-.913.872-4.341,4.166V1.314H45.083V14.059Z" fill="#fff"/></g></svg>
                                        </div>
                                        <div className="work-option-content">
                                            <h5 className="work-option-title text-center mt-4 mb-2">
                                                AUTOMECHANIK
                                            </h5>
                                            <p className="work-option-description">
                                            Jujubes chupa chups gummies. Biscuit sugar plum lemon drops dessert cupcake sweet... 
                                            <a href="#">Zisti viac.</a>        
                                            </p>
                                            <div className="row text-center h6 work-option-info my-4">
                                                <div className="col-6 p-0">
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="13.512" height="19.292" viewBox="0 0 13.512 19.292"><path d="M23.023,12a2.466,2.466,0,1,0,2.466,2.466A2.469,2.469,0,0,0,23.023,12Zm0,4.228a1.762,1.762,0,1,1,1.762-1.762A1.764,1.764,0,0,1,23.023,16.228Z" transform="translate(-16.204 -7.772)" fill="#00c7c7"/><path d="M19.737,1.979a6.756,6.756,0,0,0-9.555,0,7.7,7.7,0,0,0-.636,9.5l5.413,7.817,5.405-7.806A7.7,7.7,0,0,0,19.737,1.979Zm.056,9.095-4.834,6.98-4.841-6.991a6.953,6.953,0,0,1,.562-8.586,6.052,6.052,0,0,1,8.558,0A6.956,6.956,0,0,1,19.793,11.074Z" transform="translate(-8.203 0)" fill="#00c7c7"/></svg>
                                                        NEMECKO
                                                    </span>
                                                </div>
                                                <div className="col-6 p-0">
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="15.888" height="17.023" viewBox="0 0 15.888 17.023"><path d="M17.6,1.135H15.618V.284A.283.283,0,0,0,15.335,0H13.349a.283.283,0,0,0-.284.284v.851H6.823V.284A.283.283,0,0,0,6.539,0H4.553A.283.283,0,0,0,4.27.284v.851H2.284A.283.283,0,0,0,2,1.419V16.739a.283.283,0,0,0,.284.284H17.6a.283.283,0,0,0,.284-.284V1.419A.283.283,0,0,0,17.6,1.135ZM13.632.567h1.419v1.7H13.632V.567Zm-8.8,0H6.256v1.7H4.837V.567ZM2.567,1.7h1.7v.851a.283.283,0,0,0,.284.284H6.539a.283.283,0,0,0,.284-.284V1.7h6.242v.851a.283.283,0,0,0,.284.284h1.986a.283.283,0,0,0,.284-.284V1.7h1.7V4.256H2.567Zm0,14.753V4.823H17.321V16.455Z" transform="translate(-2)" fill="#00c7c7"/><path d="M18.66,23H11v8.228H21.781V23H18.66Zm-1.986.567H18.66v1.986H16.674Zm1.986,4.539H16.674V26.121H18.66Zm-4.539-1.986h1.986v1.986H14.121Zm0-2.553h1.986v1.986H14.121Zm-2.553,0h1.986v1.986H11.567Zm0,2.553h1.986v1.986H11.567Zm1.986,4.539H11.567V28.674h1.986Zm2.553,0H14.121V28.674h1.986Zm2.553,0H16.674V28.674H18.66Zm2.553,0H19.228V28.674h1.986Zm0-2.553H19.228V26.121h1.986Zm0-4.539v1.986H19.228V23.567Z" transform="translate(-8.447 -16.475)" fill="#00c7c7"/></svg>
                                                        27.03.2020
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="work-option row justify-content-center col-3 p-0">
                                    <div className="content shadow p-0 col-10">
                                        <div className="work-option-image-wrapper">
                                            <img  className="work-option-image" src="./images/poster.jpg"/>
                                            <svg  className="work-option-save" width="13.135" height="15.526" viewBox="0 0 13.135 15.526"><g transform="translate(-33.261)"><path d="M46.2.513a1.157,1.157,0,0,0-.539-.421A1.136,1.136,0,0,0,45.206,0H34.451A1.136,1.136,0,0,0,34,.092a1.156,1.156,0,0,0-.539.421,1.089,1.089,0,0,0-.2.636V14.377a1.09,1.09,0,0,0,.2.636,1.156,1.156,0,0,0,.539.421,1.135,1.135,0,0,0,.451.092,1.224,1.224,0,0,0,.852-.339l4.526-4.351,4.526,4.351a1.221,1.221,0,0,0,.852.328,1.194,1.194,0,0,0,.99-.5,1.088,1.088,0,0,0,.2-.636V1.149A1.089,1.089,0,0,0,46.2.513ZM45.083,14.059,40.742,9.892l-.913-.872-.913.872-4.341,4.166V1.314H45.083V14.059Z" fill="#fff"/></g></svg>
                                        </div>
                                        <div className="work-option-content">
                                            <h5 className="work-option-title text-center mt-4 mb-2">
                                                AUTOMECHANIK
                                            </h5>
                                            <p className="work-option-description">
                                            Jujubes chupa chups gummies. Biscuit sugar plum lemon drops dessert cupcake sweet... 
                                            <a href="#">Zisti viac.</a>        
                                            </p>
                                            <div className="row text-center h6 work-option-info my-4">
                                                <div className="col-6 p-0">
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="13.512" height="19.292" viewBox="0 0 13.512 19.292"><path d="M23.023,12a2.466,2.466,0,1,0,2.466,2.466A2.469,2.469,0,0,0,23.023,12Zm0,4.228a1.762,1.762,0,1,1,1.762-1.762A1.764,1.764,0,0,1,23.023,16.228Z" transform="translate(-16.204 -7.772)" fill="#00c7c7"/><path d="M19.737,1.979a6.756,6.756,0,0,0-9.555,0,7.7,7.7,0,0,0-.636,9.5l5.413,7.817,5.405-7.806A7.7,7.7,0,0,0,19.737,1.979Zm.056,9.095-4.834,6.98-4.841-6.991a6.953,6.953,0,0,1,.562-8.586,6.052,6.052,0,0,1,8.558,0A6.956,6.956,0,0,1,19.793,11.074Z" transform="translate(-8.203 0)" fill="#00c7c7"/></svg>
                                                        NEMECKO
                                                    </span>
                                                </div>
                                                <div className="col-6 p-0">
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="15.888" height="17.023" viewBox="0 0 15.888 17.023"><path d="M17.6,1.135H15.618V.284A.283.283,0,0,0,15.335,0H13.349a.283.283,0,0,0-.284.284v.851H6.823V.284A.283.283,0,0,0,6.539,0H4.553A.283.283,0,0,0,4.27.284v.851H2.284A.283.283,0,0,0,2,1.419V16.739a.283.283,0,0,0,.284.284H17.6a.283.283,0,0,0,.284-.284V1.419A.283.283,0,0,0,17.6,1.135ZM13.632.567h1.419v1.7H13.632V.567Zm-8.8,0H6.256v1.7H4.837V.567ZM2.567,1.7h1.7v.851a.283.283,0,0,0,.284.284H6.539a.283.283,0,0,0,.284-.284V1.7h6.242v.851a.283.283,0,0,0,.284.284h1.986a.283.283,0,0,0,.284-.284V1.7h1.7V4.256H2.567Zm0,14.753V4.823H17.321V16.455Z" transform="translate(-2)" fill="#00c7c7"/><path d="M18.66,23H11v8.228H21.781V23H18.66Zm-1.986.567H18.66v1.986H16.674Zm1.986,4.539H16.674V26.121H18.66Zm-4.539-1.986h1.986v1.986H14.121Zm0-2.553h1.986v1.986H14.121Zm-2.553,0h1.986v1.986H11.567Zm0,2.553h1.986v1.986H11.567Zm1.986,4.539H11.567V28.674h1.986Zm2.553,0H14.121V28.674h1.986Zm2.553,0H16.674V28.674H18.66Zm2.553,0H19.228V28.674h1.986Zm0-2.553H19.228V26.121h1.986Zm0-4.539v1.986H19.228V23.567Z" transform="translate(-8.447 -16.475)" fill="#00c7c7"/></svg>
                                                        27.03.2020
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="work-option row justify-content-center col-3 p-0">
                                    <div className="content shadow p-0 col-10">
                                        <div className="work-option-image-wrapper">
                                            <img  className="work-option-image" src="./images/poster.jpg"/>
                                            <svg  className="work-option-save" width="13.135" height="15.526" viewBox="0 0 13.135 15.526"><g transform="translate(-33.261)"><path d="M46.2.513a1.157,1.157,0,0,0-.539-.421A1.136,1.136,0,0,0,45.206,0H34.451A1.136,1.136,0,0,0,34,.092a1.156,1.156,0,0,0-.539.421,1.089,1.089,0,0,0-.2.636V14.377a1.09,1.09,0,0,0,.2.636,1.156,1.156,0,0,0,.539.421,1.135,1.135,0,0,0,.451.092,1.224,1.224,0,0,0,.852-.339l4.526-4.351,4.526,4.351a1.221,1.221,0,0,0,.852.328,1.194,1.194,0,0,0,.99-.5,1.088,1.088,0,0,0,.2-.636V1.149A1.089,1.089,0,0,0,46.2.513ZM45.083,14.059,40.742,9.892l-.913-.872-.913.872-4.341,4.166V1.314H45.083V14.059Z" fill="#fff"/></g></svg>
                                        </div>
                                        <div className="work-option-content">
                                            <h5 className="work-option-title text-center mt-4 mb-2">
                                                AUTOMECHANIK
                                            </h5>
                                            <p className="work-option-description">
                                            Jujubes chupa chups gummies. Biscuit sugar plum lemon drops dessert cupcake sweet... 
                                            <a href="#">Zisti viac.</a>        
                                            </p>
                                            <div className="row text-center h6 work-option-info my-4">
                                                <div className="col-6 p-0">
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="13.512" height="19.292" viewBox="0 0 13.512 19.292"><path d="M23.023,12a2.466,2.466,0,1,0,2.466,2.466A2.469,2.469,0,0,0,23.023,12Zm0,4.228a1.762,1.762,0,1,1,1.762-1.762A1.764,1.764,0,0,1,23.023,16.228Z" transform="translate(-16.204 -7.772)" fill="#00c7c7"/><path d="M19.737,1.979a6.756,6.756,0,0,0-9.555,0,7.7,7.7,0,0,0-.636,9.5l5.413,7.817,5.405-7.806A7.7,7.7,0,0,0,19.737,1.979Zm.056,9.095-4.834,6.98-4.841-6.991a6.953,6.953,0,0,1,.562-8.586,6.052,6.052,0,0,1,8.558,0A6.956,6.956,0,0,1,19.793,11.074Z" transform="translate(-8.203 0)" fill="#00c7c7"/></svg>
                                                        NEMECKO
                                                    </span>
                                                </div>
                                                <div className="col-6 p-0">
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="15.888" height="17.023" viewBox="0 0 15.888 17.023"><path d="M17.6,1.135H15.618V.284A.283.283,0,0,0,15.335,0H13.349a.283.283,0,0,0-.284.284v.851H6.823V.284A.283.283,0,0,0,6.539,0H4.553A.283.283,0,0,0,4.27.284v.851H2.284A.283.283,0,0,0,2,1.419V16.739a.283.283,0,0,0,.284.284H17.6a.283.283,0,0,0,.284-.284V1.419A.283.283,0,0,0,17.6,1.135ZM13.632.567h1.419v1.7H13.632V.567Zm-8.8,0H6.256v1.7H4.837V.567ZM2.567,1.7h1.7v.851a.283.283,0,0,0,.284.284H6.539a.283.283,0,0,0,.284-.284V1.7h6.242v.851a.283.283,0,0,0,.284.284h1.986a.283.283,0,0,0,.284-.284V1.7h1.7V4.256H2.567Zm0,14.753V4.823H17.321V16.455Z" transform="translate(-2)" fill="#00c7c7"/><path d="M18.66,23H11v8.228H21.781V23H18.66Zm-1.986.567H18.66v1.986H16.674Zm1.986,4.539H16.674V26.121H18.66Zm-4.539-1.986h1.986v1.986H14.121Zm0-2.553h1.986v1.986H14.121Zm-2.553,0h1.986v1.986H11.567Zm0,2.553h1.986v1.986H11.567Zm1.986,4.539H11.567V28.674h1.986Zm2.553,0H14.121V28.674h1.986Zm2.553,0H16.674V28.674H18.66Zm2.553,0H19.228V28.674h1.986Zm0-2.553H19.228V26.121h1.986Zm0-4.539v1.986H19.228V23.567Z" transform="translate(-8.447 -16.475)" fill="#00c7c7"/></svg>
                                                        27.03.2020
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="work-option row justify-content-center col-3 p-0">
                                    <div className="content shadow p-0 col-10">
                                        <div className="work-option-image-wrapper">
                                            <img  className="work-option-image" src="./images/poster.jpg"/>
                                            <svg  className="work-option-save" width="13.135" height="15.526" viewBox="0 0 13.135 15.526"><g transform="translate(-33.261)"><path d="M46.2.513a1.157,1.157,0,0,0-.539-.421A1.136,1.136,0,0,0,45.206,0H34.451A1.136,1.136,0,0,0,34,.092a1.156,1.156,0,0,0-.539.421,1.089,1.089,0,0,0-.2.636V14.377a1.09,1.09,0,0,0,.2.636,1.156,1.156,0,0,0,.539.421,1.135,1.135,0,0,0,.451.092,1.224,1.224,0,0,0,.852-.339l4.526-4.351,4.526,4.351a1.221,1.221,0,0,0,.852.328,1.194,1.194,0,0,0,.99-.5,1.088,1.088,0,0,0,.2-.636V1.149A1.089,1.089,0,0,0,46.2.513ZM45.083,14.059,40.742,9.892l-.913-.872-.913.872-4.341,4.166V1.314H45.083V14.059Z" fill="#fff"/></g></svg>
                                        </div>
                                        <div className="work-option-content">
                                            
                                            <h5 className="work-option-title text-center mt-4 mb-2">
                                                AUTOMECHANIK
                                            </h5>
                                            <p className="work-option-description">
                                            Jujubes chupa chups gummies. Biscuit sugar plum lemon drops dessert cupcake sweet... 
                                            <a href="#">Zisti viac.</a>        
                                            </p>
                                            <div className="row text-center h6 work-option-info my-4">
                                                <div className="col-6 p-0">
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="13.512" height="19.292" viewBox="0 0 13.512 19.292"><path d="M23.023,12a2.466,2.466,0,1,0,2.466,2.466A2.469,2.469,0,0,0,23.023,12Zm0,4.228a1.762,1.762,0,1,1,1.762-1.762A1.764,1.764,0,0,1,23.023,16.228Z" transform="translate(-16.204 -7.772)" fill="#00c7c7"/><path d="M19.737,1.979a6.756,6.756,0,0,0-9.555,0,7.7,7.7,0,0,0-.636,9.5l5.413,7.817,5.405-7.806A7.7,7.7,0,0,0,19.737,1.979Zm.056,9.095-4.834,6.98-4.841-6.991a6.953,6.953,0,0,1,.562-8.586,6.052,6.052,0,0,1,8.558,0A6.956,6.956,0,0,1,19.793,11.074Z" transform="translate(-8.203 0)" fill="#00c7c7"/></svg>
                                                        NEMECKO
                                                    </span>
                                                </div>
                                                <div className="col-6 p-0">
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="15.888" height="17.023" viewBox="0 0 15.888 17.023"><path d="M17.6,1.135H15.618V.284A.283.283,0,0,0,15.335,0H13.349a.283.283,0,0,0-.284.284v.851H6.823V.284A.283.283,0,0,0,6.539,0H4.553A.283.283,0,0,0,4.27.284v.851H2.284A.283.283,0,0,0,2,1.419V16.739a.283.283,0,0,0,.284.284H17.6a.283.283,0,0,0,.284-.284V1.419A.283.283,0,0,0,17.6,1.135ZM13.632.567h1.419v1.7H13.632V.567Zm-8.8,0H6.256v1.7H4.837V.567ZM2.567,1.7h1.7v.851a.283.283,0,0,0,.284.284H6.539a.283.283,0,0,0,.284-.284V1.7h6.242v.851a.283.283,0,0,0,.284.284h1.986a.283.283,0,0,0,.284-.284V1.7h1.7V4.256H2.567Zm0,14.753V4.823H17.321V16.455Z" transform="translate(-2)" fill="#00c7c7"/><path d="M18.66,23H11v8.228H21.781V23H18.66Zm-1.986.567H18.66v1.986H16.674Zm1.986,4.539H16.674V26.121H18.66Zm-4.539-1.986h1.986v1.986H14.121Zm0-2.553h1.986v1.986H14.121Zm-2.553,0h1.986v1.986H11.567Zm0,2.553h1.986v1.986H11.567Zm1.986,4.539H11.567V28.674h1.986Zm2.553,0H14.121V28.674h1.986Zm2.553,0H16.674V28.674H18.66Zm2.553,0H19.228V28.674h1.986Zm0-2.553H19.228V26.121h1.986Zm0-4.539v1.986H19.228V23.567Z" transform="translate(-8.447 -16.475)" fill="#00c7c7"/></svg>
                                                        27.03.2020
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Slider>
                </div>
            </div>
        );
    }
    navigate('/');
    return null;


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