import { useEffect, useState } from "react";

export const ButtonFavorite = ({ post }) => {
    const [favorited, setFavorited] = useState(false);

    const localUser = localStorage.getItem("hivemind_user");
    const userObject = JSON.parse(localUser);
    const userId = userObject.id;

    useEffect(
        () => {
            const likes = post.likes.find(like => like.userId === userId);
            setFavorited(likes !== undefined);
        },
        [post]
    );

    const handleFavoriteButtonClick = (event) => {
        event.preventDefault();

        const favoriteToSendToAPI = {
            userId: userObject.id,
            postId: post.id
        }

        if (favorited) {
            fetch(`http://localhost:8088/likes?postId=${post.id}&userId=${userId}`)
              .then(res => res.json())
              .then(likes => {
                const likeId = likes[0].id;
                fetch(`http://localhost:8088/likes/${likeId}`, { method: 'DELETE' })
                  .then(
                    () => {
                        setFavorited(false);
                    });
              });
        } else {
            fetch('http://localhost:8088/likes', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(favoriteToSendToAPI)
            })
              .then(
                () => {
                    setFavorited(true);
                });
        }
    }

    return (
        <button className="button is-light is-danger mr-1" onClick={(clickEvent) => handleFavoriteButtonClick(clickEvent)}>
            <span className="icon">
                {
                    favorited 
                    ?
                        <i className="material-icons">favorite</i>
                    : 
                        <i className="material-icons-outlined">favorite_border</i>
                }
            </span>
        </button>
    )
}

