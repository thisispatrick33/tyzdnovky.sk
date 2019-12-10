import React, { useState} from 'react';
import {Additional} from "../Authentication/Additional";
import { navigate } from '@reach/router';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {Offer} from "../Offer/Offer";
import {OfferLookup} from "../Offer/OfferLookup";
import {OfferView} from "../Offer/OfferView";
import {Loader} from "../Others/Loader";

export const Home =({ additional, offers, offer, user, updateProfile = f => f, createOffer = f => f, updateOffer = f => f, viewOffer = f => f, closeOffer = f => f, signOut }) => {

    const settings = {
        dots: false,
        arrows : true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        adaptiveHeight : false,
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


    const [form, setForm] = useState({open : false, control : false, edit : false});

    const handleChange = data => updateProfile(data);
    const handleCreate = data => createOffer(data);
    const handleEdit = id => { viewOffer(id); setForm({open : true, control : true, edit : true}); };
    const handleUpdate = data => updateOffer(data);
    const handleView = id => { viewOffer(id); setForm({open : true, control : false, edit : false}); };
    const handleClose = () => closeOffer();

    if(user !== undefined){
        if(offers[0] === undefined){
            return <Loader />;
        }
        return (
            <div className={` home | container-fluid | row col-12 | justify-content-center align-items-center | m-0 p-0 pt-md-5`}>
                {
                    user.active === 0 ? <Additional user={user} data={additional} func={handleChange}/> : ``
                }
                {
                    form.open && !form.control ? <OfferView offer={offer} close={() => setForm({open : false, control : false, edit : false})} /> : null
                }
                {
                    form.open && form.control ? <Offer edit={form.edit} user={user} createOffer={handleCreate} updateOffer={handleUpdate} closeOffer={() => setForm(false)} data={offer}/> : ""
                }
                <div className="content col-12 col-md-11 row justify-content-center pt-5 mb-2">
                    <div className="header col-11 row justify-content-between">
                        <div className="menu col-2 col-md-1 row px-0">
                            <svg className={` p-0 menu-svg`} viewBox="0 0 86.628 43.314" xmlns="http://www.w3.org/2000/svg">
                                <g transform="translate(0 -96.243)">
                                    <g transform="translate(0 96.243)" fill="#2c393f">
                                        <path transform="translate(0 -96.243)" d="M2.707,101.657H83.921a2.707,2.707,0,0,0,0-5.414H2.707a2.707,2.707,0,0,0,0,5.414Z" data-name="Path 41"/>
                                        <path transform="translate(0 -161.5)" d="M83.921,180.455H2.707a2.707,2.707,0,1,0,0,5.414H83.921a2.707,2.707,0,1,0,0-5.414Z" data-name="Path 42"/>
                                        <path transform="translate(-93.232 -226.77)" d="m177.15 264.67h-54.143a2.707 2.707 0 1 0 0 5.414h54.143a2.707 2.707 0 1 0 0-5.414z" data-name="Path 43"/>
                                    </g>
                                </g>
                            </svg>

                        </div>
                        <div className={`finder col-10 col-sm-9  d-flex justify-content-center`}>
                            <input type="text" className="col-11 finder" placeholder="…find work, company or group"/>
                        </div>
                        {
                            window.innerWidth >= 576 ? <div className="user-header-nofication col-1">
                            <img src={ user.profile_pic !== null ? user.profile_pic.substring(user.profile_pic.indexOf("images")) : "./images/user.svg"} className={`profile-photo`} alt=""/>
                            <div className="action-point text-center">7</div>
                            </div>:null
                        }
                        
                    </div>
                    <div className="message col-11 my-4">
                        {
                            user.name == null ? <p>Hello !</p> : <p>Hello <span>{user.name}</span> !</p>
                        }
                    </div>

                    <Slider {...settings} className={`work-options justify-content-between col-12 mt-2 px-5 row`}>
                        {
                            offers.map(({id, title, description, address, date, created_at}) => {
                                return(
                                    <OfferLookup
                                        key={id}
                                        id={id}
                                        title={title}
                                        description={description}
                                        address={address}
                                        date={date}
                                        created_at={created_at}
                                        view={handleView}
                                        edit={handleEdit}
                                    />

                                )
                            })
                        }
                    </Slider>
                </div>
                <div className="row justify-content-center">
                    <button className={`col-auto text-center py-2 mb-5 mx-3 mt-3 px-4 shadow home-button`} onClick={() => setForm({open : true, control : true, edit : false})}>
                        create
                    </button>
                    <button className={`col-auto text-center py-2 mb-5 mx-3 mt-3 px-4 shadow home-button`} onClick={signOut}>
                        sign out
                    </button>
                </div>


            </div>

        );
    }
    else {
        navigate('/');
    }

    return null;


};

const NextArrow = props => {
    const { className, style, onClick } = props;
    return <svg className={className}  style={{ ...style, display: "block"}} onClick={onClick} width="112.756" height="76.79" viewBox="0 0 112.756 76.79"><defs><filter id="a" x="0" y="0" width="112.756" height="76.79" filterUnits="userSpaceOnUse"><feOffset dy="3" input="SourceAlpha"/><feGaussianBlur stdDeviation="3" result="b"/><feFlood flood-opacity="0.161"/><feComposite operator="in" in2="b"/><feComposite in="SourceGraphic"/></filter></defs><g transform="translate(103.756 140.704) rotate(180)"><g transform="matrix(-1, 0, 0, -1, 103.76, 140.7)" filter="url(#a)"><path d="M90.654,101.207H14l18.29-18.291a4.1,4.1,0,0,0-5.8-5.8L1.2,102.408a4.1,4.1,0,0,0,0,5.8L26.494,133.5a4.1,4.1,0,1,0,5.8-5.8L14,109.41h76.65a4.1,4.1,0,1,0,0-8.2Z" transform="translate(103.76 140.7) rotate(180)" fill="#2c393f"/></g></g></svg>
};

const PreviousArrow = props => {
    const { className, style, onClick } = props;
    return <svg className={className}  style={{ ...style, display: "block"}} onClick={onClick} width="112.756" height="76.79" viewBox="0 0 112.756 76.79"><defs><filter id="a" x="0" y="0" width="112.756" height="76.79" filterUnits="userSpaceOnUse"><feOffset dy="3" input="SourceAlpha"/><feGaussianBlur stdDeviation="3" result="b"/><feFlood flood-opacity="0.161"/><feComposite operator="in" in2="b"/><feComposite in="SourceGraphic"/></filter></defs><g transform="translate(9 -69.914)"><g transform="matrix(1, 0, 0, 1, -9, 69.91)" filter="url(#a)"><path d="M90.654,101.207H14l18.29-18.291a4.1,4.1,0,0,0-5.8-5.8L1.2,102.408a4.1,4.1,0,0,0,0,5.8L26.494,133.5a4.1,4.1,0,1,0,5.8-5.8L14,109.41h76.65a4.1,4.1,0,1,0,0-8.2Z" transform="translate(9 -69.91)" fill="#2c393f"/></g></g></svg>
};