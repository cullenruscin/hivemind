import { Outlet, Route, Routes } from "react-router-dom";
import { PostList } from "../posts/PostList";
import { PostForm } from "../posts/PostForm";
import { Profile } from "../profile/Profile";


export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/" element={
                <>
                    <Outlet/>
                </>
            }>
                <Route path="posts" element={ <PostList/> }/>
                <Route path="post/upload" element={ <PostForm/> }/>
                <Route path="profile/*" element={ <Profile/> }/>
            </Route>
        </Routes>
    </>
}