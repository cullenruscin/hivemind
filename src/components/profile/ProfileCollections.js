import { useEffect } from "react";

export const ProfileCollections = ({ setActiveTab }) => {

    useEffect(
        () => {
            setActiveTab(2)
        },
        []
    );

    return <>
        <p>All my liked collections go here!</p>
    </>
}