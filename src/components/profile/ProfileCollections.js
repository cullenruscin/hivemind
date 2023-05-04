import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CollectionList } from "../collections/CollectionList";

export const ProfileCollections = ({ setActiveTab }) => {

    useEffect(
        () => {
            setActiveTab("Collections");
        },
        []
    );

    return <>
        <CollectionList/>
    </>
}