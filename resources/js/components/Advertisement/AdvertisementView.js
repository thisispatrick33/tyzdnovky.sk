import React from 'react';

export const AdvertisementView = ({ad, close}) => {
    const date = new Date(ad.date);
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
                                    <svg  onClick={close} className="ml-3" style={{transform:"scale(.8)"}} width="42" height="42" viewBox="0 0 42 42"><path d="M42,2.467,23.467,21,42,39.534,39.533,42,21,23.468,2.467,42,0,39.534,18.533,21,0,2.467,2.467,0,21,18.534,39.533,0Z" transform="translate(0 -0.001)" fill="#2c393f"/></svg>
                                </div>
                            </div>

                            <div className="row justify-content-center order-3 order-md-4">
                                <div className="col-md-8 order-4 order-m-3">
                                    <div className={"border-r pt-4 justify-content-center row "}>
                                        <div className="advertisement-info-tags row justify-content-center pb-5 col-11">
                                            {
                                                ad.tags.map( (value) => {
                                                    return <div className="advertisement-info-tag py-2 mx-3 mt-1 mb-2 px-4 shadow col-auto " ><span className="colorful-text">{value}</span></div>;
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
                                                {date.getDay()+"."+date.getMonth()+"."+date.getFullYear()}
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
