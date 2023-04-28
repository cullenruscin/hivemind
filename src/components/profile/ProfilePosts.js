import { useEffect } from "react";
import { PostList } from "../posts/PostList";

export const ProfilePosts = ({ setActiveTab }) => {

    useEffect(
        () => {
            setActiveTab("UserPosts");
        },
        []
    );

    return <>
        <PostList filter={"User"}/>
    </>
}