import { Link, useNavigate } from "react-router-dom";

export const NavBar = () => {
    const navigate = useNavigate();

    return (
        <nav className="navbar is-link">
            <div className="container">
                <div className="navbar-menu">
                    <div className="navbar-start">
                        <Link className="navbar-item" to="/posts"><span className="material-icons-outlined">hive</span> <b className="hivemind-logo title has-text-white is-4">HiveMind</b></Link>
                    </div>
                    <div className="navbar-end">
                        <Link className="navbar-item" to="/post/upload"><span className="material-icons-outlined">add</span></Link>
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