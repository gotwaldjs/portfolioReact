import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Content, Theme } from '@carbon/react';
import { Routes, Route, Navigate } from 'react-router-dom'; 
import MastHead from './components/Header';
import Home from './content/home/Home';
import Test from './content/test/Test';
import Masters from './content/masters/Masters';
import LoginScreen from './content/login_screen/LoginScreen';
import RequestCreds from './content/request_creds/RequestCreds';

function App() {
  const theme = useSelector(state => state.theme); // Access theme from Redux store
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated); // Example: Adjust according to your Redux state
  const dispatch = useDispatch();
  // Example function to toggle the theme
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
            <Route path="/mas" element={
              isAuthenticated ? <Masters /> : <Navigate to="/login" replace />
            } />
            <Route path="/test"  element={
              isAuthenticated ? <Test /> : <Navigate to="/login" replace />
            } />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/request-credentials" element={<RequestCreds />} />
          </Routes>
        </Content>
      </Theme>
    </>
  );
}

export default App;
