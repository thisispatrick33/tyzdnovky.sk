import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import $ from "jquery";

import { Router } from '@reach/router';
import { Register } from './Forms/Register';
import { Login } from './Forms/Login';
import axios from "axios";
import {Home} from "./Logged/Home";



const Main = () => {
    const [authState, setAuthState] = useState({isLoggedIn : false, user : {}});
    const [location, setLocation] = useState(``);


    const _loginUser = (data) => {
        console.log(data);
        $("#login-form .sign-in-button")
            .attr("disabled", "disabled")
            .html(
                '<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i><span class="sr-only">Loading...</span>'
            );
        axios
            .post("/api/login/", data, {
                headers : {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "X-localization" : location,
                }
            })
            .then(response => {
                console.log(response);
                return response;
            })
            .then(json => {
                if (json.data.success) {
                    alert("Login Successful!");
                    let userData = {};
                    if (json.data.data.type === "user") {
                        userData = {
                            active: json.data.data.active,
                            auth_token: json.data.data.auth_token,
                            drivingLicense: json.data.data.drivingLicense,
                            email: json.data.data.email,
                            id: json.data.data.id,
                            lastName: json.data.data.lastName,
                            name: json.data.data.name,
                            phone: json.data.data.phone,
                            ready: json.data.data.ready,
                            type: json.data.data.type,
                            timestamp: new Date().toString()
                        };
                    }
                    else if(json.data.data.type === "company"){
                        userData = {
                            active: json.data.data.active,
                            auth_token: json.data.data.auth_token,
                            bussinesId: json.data.data.bussinesId,
                            email: json.data.data.email,
                            id: json.data.data.id,
                            name: json.data.data.name,
                            phone: json.data.data.phone,
                            ready: json.data.data.ready,
                            type: json.data.data.type,
                            timestamp: new Date().toString()
                        };
                    }
                    let appState = {
                        isLoggedIn: true,
                        user: userData
                    };

                    localStorage["appState"] = JSON.stringify(appState);

                    setAuthState({isLoggedIn: appState.isLoggedIn, user: appState.user});
                }else {
                    alert("Login Failed!");
                }

                $("#login-form .sign-in-button")
                    .removeAttr("disabled")
                    .html( '<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i><span class="sr-only">sign in</span>')

            })
            .catch(error => {
                $("#login-form .sign-in-button")
                    .removeAttr("disabled")
                    .html( '<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i><span class="sr-only">sign in</span>')
            });
    };

    const _logoutUser = () => {
        let appState = {
            isLoggedIn: false,
            user: {}
        };
        localStorage["appState"] = JSON.stringify(appState);

        setAuthState({isLoggedIn: appState.isLoggedIn, user: appState.user});
    };

    const _submitRegistration = (data) => {
        console.log(data);
        $("#login-form .sign-up-button")
            .attr("disabled", "disabled")
            .html(
                '<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i><span class="sr-only">Loading...</span>'
            );
        axios
            .post(`/api/register`, data ,{
                headers : {
                    'Content-Type' : `application/json`,
                    "X-localization" : location,
                }
            })
            .then((response) => {
                console.log(response);
                return response;
            })
            .then(json => {
                if (json.data.success) {
                    alert(`Registration Successful!`);
                    let userData = {};
                    if (json.data.data.type === "user") {
                        userData = {
                            active: json.data.data.active,
                            auth_token: json.data.data.auth_token,
                            drivingLicense: json.data.data.drivingLicense,
                            email: json.data.data.email,
                            id: json.data.data.id,
                            lastName: json.data.data.lastName,
                            name: json.data.data.name,
                            phone: json.data.data.phone,
                            ready: json.data.data.ready,
                            type: json.data.data.type,
                            timestamp: new Date().toString()
                        };
                    }
                    else if(json.data.data.type === "company"){
                        userData = {
                            active: json.data.data.active,
                            auth_token: json.data.data.auth_token,
                            bussinesId: json.data.data.bussinesId,
                            email: json.data.data.email,
                            id: json.data.data.id,
                            name: json.data.data.name,
                            phone: json.data.data.phone,
                            ready: json.data.data.ready,
                            type: json.data.data.type,
                            timestamp: new Date().toString()
                        };
                    }
                    let appState = {
                        isLoggedIn: true,
                        user: userData
                    };
                    localStorage["appState"] = JSON.stringify(appState);

                    setAuthState({isLoggedIn: appState.isLoggedIn, user: appState.user});
                }else {
                    alert(`Registration Failed!`);

                }
                $("#login-form .sign-up-button")
                    .removeAttr("disabled", "disabled")
                    .html(
                        '<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i><span class="sr-only">sign up</span>'
                    );
            }).catch(error => {
                $("#login-form .sign-up-button")
                    .removeAttr("disabled", "disabled")
                    .html(
                        '<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i><span class="sr-only">sign up</span>'
                    );
        });


    };


    const _ipLocation = () => {
        $.ajax('http://ip-api.com/json')
            .then(
                function success(response) {
                    setLocation(response.countryCode);
                },

                function fail(data, status) {
                    console.log('Request failed.  Returned status of',
                        status);
                }
            );
    };

    return (
            _ipLocation(),
            <Router>
                <Login path={`/`} login={_loginUser} register={_submitRegistration}/>
                <Home path={`/home`}/>
            </Router>

    )

};

if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}
