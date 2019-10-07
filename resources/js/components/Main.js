import React from 'react';
import ReactDOM from 'react-dom';
import $ from "jquery";

import { Router } from '@reach/router';
import { RegistrationForm } from './Forms/RegistrationForm';
import axios from "axios";



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
        /*.catch((error) => {
            console.log(error)
        })*/
    };

    const _ipLocation = () => {
        $.ajax('http://ip-api.com/json')
            .then(
                function success(response) {
                    console.log('User\'s Location Data is ', response);
                    console.log('User\'s Country', response.country);
                    getAdress(response.lat, response.lon)
                },

                function fail(data, status) {
                    console.log('Request failed.  Returned status of',
                        status);
                }
            );
    }

    return (
        console.log(_ipLocation()),
            <Router>
                <RegistrationForm path={`/`} register={_submitRegistration}/>
            </Router>

    )

};

if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}
