import { Link, useNavigate } from "react-router-dom";

export const NavBar = () => {
    const navigate = useNavigate();

    return (
        <nav className="navbar is-light">
            <div className="container">
                <div className="navbar-menu">
                    <div className="navbar-start">
                        <Link className="navbar-item" to="/posts"><span className="material-icons-outlined">hive</span> <b className="hivemind-logo title is-4">HiveMind</b></Link>
                    </div>
                    <div className="navbar-end">
                        <Link className="navbar-item" to="/post/upload"><span className="material-icons-outlined">add</span></Link>
                        <div className="navbar-item has-dropdown is-hoverable">
                            <Link className="navbar-item" to="/profile/favorites"><span className="material-icons-outlined">account_circle</span></Link>
                            <div className="navbar-dropdown">
                                <Link className="navbar-item" to="" onClick={() => {
                                    localStorage.removeItem("hivemind_user")
                                    navigate("/", {replace: true})
                                    }}>Logout
                                </Link>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </nav>
    );
}