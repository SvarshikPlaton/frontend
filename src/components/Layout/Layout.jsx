import React from 'react';
import Header from '../App/Header/Header';
import Main from '../App/Main/Main';

export default function Layout({children}) {
    return (
        <>
            <Header />
            <Main>
                {children}
            </Main>
        </>
    )
}
