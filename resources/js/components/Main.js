import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import $ from "jquery";
import axios from "axios";

import { Router, navigate } from '@reach/router';
import { Authentication } from './Authentication/Authentication';
import { Home } from "./Logged/Home";
import { PasswordReset } from "./Authentication/PasswordReset";

const config = {
    headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
};

const Main = () => {

    const [authState, setAuthState] = useState({isLoggedIn : false, user : {}});
    const [ad, setAd] = useState(null);
    const [ads, setAds] = useState([]);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
            config.headers['X-localization'] = _getData('http://ip-api.com/json');
            let { appState, ads } = localStorage;
            if(JSON.parse(appState).isLoggedIn){
                setAuthState(JSON.parse(appState));
                navigate(`/home`);
                config.headers['Authorization'] =  'Bearer '+JSON.parse(appState).user.auth_token;
                (ads === undefined || JSON.parse(ads).length !== _getData('/api/size-ads')) ? _getAds().then(({data}) => { setAds(data); localStorage["ads"] = JSON.stringify(data) }) : setAds(JSON.parse(ads));
            }
    },[]);

    const _disableForm = control => {
        $("#authentication-form .submit-button")
            .prop("disabled", control)
            .html(`<span className={"sr-only"}>${control ? `Loading...` : `Submit`}</span>`);
    };

    const _postData = async (url, data) => await axios.post(url, data, config);

    const _getData = async url => await axios.get(url, config);


    const _authentication = (data, control) => {
        _disableForm(true);
        _postData((control ? '/api/login' : '/api/register'), data)
            .then((response) => {
                const { data } = response.data;
                setMessages(data.messages);
                if (response.data.success) {
                    let userData = {isLoggedIn : true, user : data};
                    setAuthState(userData);
                    localStorage["appState"] = JSON.stringify(userData);
                }
                _disableForm(false);
            })
            .catch(error => {
                _disableForm(false);
            });
    };

    const _logoutUser = () => {
        let appState = {
            isLoggedIn: false,
            user: {}
        };
        setAuthState(appState);
        localStorage["appState"] = JSON.stringify(appState);
    };

    const _forgottenPassword = email => _postData('/api/password-reset-mail', email);

    const _resetPassword = password => _postData('/api/password-reset', password);

    const _updateProfile = data => {
        let formData = new FormData();

        formData.append('email', data.email);
        formData.append('name', data.name);
        formData.append('phone', data.phone);
        formData.append('username', '@'+ data.username);

        if(data.type === 2){
            data.languages.map( language => formData.append('languages[]', language));
            data.categories.map( category => formData.append('categories[]', category));
            formData.append('lastName', data.lastName);
            formData.set('drivingLicense', data.drivingLicense);
        } else {
            formData.append('ico', data.ico);
        }

        formData.append('profile_pic', (data.profile_pic === null ? null : data.profile_pic[0]));



        axios
            .post('/api/register-additional', formData,{
                headers : {
                    'Content-Type' : 'multipart/form-data',
                    'Accept' : 'multipart/form-data',
                    "X-localization" : location,
                    "Authorization" : 'Bearer '+JSON.parse(localStorage.appState).user.auth_token
                }
            })
            .then(response =>{
                console.log(response);
                if(response.data.success){
                    let appState = {
                        isLoggedIn: true,
                        user: data
                    };
                    localStorage["appState"] = JSON.stringify(appState);
                    setAuthState(appState);
                    navigate(`/home`);
                }

            })
            .catch((e)=>{
                console.log(e);
            })
    };


    const _createAd = (data) => _postData(`/api/advertisement`, data);

    const _updateAd = (data) => axios.put(`/api/advertisement`, data ,config);

    const _viewAd = async id => _getData('api/advertisement/'+id).then(({data}) => setAd(data));

    const _closeAd = async () =>  setAd(null);

    const _getAds = async () => _getData('api/advertisement');



    return (
            <Router>
                <Authentication path={`/`} authenticate={_authentication} forgotten={_forgottenPassword} message={messages}/>
                <PasswordReset path={'/reset-password'} reset={_resetPassword}/>
                <Home path={`/home`} updateProfile={_updateProfile} viewAd={_viewAd} createAd={_createAd} updateAd={_updateAd} closeAd={_closeAd} user={authState.user} ads={ads} ad={ad} signOut={_logoutUser}/>
            </Router>
    );

};

if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}
