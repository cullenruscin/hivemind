import { useEffect } from "react";
import { PostList } from "../posts/PostList";

export const ProfilePosts = ({ setActiveTab }) => {

    useEffect(
        () => {
            setActiveTab(1)
        },
        []
    );

    const localUser = localStorage.getItem("hivemind_user");
    const userObject = JSON.parse(localUser);

    return <>
        <PostList filter={`userId=${userObject.id}`}/>
    </>
}