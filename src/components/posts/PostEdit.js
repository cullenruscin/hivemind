import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const PostEdit = () => {
    
    const {postId} = useParams()
    const [tags, setTags] = useState([])
    const [post, update] = useState({
        title: "",
        description: "",
        image: "",
        tagId: 1
    });

    const localUser = localStorage.getItem("hivemind_user");
    const userObject = JSON.parse(localUser);
    
    const navigate = useNavigate();

    useEffect(
        () => {
            fetch(`http://localhost:8088/posts/${postId}`)
                .then(res => res.json())
                .then(
                    (post) => {
                        update(post)
                    }
                )
        },
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/tags`)
                .then(res => res.json())
                .then((tagsArray) => {
                    setTags(tagsArray)
                })
        },
        []
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault();

        const postToSendToAPI = {
            userId: userObject.id,
            title: post.title,
            description: post.description,
            image: post.image,
            tagId: post.tagId
        };

        return fetch(`http://localhost:8088/posts/${postId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postToSendToAPI)
        })
            .then(res => res.json())
            .then(() => {
                navigate("/posts")
            });
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
            <fieldset>
                <input 
                    type="text"
                    className="input mt-4"
                    placeholder="Image URL"
                    value={post.image}
                    onChange={
                        (evt) => {
                            const copy = {...post}
                            copy.image = evt.target.value
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
            <fieldset>
                <div className="select mt-4">
                    <select 
                        type="text"
                        placeholder="Tag"
                        value={post.tagId}
                        onChange={
                            (evt) => {
                                const copy = {...post}
                                copy.tagId = parseInt(evt.target.value)
                                update(copy)
                            }
                        }>
                            {
                                tags.map(
                                    (tag) => {
                                        return <option key={`tag--edit--${tag.id}`}value={tag.id}>{tag.label}</option>
                                    }
                                )
                            }
                    </select>
                </div>
            </fieldset>
            <button 
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="button is-light mt-4">
                Save
            </button>
        </form>
    );
}