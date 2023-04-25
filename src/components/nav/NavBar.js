import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate();

    return <>
        <nav className="navbar is-light">
            <div className="navbar-menu">
                <div className="navbar-start">
                    <Link className="navbar-item" to="/home">HiveMind</Link>
                </div>
                <div className="navbar-end">
                    <Link className="navbar-item">+</Link>
                    <Link className="navbar-item" to="/profile">Profile</Link>
                    <Link className="navbar-item" to="" onClick={() => {
                        localStorage.removeItem("hivemind_user")
                        navigate("/", {replace: true})
                    }}>Logout</Link>
                </div>
            </div>
        </nav>
    </>
}