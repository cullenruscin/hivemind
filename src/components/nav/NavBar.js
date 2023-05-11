import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const NavBar = () => {

    const [isActive, setIsActive] = useState(false);

    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsActive(!isActive);
    }

    return (
        <nav className="navbar is-link">
            <div className="container">
                <div className="navbar-brand">
                    <Link className="navbar-item" to="/posts"><span className="material-icons-outlined">hive</span> <b className="hivemind-logo title has-text-white is-4">HiveMind</b></Link>
                    <a 
                        role="button" 
                        className={`navbar-burger ${isActive ? 'is-active' : ''}`} 
                        aria-label="menu" 
                        aria-expanded={isActive ? 'true' : 'false'} 
                        data-target="navbarData" 
                        onClick={toggleMenu}
                    >
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                <div id="navbarData" className={`navbar-menu ${isActive ? 'is-active' : ''}`} >
                    <div className="navbar-end">
                        <Link className="navbar-item" to="/post/create"><span className="material-icons-outlined">add</span></Link>
                        <Link className="navbar-item" to="/profile/favorites"><span className="material-icons-outlined">account_circle</span></Link>
                        <Link className="navbar-item" to="" onClick={() => {
                            localStorage.removeItem("hivemind_user")
                            navigate("/", {replace: true})
                            }}>
                            <span className="material-icons-outlined">logout</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}