import React from 'react';
import ReactDOM from 'react-dom';
import $ from "jquery";

import { Router } from '@reach/router';
import { Register } from './Forms/Register';
import { Login } from './Forms/Login';
import axios from "axios";
import {Home} from "./Logged/Home";



const Main = () => {
    const _submitRegistration = (data) => {
        axios
            .post(`/api/register`, data ,{
                headers : {
                    'Content-Type' : `application/json`,
                }
            })
            .then((response) => {

                console.log(response);

            })
        .catch((error) => {
            console.log(error)
        });
    };
    const _submitLogin = (data) => {
        axios
            .post(`/api/login`, data ,{
                headers : {
                    'Content-Type' : `application/json`,
                }
            })
            .then((response) => {

                console.log(response);

            })
    }

    const _ipLocation = () => {
        $.ajax('http://ip-api.com/json')
            .then(
                function success(response) {
                    console.log(response.countryCode);
                    getAdress(response.lat, response.lon)
                },

                function fail(data, status) {
                    console.log('Request failed.  Returned status of',
                        status);
                }
            );
    }

    return (
            <Router>
                <Register path={`/`} register={_submitRegistration}/>
                <Login path={`/login`} login={_submitLogin}/>
                <Home path={`/home`} login={_submitLogin}/>
            </Router>

    )

};

if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}
