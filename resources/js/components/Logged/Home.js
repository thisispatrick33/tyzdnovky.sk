import React from 'react';
import {Additional} from "../Additional";



export const Home = ({location, edit = f => f}) => {
    const handleChange = (data) =>{
        edit(data);
    };

    if(location.state!=null){
        let additional = "";
        if(location.state.data.user.active==0){
            additional = <Additional user={location.state.data.user} func={handleChange}/>
        }

        return (
            <div className={` home | container-fluid | row col-12 | justify-content-center align-items-center | m-0 p-0 `}>
                {additional}
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
                            <img src={`./images/profile-photo.png`} className={`profile-photo`} alt=""/>
                            <div className="action-point text-center">7</div>
                        </div>
                    </div>
                    <div className="message col-11 mt-5">
                        <p>Hello <span>{location.state.data.user.username}</span> !</p>
                    </div>

                    <div className="work-options justify-content-between col-11 row my-5">
                        <div className="work-option row justify-content-center col-3 p-0">
                            <div className="content shadow p-0 col-10"></div>
                        </div>
                        <div className="work-option row justify-content-center col-3 p-0">
                            <div className="content shadow p-0 col-10"></div>
                        </div>
                        <div className="work-option row justify-content-center col-3 p-0">
                            <div className="content shadow p-0 col-10"></div>
                        </div>
                        <div className="work-option row justify-content-center col-3 p-0">
                            <div className="content shadow p-0 col-10"></div>
                        </div>
                    </div>
                </div>
            </div>
        );


    }
    return (
        <div className={` home | container-fluid | row col-12 | justify-content-center | mb-5 m-0 p-0 `}>
            unlogged
        </div>
    )

};
