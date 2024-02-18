import React from 'react';
import { Content, Theme } from '@carbon/react';
import { Route, Routes } from 'react-router-dom'; 
import { useSelector, useDispatch } from 'react-redux';
import MastHead from './components/Header';
import Home from './content/home/Home.js';
import Test from './content/test/Test.js';
import Masters from './content/masters/Masters.js';
import LoginScreen from './content/login_screen/LoginScreen.js';
import RequestCreds from './content/request_creds/RequestCreds.js';

function App() {
  const theme = useSelector(state => state.theme); // Access theme from Redux store
  const dispatch = useDispatch();

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' }); // Dispatch action to toggle theme
  };

  return (
    <>
      <Theme theme={theme}>
        <MastHead onThemeToggle={toggleTheme} currentTheme={theme}/>
        <Content>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mas" element={<Masters />} />
            <Route path="/test" element={<Test />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/request-credentials" element={<RequestCreds />} />
          </Routes>
        </Content>
      </Theme>
    </>
  );
}

export default App;
