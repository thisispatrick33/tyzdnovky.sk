import React from 'react';

export const AdvertisementLookup = ({id, title, description, address, date, created_at, view = f => f}) => {
    const today = new Date();
    return(
        <div className="work-option row justify-content-center col-12 p-0 mx-3 mb-5">
            <div className="content shadow p-0 col-10">
                <div className="work-option-image-wrapper">
                    <img className="work-option-image" src="./images/poster.jpg"/>
                    <svg className="work-option-save" width="13.135" height="15.526" viewBox="0 0 13.135 15.526"><g transform="translate(-33.261)"><path d="M46.2.513a1.157,1.157,0,0,0-.539-.421A1.136,1.136,0,0,0,45.206,0H34.451A1.136,1.136,0,0,0,34,.092a1.156,1.156,0,0,0-.539.421,1.089,1.089,0,0,0-.2.636V14.377a1.09,1.09,0,0,0,.2.636,1.156,1.156,0,0,0,.539.421,1.135,1.135,0,0,0,.451.092,1.224,1.224,0,0,0,.852-.339l4.526-4.351,4.526,4.351a1.221,1.221,0,0,0,.852.328,1.194,1.194,0,0,0,.99-.5,1.088,1.088,0,0,0,.2-.636V1.149A1.089,1.089,0,0,0,46.2.513ZM45.083,14.059,40.742,9.892l-.913-.872-.913.872-4.341,4.166V1.314H45.083V14.059Z" fill="#fff"/></g></svg>
                    <svg className="work-option-edit" width="16" height="16" viewBox="0 0 16 16"><g transform="translate(-0.063 0.001)"><path d="M.572,16a.509.509,0,0,1-.493-.632l.955-3.834a.51.51,0,0,1,.134-.237L11.92.545a1.868,1.868,0,0,1,2.638,0l.959.959a1.868,1.868,0,0,1,0,2.638L4.765,14.895a.505.505,0,0,1-.237.134l-3.834.955A.47.47,0,0,1,.572,16Zm1.415-4.083L1.27,14.791l2.875-.716L14.8,3.422a.85.85,0,0,0,0-1.2l-.959-.959a.849.849,0,0,0-1.2,0Zm2.419,2.619h0Zm0,0" transform="translate(0)" fill="#fff"/><path d="M319.56,68.392a.505.505,0,0,1-.36-.149l-2.879-2.878a.509.509,0,0,1,.72-.72l2.879,2.879a.508.508,0,0,1-.36.868Zm0,0" transform="translate(-306.057 -62.446)" fill="#fff"/><path d="M33.481,354.451a.5.5,0,0,1-.36-.149l-2.879-2.879a.509.509,0,0,1,.72-.72l2.879,2.879a.509.509,0,0,1-.36.869Zm0,0" transform="translate(-29.076 -339.408)" fill="#fff"/></g></svg>
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
                        <a onClick={() => view(id)}>... Zisti viac.</a>
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
};
