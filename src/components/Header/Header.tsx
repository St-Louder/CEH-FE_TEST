import React from "react";
import logo from "../../assets/logo-ceh-new-02.png";
import './Header.css'

const Header: React.FC = () => {


  return (
    <div className="header-page">
      <div className="logo">
        <img 
          src={logo} 
          alt="Company Logo"
        />
      </div>

    </div>
  );
};

export default Header;
