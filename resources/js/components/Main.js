import React from 'react';
import ReactDOM from 'react-dom';

import { Router } from '@reach/router';
import { RegistrationForm } from './Forms/RegistrationForm';



const Main = () => {
    return (
            <Router>
                <RegistrationForm path={`/`}/>
            </Router>
    )

};

if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}
