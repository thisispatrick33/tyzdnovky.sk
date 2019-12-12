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
    const [offer, setOffer] = useState(null);
    const [offers, setOffers] = useState([]);
    const [additional, setAdditional] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
            config.headers['X-localization'] = "SK";
            let { appState, offers, branches} = localStorage;
            if(appState ? JSON.parse(appState).isLoggedIn : false){
                setAuthState(JSON.parse(appState));
                JSON.parse(appState).user.active === 0 ? _additional() : null;
                navigate(`/home`);
                config.headers['Authorization'] =  'Bearer '+JSON.parse(appState).user.auth_token;
                (offers === undefined || JSON.parse(offers).length !== _getData('/api/size-offers')) ? _getOffers() : setOffers(JSON.parse(offers));
            }
            if(branches === undefined || JSON.parse(branches).length !== _getData('/api/size-branches')){
                _getData('/api/branches').then(({data}) => {localStorage["branches"] = JSON.stringify(data)});
            }
    },[offers]);

    const _disableForm = control => {
        $("#authentication-form .submit-button")
            .prop("disabled", control)
            .html(`<span className={"sr-only"}>${control ? `Loading...` : `Submit`}</span>`);
    };

    const _postData = async (url, data) => await axios.post(url, data, config);

    const _getData = async url => await axios.get(url, config);

    const _deleteData = async url => await axios.delete(url, config);


    const _authentication = (data, control) => {
        _disableForm(true);
        _postData((control ? '/api/login' : '/api/register'), data)
            .then((response) => {
                const { data } = response.data;
                setMessages(data.messages);
                if (response.data.success) {
                    let userData = {isLoggedIn : true, user : data};
                    navigate('/home');
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
        navigate(`/`);
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
                    "X-localization" : 'SK',
                    "Authorization" : 'Bearer '+JSON.parse(localStorage.appState).user.auth_token
                }
            })
            .then(response =>{
                console.log(response);
                if(response.data.success){
                    let appState = {
                        isLoggedIn: true,
                        user: response.data.data
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

    const _additional = async () => _getData('/api/register-additional').then(({data}) => setAdditional(data));

    const _createOffer = data => _postData(`/api/advertisement`, data).then((response)=> {if(response.data.success){setOffers({...offers.push( data)})}}).then(()=>{return(true)});

    const _updateOffer = data => axios.put(`/api/advertisement`, data ,config).then((response)=> {if(response.data.success){setOffers({...offers.push( data)})}}).then(()=>{return(true)});

    const _viewOffer = async id => _getData('api/advertisement/'+id).then(({data}) => setOffer(data));

    const _closeOffer = async () =>  setOffer(null);

    const _getOffers = async () => _getData('api/advertisement').then(({data}) => { setOffers(data); localStorage["offers"] = JSON.stringify(data) });

    const _deleteOffer = async id => _deleteData('api/advertisement/'+id);



    return (
            <Router>
                <Authentication path={`/`} authenticate={_authentication} forgotten={_forgottenPassword} message={messages}/>
                <PasswordReset path={'/reset-password'} reset={_resetPassword}/>
                <Home path={`/home`}
                      viewOffer={_viewOffer}
                      createOffer={_createOffer}
                      updateOffer={_updateOffer}
                      closeOffer={_closeOffer}
                      user={authState.user}
                      offers={offers}
                      offer={offer}
                      additional={additional}
                      updateProfile={_updateProfile}
                      signOut={_logoutUser}
                      clearOffer={()=>setOffer(null)}
                />
            </Router>
    );

};

if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}
