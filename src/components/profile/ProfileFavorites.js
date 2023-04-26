import { useEffect } from "react";

export const ProfileFavorites = ({ setActiveTab }) => {

    useEffect(
        () => {
            setActiveTab(0)
        },
        []
    );

    return <>
        <p>All my favorites go here!</p>
    </>
}