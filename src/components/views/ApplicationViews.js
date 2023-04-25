import { Outlet, Route, Routes } from "react-router-dom";
import { PostList } from "../posts/PostList";
import { UserProfile } from "../profile/UserProfile";

export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/" element={
                <>
                    <Outlet/>
                </>
            }>
                <Route path="home" element={ <PostList/> }/>
                <Route path="profile" element={ <UserProfile/> }/>
            </Route>
        </Routes>
    </>
}