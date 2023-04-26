import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ProfileTabs = () => {

    const [activeTab, setActiveTab] = useState();

    const navigate = useNavigate();

    const handleTabClick = (index) => {
        setActiveTab(index);
    }

    return (
        <div className="tabs is-centered">
            <ul>
                <li 
                    className={activeTab === 0 ? 'is-active' : ''} 
                    onClick={() => {
                            handleTabClick(0); 
                            navigate("/profile/favorites");
                        }
                    }>
                    <a>Favorites</a>
                </li>
                <li 
                    className={activeTab === 1 ? 'is-active' : ''} 
                    onClick={() => {
                            handleTabClick(1); 
                            navigate("/profile/posts");
                        }
                    }>
                    <a>Posts</a>
                </li>
                <li 
                    className={activeTab === 2 ? 'is-active' : ''} 
                    onClick={() => {
                            handleTabClick(2); 
                            navigate("/profile/collections");
                        }
                    }>
                    <a>Collections</a>
                </li>
            </ul>
        </div>
    )
}