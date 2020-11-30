import './App.css';
import { ReactComponent as LogoIcon } from './icons/logo.svg'
import { ReactComponent as AvatarIcon } from './icons/avatar.svg'
import { ReactComponent as ArrowIcon } from './icons/arrow.svg'
import { ReactComponent as BellIcon } from './icons/bell.svg'
import { ReactComponent as BoltIcon } from './icons/bolt.svg'
import { ReactComponent as CaretIcon } from './icons/caret.svg'
import { ReactComponent as ChevronIcon } from './icons/chevron.svg'
import { ReactComponent as CogIcon } from './icons/cog.svg'
import { ReactComponent as MessengerIcon } from './icons/messenger.svg'
import { ReactComponent as PlusIcon } from './icons/plus.svg'

import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

function App() {
  return (
    <Navbar>
      <div className="title">{<LogoIcon/>}</div>
      <NavItem icon={<CaretIcon/>}>
        <DropdownMenu></DropdownMenu>
      </NavItem>
      <NavItem icon={<PlusIcon/>}/>
      <NavItem icon={<BellIcon/>}/>
      <NavItem icon={<MessengerIcon/>}/>

    </Navbar>
  );
}

function Navbar(props){
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{ props.children }</ul>
    </nav>
  );
}

function NavItem(props) {

  const [open, setOpen] = useState(false);

  return(
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>

      {open && props.children}
    </li>
  );
}


function DropdownMenu() {

  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);

  function calcHeight(element) {
    const height = element.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItems(props){
    return(
      <a href="#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className="icon-left">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }

  return(
    <div className="dropdown" style={{ height: menuHeight }}>
      <CSSTransition 
      in={activeMenu === 'main'} 
      unmountOnExit 
      timeout={500} 
      classNames="menu-primary"
      onEnter={calcHeight}
      >
        <div className = "menu">

          <DropdownItems
          leftIcon={<AvatarIcon />}>
            My Profile
          </DropdownItems>

          <DropdownItems
          leftIcon={<CogIcon />}
          rightIcon={<ChevronIcon />}
          goToMenu="settings">
            Settings
          </DropdownItems>

        </div>
      </CSSTransition>

      <CSSTransition 
      in={activeMenu === 'settings'} 
      unmountOnExit 
      timeout={500} 
      classNames="menu-secondary"
      onEnter={calcHeight}
      >
        <div className = "menu">

          <DropdownItems
            leftIcon={<ArrowIcon />}
            goToMenu="main">
            Back
          </DropdownItems>

          <DropdownItems
          leftIcon={<CogIcon />}>
            Settings
          </DropdownItems>

          <DropdownItems
          leftIcon={<CogIcon />}>
            Settings
          </DropdownItems>

          <DropdownItems
          leftIcon={<CogIcon />}>
            Settings
          </DropdownItems>

          <DropdownItems
          leftIcon={<CogIcon />}>
            Profile
          </DropdownItems>
        
        </div>
      </CSSTransition>
    </div>
  );
}

export default App;