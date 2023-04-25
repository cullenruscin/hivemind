import { useState, useEffect } from "react"

export const PostList = () => {
    const [posts, setPosts] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/posts?_expand=user`)
                .then(res => res.json())
                .then((postArray) => {
                    setPosts(postArray)
                })
        },
        []
    )

    return <>
        <div className="container">
            <div className="tile is-ancestor is-verticle is-flex-wrap-wrap mt-3">
                    {
                        posts.map(
                            (post) => {
                                return <div className="tile is-parent is-4">
                                    <div className="tile is-child box">
                                        <div className="title is-6">{post.title}</div>
                                        <div className="subtitle is-6">{post.user.firstName} {post.user.lastName}</div>
                                        <div className="content">{post.description}</div>
                                    </div>
                                </div>
                            }
                        )
                    }
            </div>
        </div>
    </>
}