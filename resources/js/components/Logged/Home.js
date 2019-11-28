import React, { useState} from 'react';
import {Additional} from "../Additional";
import { navigate } from '@reach/router';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Advertisement} from "../Forms/Advertisement";
import {AdvertisementLookup} from "../Forms/AdvertisementLookup";


export const Home =({ ads, ad, user, updateProfile = f => f, createAd = f => f, updateAd = f => f, viewAd = f => f }) => {
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
    const [create, setCreate] = useState({id: null, active: false});

    const handleChange = data => updateProfile(data);
    const handleCreate = data => createAd(data);
    const handleUpdate = data => updateAd(data);
    const handleView = id => viewAd(id);



    if(user !== undefined){
        if(ads[0] === undefined){
            return <div>loading</div>;
        }
        return (
            <div className={` home | container-fluid | row col-12 | justify-content-center align-items-center | m-0 p-0 pt-5`}>

                {
                    user.active === 0 ? <Additional user={user} func={handleChange}/> : ``
                }
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
                            <img src={ user.profile_pic !==null ? user.profile_pic.substring(user.profile_pic.indexOf("images")) : "./images/user.svg"} className={`profile-photo`} alt=""/>
                            <div className="action-point text-center">7</div>
                        </div>
                    </div>
                    <div className="message col-11 mt-5">
                        {
                            user.name == null ? <p>Hello !</p> : <p>Hello <span>{user.name}</span> !</p>
                        }
                    </div>
                    {
                        create.active ? <Advertisement createAd={handleCreate} updateAd={handleUpdate} id={create.id}/> : ""
                    }
                    <Slider {...settings} className={`work-options justify-content-between col-12 my-5 px-5 row`}>
                                {
                                    ads.map(({id, title, description, address, date, created_at}) => {
                                        return(
                                            <AdvertisementLookup
                                                id={id}
                                                title={title}
                                                description={description}
                                                address={address}
                                                date={date}
                                                created_at={created_at}
                                                view={handleView}
                                            />
                                        )
                                    })
                                }
                    </Slider>
                </div>
                <div className="row justify-content-center">
                    <button className={`col-auto text-center py-2 mb-5 mt-3 px-4 shadow home-button`}>
                        <span>sign</span>
                    </button>
                    <div className="col-auto"></div>
                    <button className={`col-auto text-center py-2 mb-5 mt-3 px-4 shadow home-button`}>
                        <span>sign</span>
                    </button>
                    <div className="col-auto"></div>
                    <button className={`col-auto text-center py-2 mb-5 mt-3 px-4 shadow home-button`}>
                        <span>sign</span>
                    </button>
                </div>
            </div>

        );
    }
    navigate('/');
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
