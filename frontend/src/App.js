import React from 'react';
import { useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Index from './components/Layout/Index';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import UserRouter from './routers/UserRouter';


const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path='/' element={<Index />}></Route>
                    <Route path='/User/*' element={<UserRouter/>}></Route>
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
};

export default App;