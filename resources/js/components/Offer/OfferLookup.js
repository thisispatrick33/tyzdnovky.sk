import React from 'react';

export const OfferLookup = ({id, title, description, address, date, created_at, view = f => f, edit = f => f }) => {
    const today = new Date();
    const formatDate = new Date(date);
    return (
        <div className="work-option row justify-content-center col-12 p-0 ml-1 mb-5">
            <div className="content shadow p-0 col-10 mb-5">
                <div className="work-option-image-wrapper">
                    <img className="work-option-image" src="./images/poster.jpg"/>
                    <svg className="work-option-save" width="13.135" height="15.526" viewBox="0 0 13.135 15.526"><g transform="translate(-33.261)"><path d="M46.2.513a1.157,1.157,0,0,0-.539-.421A1.136,1.136,0,0,0,45.206,0H34.451A1.136,1.136,0,0,0,34,.092a1.156,1.156,0,0,0-.539.421,1.089,1.089,0,0,0-.2.636V14.377a1.09,1.09,0,0,0,.2.636,1.156,1.156,0,0,0,.539.421,1.135,1.135,0,0,0,.451.092,1.224,1.224,0,0,0,.852-.339l4.526-4.351,4.526,4.351a1.221,1.221,0,0,0,.852.328,1.194,1.194,0,0,0,.99-.5,1.088,1.088,0,0,0,.2-.636V1.149A1.089,1.089,0,0,0,46.2.513ZM45.083,14.059,40.742,9.892l-.913-.872-.913.872-4.341,4.166V1.314H45.083V14.059Z" fill="#fff"/></g></svg>
                    <svg onClick={() => edit(id)} className="work-option-edit" width="16" height="16" viewBox="0 0 16 16"><g transform="translate(-0.063 0.001)"><path d="M.572,16a.509.509,0,0,1-.493-.632l.955-3.834a.51.51,0,0,1,.134-.237L11.92.545a1.868,1.868,0,0,1,2.638,0l.959.959a1.868,1.868,0,0,1,0,2.638L4.765,14.895a.505.505,0,0,1-.237.134l-3.834.955A.47.47,0,0,1,.572,16Zm1.415-4.083L1.27,14.791l2.875-.716L14.8,3.422a.85.85,0,0,0,0-1.2l-.959-.959a.849.849,0,0,0-1.2,0Zm2.419,2.619h0Zm0,0" transform="translate(0)" fill="#fff"/><path d="M319.56,68.392a.505.505,0,0,1-.36-.149l-2.879-2.878a.509.509,0,0,1,.72-.72l2.879,2.879a.508.508,0,0,1-.36.868Zm0,0" transform="translate(-306.057 -62.446)" fill="#fff"/><path d="M33.481,354.451a.5.5,0,0,1-.36-.149l-2.879-2.879a.509.509,0,0,1,.72-.72l2.879,2.879a.509.509,0,0,1-.36.869Zm0,0" transform="translate(-29.076 -339.408)" fill="#fff"/></g></svg>
                </div>
                <div className="work-option-content row m-0 justify-content-center">
                    {
                        ((today.getTime() - (new Date(created_at.substring(0, created_at.indexOf('T'))).getTime()))/ (1000 * 3600 * 24)) <=3 ? <div className="text-center work-option-new"> NEW!</div> : null
                    }
                    <h5 className="col-11 p-0 work-option-title text-center mt-4 mb-2 text-uppercase">{title}</h5>
                    <p className="work-option-description col-11 text-center">
                        {description.substring(0, 74)}
                        <a className="colorful-text" onClick={() => view(id)}>... Zisti viac.</a>
                    </p>
                    <div className="col-11 mx-0 row work-option-info text-uppercase mb-3 justify-content-center">
                        <div className=" col-sm-6 col-10 row m-0 p-0 justify-content-center align-items-center">
                            <div className="col-3 p-0 pr-2 pr-md-0 text-right">
                                <svg className={` px-0 m-0 text-right`} xmlns="http://www.w3.org/2000/svg" width="13.512" height="19.292" viewBox="0 0 13.512 19.292"><path d="M23.023,12a2.466,2.466,0,1,0,2.466,2.466A2.469,2.469,0,0,0,23.023,12Zm0,4.228a1.762,1.762,0,1,1,1.762-1.762A1.764,1.764,0,0,1,23.023,16.228Z" transform="translate(-16.204 -7.772)" fill="#00c7c7"/><path d="M19.737,1.979a6.756,6.756,0,0,0-9.555,0,7.7,7.7,0,0,0-.636,9.5l5.413,7.817,5.405-7.806A7.7,7.7,0,0,0,19.737,1.979Zm.056,9.095-4.834,6.98-4.841-6.991a6.953,6.953,0,0,1,.562-8.586,6.052,6.052,0,0,1,8.558,0A6.956,6.956,0,0,1,19.793,11.074Z" transform="translate(-8.203 0)" fill="#00c7c7"/></svg>
                            </div>
                            <p className={`col-9 py-0 m-0 px-0 pl-3 pl-md-0  text-left text-md-center`}>{address}</p>
                        </div>
                        <div className=" col-sm-6 col-10 row m-0 p-0 justify-content-center align-items-center pl-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18.298" height="19.215"
                                         viewBox="0 0 18.298 19.215" className={`col-3 px-0 m-0`} fill={'#00c7c7'}>
                                        <path
                                              d="M13.534,1.848A1.61,1.61,0,0,0,11.988.5a.327.327,0,0,0-.315.337.327.327,0,0,0,.315.337.982.982,0,0,1,.946,1.011A.982.982,0,0,1,11.988,3.2a.338.338,0,0,0,0,.674,1.61,1.61,0,0,0,1.546-1.348h4.133V5.557H.631V2.523H5.994a.338.338,0,0,0,0-.674H5.421a.951.951,0,0,1,.888-.674.982.982,0,0,1,.946,1.011A.982.982,0,0,1,6.31,3.2a.338.338,0,0,0,0,.674A1.636,1.636,0,0,0,7.887,2.186,1.636,1.636,0,0,0,6.31.5,1.61,1.61,0,0,0,4.764,1.848H0V19.715H18.3V1.848Zm4.133,17.193H.631V6.231H17.667Z"
                                              transform="translate(0 -0.5)"/>
                                        <path
                                              d="M25.343,1.186a1.029,1.029,0,1,1,0,2.059.343.343,0,1,0,0,.686,1.716,1.716,0,1,0,0-3.432.343.343,0,1,0,0,.686Z"
                                              transform="translate(-17.193 -0.5)"/>
                                        <path
                                              d="M31.343,1.186a1.029,1.029,0,1,1,0,2.059.343.343,0,1,0,0,.686,1.716,1.716,0,1,0,0-3.432.343.343,0,1,0,0,.686Z"
                                              transform="translate(-21.319 -0.5)"/>
                                        <ellipse  cx="0.343" cy="0.343" rx="0.343" ry="0.343"
                                                 transform="translate(6.604 7.748)"/>
                                        <ellipse  cx="0.343" cy="0.343" rx="0.343" ry="0.343"
                                                 transform="translate(8.806 7.748)"/>
                                        <ellipse  cx="0.343" cy="0.343" rx="0.343" ry="0.343"
                                                 transform="translate(11.007 7.748)"/>
                                        <ellipse  cx="0.343" cy="0.343" rx="0.343" ry="0.343"
                                                 transform="translate(13.209 7.748)"/>
                                        <ellipse  cx="0.343" cy="0.343" rx="0.343" ry="0.343"
                                                 transform="translate(15.209 7.748)"/>
                                        <ellipse  cx="0.343" cy="0.343" rx="0.343" ry="0.343"
                                                 transform="translate(2.402 10.444)"/>
                                        <ellipse  cx="0.343" cy="0.343" rx="0.343" ry="0.343"
                                                 transform="translate(4.403 10.444)"/>
                                        <ellipse  cx="0.343" cy="0.343" rx="0.343" ry="0.343"
                                                 transform="translate(6.604 10.444)"/>
                                        <ellipse  cx="0.343" cy="0.343" rx="0.343" ry="0.343"
                                                 transform="translate(8.806 10.444)"/>
                                        <ellipse  cx="0.343" cy="0.343" rx="0.343" ry="0.343"
                                                 transform="translate(11.007 10.444)"/>
                                        <ellipse  cx="0.343" cy="0.343" rx="0.343" ry="0.343"
                                                 transform="translate(13.209 10.444)"/>
                                        <ellipse  cx="0.343" cy="0.343" rx="0.343" ry="0.343"
                                                 transform="translate(15.209 10.444)"/>
                                        <ellipse  cx="0.343" cy="0.343" rx="0.343" ry="0.343"
                                                 transform="translate(2.402 12.802)"/>
                                        <ellipse  cx="0.343" cy="0.343" rx="0.343" ry="0.343"
                                                 transform="translate(4.403 12.802)"/>
                                        <ellipse  cx="0.343" cy="0.343" rx="0.343" ry="0.343"
                                                 transform="translate(6.604 12.802)"/>
                                        <ellipse  cx="0.343" cy="0.343" rx="0.343" ry="0.343"
                                                 transform="translate(8.806 12.802)"/>
                                        <ellipse  cx="0.343" cy="0.343" rx="0.343" ry="0.343"
                                                 transform="translate(11.007 12.802)"/>
                                        <ellipse  cx="0.343" cy="0.343" rx="0.343" ry="0.343"
                                                 transform="translate(13.209 12.802)"/>
                                        <ellipse  cx="0.343" cy="0.343" rx="0.343" ry="0.343"
                                                 transform="translate(15.209 12.802)"/>
                                        <ellipse  cx="0.343" cy="0.343" rx="0.343" ry="0.343"
                                                 transform="translate(2.402 15.441)"/>
                                        <ellipse  cx="0.343" cy="0.343" rx="0.343" ry="0.343"
                                                 transform="translate(4.403 15.441)"/>
                                        <ellipse  cx="0.343" cy="0.343" rx="0.343" ry="0.343"
                                                 transform="translate(6.604 15.441)"/>
                                        <ellipse  cx="0.343" cy="0.343" rx="0.343" ry="0.343"
                                                 transform="translate(8.806 15.441)"/>
                                        <ellipse  cx="0.343" cy="0.343" rx="0.343" ry="0.343"
                                                 transform="translate(11.007 15.441)"/>
                                    </svg>
                            <p className={`col-9 py-0 pl-2 m-0 pr-0`}>{formatDate.getDay()+"."+formatDate.getMonth()+"."+formatDate.getFullYear()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
