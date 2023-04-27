import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const PostForm = () => {
    
    const [post, update] = useState({
        title: "",
        description: ""
    });

    const localUser = localStorage.getItem("hivemind_user");
    const userObject = JSON.parse(localUser);
    
    const navigate = useNavigate();

    const handleUploadButtonClick = (event) => {
        event.preventDefault();

        const postToSendToAPI = {
            userId: userObject.id,
            title: post.title,
            description: post.description
        }

        return fetch(`http://localhost:8088/posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postToSendToAPI)
        })
            .then(res => res.json())
            .then(() => {
                navigate("/posts")
            })
    }

    return (
        <form className="container box mt-5">
            <fieldset>
                <input 
                    required autoFocus
                    type="text"
                    className="input"
                    placeholder="Post title"
                    value={post.title}
                    onChange={
                        (evt) => {
                            const copy = {...post}
                            copy.title = evt.target.value
                            update(copy)
                        }
                    } />
            </fieldset>
            <fieldset className="mt-4">
                <textarea
                    className="textarea"
                    placeholder="Description"
                    value={post.description}
                    onChange={
                        (evt) => {
                            const copy = {...post}
                            copy.description = evt.target.value
                            update(copy)
                        }
                    } />
            </fieldset>
            <button 
                onClick={(clickEvent) => handleUploadButtonClick(clickEvent)}
                className="button is-light mt-4">
                Upload
            </button>
        </form>
    );
}