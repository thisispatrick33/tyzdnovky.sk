import React, {useState} from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export const Additional = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <div className={`additional-info-form | container-fluid | row col-12 | justify-content-center align-items-center | m-0 p-0`} style={{overflowY : `scroll`}}>
            <div className="content-frame | row  col-10 | justify-content-center align-items-start | px-0 | shadow-sm py-5 my-5">
                <div className="col-10">
                    <Slider {...settings}>
                        <div>
                            <h3>1</h3>
                            <h3>1</h3>
                            <h3>1</h3>
                            <h3>1</h3>
                            <h3>1</h3>
                            <h3>1</h3>
                            <h3>1</h3>
                            <h3>1</h3>
                            <h3>1</h3>
                        </div>
                        <div>
                            <h3>2</h3>
                        </div>
                        <div>
                            <h3>3</h3>
                        </div>
                        <div>
                            <h3>4</h3>
                        </div>
                        <div>
                            <h3>5</h3>
                        </div>
                        <div>
                            <h3>6</h3>
                        </div>
                    </Slider>
                </div>
                <h1 className={'pt-5'}>update your profile</h1>
                <div className="col-10 row main-info p-0 m-0 align-items-center">
                    <div className="col-3 row">
                        <div className="col-12 profile-photo">
                            <img src={`./images/profile-photo.png`} alt="" className={`col-12`}/>
                        </div>
                    </div>
                    <div className="col-9 row">
                        <input type="text" className={`col-12 p-0 my-2 py-2 px-4`} placeholder={`Username`}/>
                        <input type="text" className={`col-12 p-0 my-2 py-2 px-4`} placeholder={`First name or Company name `}/>
                        <input type="text" className={`col-12 p-0 my-2 py-2 px-4`} placeholder={`Last name or Business ID`}/>
                    </div>
                </div>
                <div className="col-10 row main-info">
                    <h3 className="col-12">kontakt</h3>
                    <div className="col-12 row justify-content-around">
                        <input type="text" className={`col-5 p-0 my-2 py-2 px-4`} placeholder={`Phone`}/>
                        <input type="text" className={`col-5 p-0 my-2 py-2 px-4`} placeholder={`Email`}/>
                    </div>
                </div>
                <div className="col-10 row languages justify-content-center">
                    <h3 className="col-12">jazykové znalosti</h3>
                    <div className="col-10 row justify-content-around">
                       <div className={`col-2 row m-0 px-0 py-2 justify-content-center`}><div className="language col-10 px-0 py-2 text-center">english</div></div>
                       <div className={`col-2 row m-0 px-0 py-2 justify-content-center`}><div className="language col-10 px-0 py-2 text-center">english</div></div>
                       <div className={`col-2 row m-0 px-0 py-2 justify-content-center`}><div className="language col-10 px-0 py-2 text-center">english</div></div>
                       <div className={`col-2 row m-0 px-0 py-2 justify-content-center`}><div className="language col-10 px-0 py-2 text-center">english</div></div>
                       <div className={`col-2 row m-0 px-0 py-2 justify-content-center`}><div className="language col-10 px-0 py-2 text-center">english</div></div>
                       <div className={`col-2 row m-0 px-0 py-2 justify-content-center`}><div className="language col-10 px-0 py-2 text-center">english</div></div>
                       <div className={`col-2 row m-0 px-0 py-2 justify-content-center`}><div className="language col-10 px-0 py-2 text-center">english</div></div>
                    </div>
                    <input type="text" className={`col-6 p-0 my-2 py-2 px-4`} placeholder={`another`}/>
                </div>
                <div className="col-10 row work-info justify-content-center">
                    <h3 className="col-12">work</h3>
                    <div className="col-10 row">
                        <input type="text" className={`col-8 p-0 my-2 py-2 px-4 mr-4`} placeholder={`work option`}/>
                        <input type="text" className={`col-3 p-0 my-2 py-2 px-4`} placeholder={`practise`}/>
                        <input type="text" className={`col-3 p-0 my-2 py-2 px-4`} placeholder={`ready`}/>
                    </div>

                </div>
                <div className="col-10 row work-info justify-content-center">vodicak</div>
                <div className="submit">
                    submit
                </div>
            </div>
        </div>

    )

};
