import React, { useState } from 'react';
import { Header, HeaderMenu, HeaderMenuButton, HeaderName, HeaderNavigation, HeaderMenuItem, SideNav, SideNavItems, HeaderSideNavItems } from '@carbon/react';

function MastHead() {
  const [isSideNavExpanded, setIsSideNavExpanded] = useState(false);

  const onClickSideNavExpand = () => {
    setIsSideNavExpanded(!isSideNavExpanded);
  }

  return (
    <Header aria-label="JSG Designs">
      <HeaderMenuButton
        aria-label="Open menu"
        onClick={onClickSideNavExpand}
        isActive={isSideNavExpanded}
      />
      <HeaderName href="#" prefix="JSG">
        [Designs]
      </HeaderName>
      <HeaderNavigation aria-label="JSG [Designs]">
        <HeaderMenuItem isActive href="#">
          Home
        </HeaderMenuItem>
        <HeaderMenuItem href="#">About Me</HeaderMenuItem>
        <HeaderMenuItem href="#">My CV</HeaderMenuItem>
        <HeaderMenu aria-label="Link 4" menuLinkName="Consulting Roles">
          <HeaderMenuItem href="#">UX Design</HeaderMenuItem>
          <HeaderMenuItem href="#">UI Design</HeaderMenuItem>
          <HeaderMenuItem href="#">User Metrics</HeaderMenuItem>
        </HeaderMenu>
      </HeaderNavigation>
      <SideNav
        aria-label="Side navigation"
        expanded={isSideNavExpanded}
        isPersistent={false}
      >
        <SideNavItems>
          <HeaderSideNavItems>
            <HeaderMenuItem href="#">Link 1</HeaderMenuItem>
            <HeaderMenuItem href="#">Link 2</HeaderMenuItem>
            <HeaderMenuItem href="#">Link 3</HeaderMenuItem>
            <HeaderMenu aria-label="Link 4" menuLinkName="Link 4">
              <HeaderMenuItem href="#">Sub-link 1</HeaderMenuItem>
              <HeaderMenuItem href="#">Sub-link 2</HeaderMenuItem>
              <HeaderMenuItem href="#">Sub-link 3</HeaderMenuItem>
            </HeaderMenu>
          </HeaderSideNavItems>
        </SideNavItems>
      </SideNav>
    </Header>
  );
}

export default MastHead;
