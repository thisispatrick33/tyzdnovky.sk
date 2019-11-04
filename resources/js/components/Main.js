import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import $ from "jquery";

import {Router, navigate} from '@reach/router';
import { Authentication } from './Forms/Authentication';
import axios from "axios";
import {Home} from "./Logged/Home";
import {ForgottenPassword } from "./Forms/ForgottenPassword";
import {PasswordReset} from "./Forms/PasswordReset";



const Main = () => {
    const [authState, setAuthState] = useState({isLoggedIn : false, user : {}});
    const [location, setLocation] = useState(``);
    const [loginMessage, setLoginMessage] = useState(``);


    const _loginUser = (data) => {
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
            .then(  json => {
                setLoginMessage(json.data.messages);
                if (json.data.success) {
                    alert("Authentication Successful!");
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

                    console.log(appState);
                    navigate(`/home`, {state:{data:appState}});
                }else {
                    alert("Authentication Failed!");
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
        console.log("main");
        console.log(loginMessage);
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

                    navigate(`/home`, {state:{data:appState}});
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

    const _edit = (data) => {
        console.log("main");
        console.log(data);
        console.log();
        axios
            .post(`/api/register-additional`, data ,{
                headers : {
                    'Content-Type' : `application/json`,
                    "X-localization" : location,
                    "Authorization" : 'bearer'+JSON.parse(localStorage.appState).user.auth_token
                }
            })
            .then((response) => {
                console.log(response);
                return response;
            })
            .then(response =>{
                console.log(response.data.success);
                if(response.data.success){
                    let userData = {};
                    if (response.data.data.type === "user") {
                        userData = {
                            active: response.data.data.active,
                            auth_token: response.data.data.auth_token,
                            drivingLicense: response.data.data.drivingLicense,
                            email: response.data.data.email,
                            id: response.data.data.id,
                            lastName: response.data.data.lastName,
                            name: response.data.data.name,
                            phone: response.data.data.phone,
                            ready: response.data.data.ready,
                            type: response.data.data.type,
                            timestamp: new Date().toString()
                        };
                    }
                    else if(response.data.data.type === "company"){
                        userData = {
                            active: response.data.data.active,
                            auth_token: response.data.data.auth_token,
                            bussinesId: response.data.data.bussinesId,
                            email: response.data.data.email,
                            id: response.data.data.id,
                            name: response.data.data.name,
                            phone: response.data.data.phone,
                            ready: response.data.data.ready,
                            type: response.data.data.type,
                            timestamp: new Date().toString()
                        };
                    }
                    let appState = {
                        isLoggedIn: true,
                        user: userData
                    };
                    localStorage["appState"] = JSON.stringify(appState);

                    setAuthState({isLoggedIn: appState.isLoggedIn, user: appState.user});

                    navigate(`/home`, {state:{data:appState}});
                }
            })
    };

    const _reset = (login) =>{
        axios
            .post(`/api/password-reset-mail`, login ,{
                headers : {
                    'Content-Type' : `application/json`,
                    "X-localization" : location,
                }
            })
            .then((response) => {
                console.log(response);
                return response;
            });
        console.log(login);
    };

    const _resetPassword =(data)=>{
        console.log(data);

        axios
          .post(`/api/password-reset`, data ,{
            headers : {
              'Content-Type' : `application/json`,
            "X-localization" : location,
         }
         })
         .then((response) => {
           console.log(response);
         return response;
        })

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
                <Authentication path={`/`} login={_loginUser} register={_submitRegistration} reset={_reset} loginMessage={loginMessage}/>
                <Home path={`/home`} edit={_edit}/>
                <PasswordReset path={'/reset-password'} reset={_resetPassword}/>
            </Router>

    )

};

if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}
