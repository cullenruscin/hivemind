import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
    const [email, set] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("hivemind_user", JSON.stringify({
                        id: user.id,
                        admin: user.isAdmin
                    }));

                    navigate("/posts");
                }
                else {
                    window.alert("Invalid login");
                }
            });
    }

    return (
        <div className="container box mt-3">
            <main className="container--login">
                <section>
                    <form className="form--login" onSubmit={handleLogin}>
                        <fieldset>
                            <label className="label" htmlFor="inputEmail"> Email address </label>
                            <input type="email"
                                value={email}
                                onChange={evt => set(evt.target.value)}
                                className="input form-control"
                                placeholder="Email address"
                                required autoFocus />
                        </fieldset>
                        <fieldset>
                            <button className="button is-light mt-3" type="submit">
                                Sign in
                            </button>
                        </fieldset>
                    </form>
                </section>
                <section className="link--register mt-3">
                    <Link to="/register">Not a member yet?</Link>
                </section>
            </main> 
        </div>
    )
}