import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const Root = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<h1>Home</h1>}></Route>
        <Route path="/shop" element={<h1>Shop</h1>}></Route>
        <Route path="/" element={<Navigate to={'/home'} />}></Route>
        <Route path="*" element={<h1>Not Found</h1>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Root;
