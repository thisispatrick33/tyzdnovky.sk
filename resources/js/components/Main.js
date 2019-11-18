import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import $ from "jquery";

import {Router, navigate} from '@reach/router';
import { Authentication } from './Forms/Authentication';
import axios from "axios";
import {Home} from "./Logged/Home";
import {PasswordReset} from "./Forms/PasswordReset";



const Main = () => {
    const [authState, setAuthState] = useState({isLoggedIn : false, user : {}});
    const [location, setLocation] = useState(``);
    const [message, setMessage] = useState(``);


    const _loginUser = (data) => {
        let message = ``;
        $("#login-form .sign-in-button")
            .attr("disabled", "disabled")
            .html(
                '<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i><span class="sr-only">Loading...</span>'
            );
        axios
            .post("/api/login", data, {
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
                setMessage(json.data.messages);
                if (json.data.success) {
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
                            username: json.data.data.username,
                            profile_pic: json.data.data.profile_pic,
                            timestamp: new Date().toString()
                        };
                    }
                    else if(json.data.data.type === `business`){
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
                            username: json.data.data.username,
                            profile_pic: json.data.data.profile_pic,
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
                            type: json.data.data.type,
                            username: json.data.data.username,
                            profile_pic: json.data.data.profile_pic,
                            timestamp: new Date().toString()
                        };
                    }
                    else if(json.data.data.type === `business`){
                        userData = {
                            active: json.data.data.active,
                            auth_token: json.data.data.auth_token,
                            bussinesId: json.data.data.bussinesId,
                            email: json.data.data.email,
                            id: json.data.data.id,
                            name: json.data.data.name,
                            phone: json.data.data.phone,
                            type: json.data.data.type,
                            username: json.data.data.username,
                            profile_pic: json.data.data.profile_pic,
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
        let formData = new FormData();

        formData.append(`email`, data.email);
        formData.append(`name`, data.name);
        formData.append(`phone`, data.phone);
        formData.append(`username`, '@'+data.username);

        if(data.lastName!==undefined){
            for (let i = 0; i < data.languages.length; i++) {
                formData.append('languages[]', data.languages[i]);
            }
            for (let i = 0; i < data.categories.length; i++) {
                formData.append(`categories[]`, data.categories[i]);
            }
            formData.append(`lastName`, data.lastName);
            formData.set(`drivingLicense`, data.drivingLicense);
        }
        else {
            formData.append(`ico`, data.ico);
        }


        if(data.profile_pic===null){
            formData.append(`profile_pic`, data.profile_pic);
        }
        else{
            formData.append(`profile_pic`, data.profile_pic[0]);
        }



        axios
            .post(`/api/register-additional`, formData,{
                headers : {
                    'Content-Type' : `multipart/form-data`,
                    'Accept' : `multipart/form-data`,
                    "X-localization" : location,
                    "Authorization" : 'Bearer '+JSON.parse(localStorage.appState).user.auth_token
                }
            })
            .then((response) => {
                console.log(response);
                return response;
            })
            .then(response =>{
                console.log(response);
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
                            username: response.data.data.username,
                            profile_pic: response.data.data.profile_pic,
                            timestamp: new Date().toString()
                        };
                    }
                    else if(response.data.data.type === `business`){
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
                            username: response.data.data.username,
                            profile_pic: response.data.data.profile_pic,
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
            .catch((e)=>{
                console.log(e);
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

                <Authentication path={`/`} login={_loginUser} register={_submitRegistration} reset={_reset} message={message}/>
                <Home path={`/home`} edit={_edit}/>
                <PasswordReset path={'/reset-password'} reset={_resetPassword}/>
            </Router>

    )

};

if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}
