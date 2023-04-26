import { useEffect } from "react";
import { PostList } from "../posts/PostList";

export const ProfilePosts = ({ setActiveTab }) => {

    const localUser = localStorage.getItem("hivemind_user");
    const userObject = JSON.parse(localUser);

    useEffect(
        () => {
            setActiveTab(1)
        },
        []
    );

    return <>
        <PostList filter={`userId=${userObject.id}`}/>
    </>
}