import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Index from "../components/Layout/Index";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import UserRouter from "./UserRouter";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Index />}></Route>
        <Route path="/User/*" element={<UserRouter />}></Route>
      </Routes>
      <Footer />
    </>
  );
};

export default App;
