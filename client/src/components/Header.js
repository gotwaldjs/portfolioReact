import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Header, 
  HeaderMenu, 
  HeaderMenuButton, 
  HeaderName, 
  HeaderNavigation, 
  HeaderMenuItem, 
  SideNav, 
  SideNavItems, 
  HeaderSideNavItems,
  HeaderGlobalBar,
  HeaderGlobalAction 
  } from '@carbon/react';
import { LightFilled20, Light20, Logout20 } from '@carbon/icons-react';

function MastHead({ onThemeToggle, currentTheme }) {
  const [isSideNavExpanded, setIsSideNavExpanded] = useState(false);
  const isLoggedIn = useSelector(state => state.isLoggedIn); // Access isLoggedIn from Redux store
  const dispatch = useDispatch();
  const onClickSideNavExpand = () => {
    setIsSideNavExpanded(!isSideNavExpanded);
  }

  const handleThemeToggle = () => {
    onThemeToggle();
  };

  const handleLogout = async () => {
    try {
      // Make a request to the logout route on the server
      const response = await fetch('/logout', { method: 'GET' });
      if (response.ok) {
        // Dispatch the LOGOUT action to update the state in Redux
        dispatch({ type: 'LOGOUT' });
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <Header aria-label="JSG Designs">
      <HeaderMenuButton
        aria-label="Open menu"
        onClick={onClickSideNavExpand}
        isActive={isSideNavExpanded}
      />
      <HeaderName href="/" prefix="JSG">
        [Design and User Analysis]
      </HeaderName>
      <HeaderNavigation aria-label="JSG [Designs]">
        <HeaderMenuItem href="/test">About Me</HeaderMenuItem>
        <HeaderMenuItem href="#">Resume</HeaderMenuItem>
        <HeaderMenu aria-label="Consulting Roles" menuLinkName="Consulting Roles">
          <HeaderMenuItem href="#">UX Design</HeaderMenuItem>
          <HeaderMenuItem href="#">UI Design</HeaderMenuItem>
          <HeaderMenuItem href="#">Information Architecture</HeaderMenuItem>
          <HeaderMenuItem href="#">User Analysis</HeaderMenuItem>
        </HeaderMenu>
      </HeaderNavigation>
      <HeaderGlobalBar>
        {currentTheme === 'g100' ? (
          <HeaderGlobalAction aria-label="Light Mode Display Theme" tooltipAlignment="end" onClick={handleThemeToggle}>
            <Light20 />
          </HeaderGlobalAction>
        ) : (
          <HeaderGlobalAction aria-label="Dark Mode Display Theme" tooltipAlignment="end" onClick={handleThemeToggle}>
            <LightFilled20 />
          </HeaderGlobalAction>
        )}
        {isLoggedIn && (
          <HeaderGlobalAction 
            aria-label="Logout" 
            tooltipAlignment="end" 
            onClick={handleLogout}>
            <Logout20 />
          </HeaderGlobalAction>
        )}
      </HeaderGlobalBar>
      <SideNav
        aria-label="Side navigation"
        expanded={isSideNavExpanded}
        isPersistent={false}
      >
        <SideNavItems>
          <HeaderSideNavItems>
            <HeaderMenuItem href="#">About Me</HeaderMenuItem>
              <HeaderMenuItem href="#">Resume</HeaderMenuItem>
              <HeaderMenu aria-label="Consulting Roles" menuLinkName="Consulting Roles">
                <HeaderMenuItem href="#">UX Design</HeaderMenuItem>
                <HeaderMenuItem href="#">UI Design</HeaderMenuItem>
                <HeaderMenuItem href="#">Information Architecture</HeaderMenuItem>
                <HeaderMenuItem href="#">User Analysis</HeaderMenuItem>
              </HeaderMenu>
          </HeaderSideNavItems>
        </SideNavItems>
      </SideNav>
    </Header>
  );
}

export default MastHead;
