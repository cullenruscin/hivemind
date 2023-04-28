import { useNavigate } from "react-router-dom";

export const ProfileTabs = ({ activeTab }) => {

    const navigate = useNavigate();

    return (
        <div className="tabs is-centered">
            <ul>
                <li 
                    className={activeTab === "Favorites" ? 'is-active' : ''} 
                    onClick={() => {
                            navigate("/profile/favorites");
                        }
                    }>
                    <a>Favorites</a>
                </li>
                <li 
                    className={activeTab === "UserPosts" ? 'is-active' : ''} 
                    onClick={() => { 
                            navigate("/profile/posts");
                        }
                    }>
                    <a>Posts</a>
                </li>
                <li 
                    className={activeTab === "Collections" ? 'is-active' : ''} 
                    onClick={() => {
                            navigate("/profile/collections");
                        }
                    }>
                    <a>Collections</a>
                </li>
            </ul>
        </div>
    );
}