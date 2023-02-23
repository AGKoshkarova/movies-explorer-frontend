import { Outlet, useLocation } from 'react-router-dom';
import React from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export function BasicLayout(props) {

    function handleHeader() {
        props.onNavOpen(props);
    }

    return (
        <>
            <Header onNavigation={handleHeader} isLoggedIn={props.isLoggedIn} isLoading={props.isLoading}/>
            <Outlet />
            <Footer />
        </>
    )
};

export function AuthLayout() {
    return <Outlet />
};

