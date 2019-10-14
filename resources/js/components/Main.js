import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import $ from "jquery";

import { Router } from '@reach/router';
import { Register } from './Forms/Register';
import { Login } from './Forms/Login';
import axios from "axios";



const Main = () => {
    const [authState, setAuthState] = useState({isLoggedIn : false, user : {}});
    const [location, setLocation] = useState(``);

    const _loginUser = (data) => {
        _ipLocation();
        $("#login-form button")
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

                    let userData = {
                        name: json.data.data.name,
                        id: json.data.data.id,
                        email: json.data.data.email,
                        auth_token: json.data.data.auth_token,
                        timestamp: new Date().toString()
                    };
                    let appState = {
                        isLoggedIn: true,
                        user: userData
                    };

                    localStorage["appState"] = JSON.stringify(appState);

                    setAuthState({isLoggedIn: appState.isLoggedIn, user: appState.user});
                }else {
                    alert("Login Failed!");
                }

                $("#login-form button")
                    .removeAttr("disabled")
                    .html("Login");

            })
            .catch(error => {
                alert(`An Error Occured! ${error}`);
                $("#login-form button")
                    .removeAttr("disabled")
                    .html("Login");
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
        _ipLocation();


        axios
            .post(`/api/register`, data ,{
                headers : {
                    'Content-Type' : `application/json`,
                    "X-localization" : location,
                }
            })
            .then((response) => {

                console.log(response);

            })
            .then(json => {
                if (json.data.success) {
                    alert(`Registration Successful!`);

                    let userData = {
                        name: json.data.data.name,
                        id: json.data.data.id,
                        email: json.data.data.email,
                        auth_token: json.data.data.auth_token,
                        timestamp: new Date().toString()
                    };
                    let appState = {
                        isLoggedIn: true,
                        user: userData
                    };
                    localStorage["appState"] = JSON.stringify(appState);

                    setAuthState({isLoggedIn: appState.isLoggedIn, user: appState.user});
                }else {
                    alert(`Registration Failed!`);
                }
            }).catch(error => {
                alert("An Error Occured!" + error);
                console.log(`${formData} ${error}`);
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
            <Router>
                <Register path={`/`} register={_submitRegistration}/>
                <Login path={`/login`} login={_loginUser}/>
            </Router>

    )

};

if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}
