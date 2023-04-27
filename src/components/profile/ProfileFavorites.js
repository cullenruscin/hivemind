import { useEffect } from "react";
import { PostList } from "../posts/PostList";

export const ProfileFavorites = ({ setActiveTab }) => {

    const localUser = localStorage.getItem("hivemind_user");
    const userObject = JSON.parse(localUser);

    useEffect(
        () => {
            setActiveTab(0)
        },
        []
    );

    return <>
        <PostList filter={"Favorites"}/>
    </>
}