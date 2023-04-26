import { Outlet, Route, Routes } from "react-router-dom";
import { ProfileTabs } from "./ProfileTabs";
import { ProfilePosts } from "./ProfilePosts";
import { ProfileFavorites } from "./ProfileFavorites";
import { ProfileCollections } from "./ProfileCollections";

export const Profile = () => {
    return <>
        <Routes>
            <Route path="/" element={
                <>
                    <ProfileTabs/>
                    <Outlet/>
                </>
            }>
                <Route path={"favorites"} element={ <ProfileFavorites/> }/>
                <Route path={"posts"} element={ <ProfilePosts/> }/>
                <Route path={"collections"} element={ <ProfileCollections/> }/>
            </Route>
        </Routes>
    </>
}
