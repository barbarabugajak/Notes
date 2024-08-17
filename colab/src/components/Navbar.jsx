import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from 'react-router-dom';

export default function Navbar() {
    return (
        <div className="container">
            <nav className="navbar sticky-top bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Notes</a>
                </div>
            </nav>
            <Outlet />
        </div>
    )
}