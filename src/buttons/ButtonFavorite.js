import { useEffect, useState } from "react";

export const ButtonFavorite = ({ post, getPosts }) => {
    const [favorited, setFavorited] = useState(false);

    const localUser = localStorage.getItem("hivemind_user");
    const userObject = JSON.parse(localUser);
    const userId = userObject.id;

    useEffect(
        () => {
            const favorites = post.favorites.find(favorite => favorite.userId === userId);
            setFavorited(favorites !== undefined);
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
            fetch(`http://localhost:8088/favorites?postId=${post.id}&userId=${userId}`)
              .then(res => res.json())
              .then(favorites => {
                const favoriteId = favorites[0].id;
                fetch(`http://localhost:8088/favorites/${favoriteId}`, { method: 'DELETE' })
                  .then(
                    () => {
                        setFavorited(false);
                        getPosts();
                    });
              });
        } else {
            fetch('http://localhost:8088/favorites', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(favoriteToSendToAPI)
            })
              .then(
                () => {
                    setFavorited(true);
                    getPosts();
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

