import { Outlet, Route, Routes } from "react-router-dom";
import { PostList } from "../posts/PostList";
import { PostCreate } from "../posts/PostCreate";
import { PostEdit } from "../posts/PostEdit";
import { Profile } from "../profile/Profile";
import { CollectionCreate } from "../collections/CollectionCreate";
import { CollectionEdit } from "../collections/CollectionEdit";

export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/" element={
                <>
                    <Outlet/>
                </>
            }>
                <Route path="posts" element={ <PostList filter={"All"}/> }/>
                <Route path="post/create" element={ <PostCreate/> }/>
                <Route path="posts/:postId/edit" element={ <PostEdit/> }/>
                <Route path="profile/*" element={ <Profile/> }/>
                <Route path="collection/create" element={ <CollectionCreate/> }/>
                <Route path="collections/:collectionId/edit" element={ <CollectionEdit/> }/>
            </Route>
        </Routes>
    </>
}