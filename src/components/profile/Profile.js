import { Outlet, Route, Routes } from "react-router-dom";
import { ProfileTabs } from "./ProfileTabs";
import { ProfilePosts } from "./ProfilePosts";
import { ProfileFavorites } from "./ProfileFavorites";
import { ProfileCollections } from "./ProfileCollections";
import { ProfileCollection } from "./ProfileCollection";
import { CollectionCreate } from "../collections/CollectionCreate";
import { useState } from "react";
import { ProfileUser } from "./ProfileUser";
import { ProfileEdit } from "./ProfileEdit";

export const Profile = () => {

    const [activeTab, setActiveTab] = useState([]);

    return <>
        <Routes>
            <Route path="/" element={
                <>
                    <ProfileUser/>
                    <ProfileTabs activeTab={ activeTab }/>
                    <Outlet/>
                </>
            }>
                <Route path="edit" element={ <ProfileEdit/> }/>
                <Route path="favorites" element={ <ProfileFavorites setActiveTab={ setActiveTab }/> }/>
                <Route path="posts" element={ <ProfilePosts setActiveTab={ setActiveTab }/> }/>
                <Route path="collections" element={ <ProfileCollections setActiveTab={ setActiveTab }/> }/>
                <Route path="collections/:collectionId" element={ <ProfileCollection/> }/>
            </Route>
        </Routes>
    </>
}
