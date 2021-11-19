import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/equinox_logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import Accountmodal from "../header/Accountmodal";
import { connect } from 'react-redux'

const Nav = (props) => {
  const [menuOpen, setMenuOpen] = useState(false);
  // const [isChecked, setIsChecked] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [menuRef]);

  const handleClick = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setMenuOpen(false);
    }
  };

  return (
    <nav id="navbar">
      <div className="logo">
        <Link to="/">
          <img src={Logo} alt="company name" />{" "}
          {/* <span>company {isChecked ? "name" : ""}</span> */}
        </Link>
      </div>
      <div className="mobile">
        <GiHamburgerMenu
          className="hamburger"
          onClick={() => setMenuOpen(true)}
        />

        <div ref={menuRef} className={`overlay ${menuOpen ? "active" : ""}`}>
          <div className="closeBtn">
            <IoMdClose onClick={() => setMenuOpen(false)} />
          </div>
          <ul className="menu-item">
            <li onClick={() => setMenuOpen(false)}>
              <Link to="/">Home</Link>
            </li>
            <li onClick={() => setMenuOpen(false)}>
              <Link to="/buy-eqx">Buy EQX</Link>
            </li>
            <li onClick={() => setMenuOpen(false)}>
              <Link to="/enterprice-dex">Enterprise DEX</Link>
            </li>
            <li onClick={() => setMenuOpen(false)}>
              <Link to="/access-org">Access ORG 3.0</Link>
            </li>
            <li onClick={() => setMenuOpen(false)}>
              <a href="https://equinox.business/" target="_blank">
                About EQX
              </a>
            </li>
            <li>
              <a href="#" target="_blank">
                {props.account && props.account.account ? props.account.account.slice(0, 5) + "..." : ""}
              </a>
            </li>
            <li>
              <Accountmodal mobile={true} />
            </li>
          </ul>
        </div>
      </div>
      <ul className="desktop">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/buy-eqx">Buy EQX</Link>
        </li>
        <li>
          <Link to="/enterprice-dex">Enterprise DEX</Link>
        </li>
        <li>
          <Link to="/access-org">Access ORG 3.0</Link>
        </li>
        <li>
          <a href="https://equinox.business/" target="_blank">
            About EQX
          </a>
        </li>
        <li>
          <a href="#" target="_blank">
            {props.account && props.account.account ? props.account.account.slice(0, 5) + "..." : ""}
          </a>
        </li>
      </ul>
      <Accountmodal mobile={false} />
    </nav>
  );
};
const mapStateToProps = (state) => {
  return {
    account: state.account,
  };
};

export default connect(mapStateToProps)(Nav);

