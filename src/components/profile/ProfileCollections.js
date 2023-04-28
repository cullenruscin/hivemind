import { useEffect } from "react";

export const ProfileCollections = ({ setActiveTab }) => {

    useEffect(
        () => {
            setActiveTab("Collections");
        },
        []
    );

    return <>
        <p>All my liked collections go here!</p>
    </>
}