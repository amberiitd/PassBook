import React from 'react';
import { Route, Redirect } from "react-router-dom";
import defaultAuthService from '../service/Authentication.service';

const AuthGuardRoute = ({path, component}) => (
    <Route path={path} render={(props) => (
        defaultAuthService.isAuthenticated
            ? component
            : <Redirect to='/login' />
    )} />
)

export default AuthGuardRoute;