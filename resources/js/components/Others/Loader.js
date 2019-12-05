import React from 'react';

export const Loader = () => {
    return (
        <div className={`loader-background d-flex align-items-center row m-0 p-0`}>
            <div className="col-12 row justify-content-center m-0 p-0">
                <div className={`col-xl-auto d-flex justify-content-center col-xl-auto col-lg-auto col-md-auto col-sm-12 col-12 p-0 m-3`}>
                    <div className="loader">
                        <svg viewBox="0 0 80 80">
                            <circle cx="40" cy="40" r="32"></circle>
                        </svg>
                    </div>
                </div>
                <div className={`col-xl-auto d-flex justify-content-center col-xl-auto col-lg-auto col-md-auto col-sm-12 col-12 p-0 m-3`}>
                    <div className="loader triangle d-flex justify-content-center">
                        <svg viewBox="0 0 86 80">
                            <polygon points="43 8 79 72 7 72"></polygon>
                        </svg>
                    </div>
                </div>
                <div className={`col-xl-auto d-flex justify-content-center col-xl-auto col-lg-auto col-md-auto col-sm-12 col-12 p-0 m-3`}>
                    <div className="loader d-flex justify-content-center">
                        <svg viewBox="0 0 80 80">
                            <rect x="8" y="8" width="64" height="64"></rect>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
};
