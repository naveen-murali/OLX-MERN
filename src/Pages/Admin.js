import React from 'react'

import NavBar from '../AdminComponets/NavBar';
import Body from '../AdminComponets/Body';
import ViewEdit from '../AdminComponets/ViewEdit';
import { Route, Routes } from 'react-router-dom';

const Admin = () => {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<Body />} />
                <Route path="viewAndEdit/:id/:state" element={<ViewEdit />} />
            </Routes>
        </>
    )
}

export default Admin;
