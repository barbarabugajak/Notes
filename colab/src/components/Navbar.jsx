import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { fetchUser } from '../util';
import LogoutButton from './LogoutButton';

export default function Navbar() {
    const [username, setUsername] = useState(null);
    useEffect(() => {
        let userData = fetchUser();
        userData.then((data) => {
            if (data[1] === null) {
                window.location.href = '/login';
            } else {
                setUsername(data[0]);
            }
        });
    }, []);

    return (
        <div className="container">
            <nav class="navbar sticky-top navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Hello, {username}</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarText">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href="/new">Create a new note</a>
                        </li>
                    </ul>
                    <span class="navbar-text">
                        <LogoutButton />
                    </span>
                    </div>
                </div>
                </nav>
            <Outlet />
        </div>
    )
}