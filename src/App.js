import React from 'react';
import { Content, Theme } from '@carbon/react';
import { Route, Routes } from 'react-router-dom'; 
import MastHead from './components/Header'; // Update the path based on the actual location of the Header component
import Home from './content/home/Home.js'; // Update the path based on the actual location of the Home component
import Masters from './content/masters/Masters.js'; 

function App() {
  return (
    <>
      <Theme theme="g100">
        <MastHead />
        <Content>
          <Routes> 
            <Route path="/" element={<Home />} /> 
            <Route path="/mas" element={<Masters />} /> 
          </Routes>
        </Content>
      </Theme>
    </>
  );
}

export default App;
