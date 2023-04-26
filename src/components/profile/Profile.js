import { Outlet, Route, Routes } from "react-router-dom";
import { ProfileTabs } from "./ProfileTabs";
import { ProfilePosts } from "./ProfilePosts";
import { ProfileFavorites } from "./ProfileFavorites";
import { ProfileCollections } from "./ProfileCollections";
import { useState } from "react";

export const Profile = () => {

    const [activeTab, setActiveTab] = useState([]);

    return <>
        <Routes>
            <Route path="/" element={
                <>
                    <ProfileTabs activeTab={ activeTab }/>
                    <Outlet/>
                </>
            }>
                <Route path={"favorites"} element={ <ProfileFavorites setActiveTab={ setActiveTab }/> }/>
                <Route path={"posts"} element={ <ProfilePosts setActiveTab={ setActiveTab }/> }/>
                <Route path={"collections"} element={ <ProfileCollections setActiveTab={ setActiveTab }/> }/>
            </Route>
        </Routes>
    </>
}
