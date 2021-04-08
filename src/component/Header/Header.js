import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    //console.log(loggedInUser);
    return (
        <div className="container pb-5">
            <div className="row">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="container-fluid">
                        <h1>Let's Travel</h1>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                            aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                                <Link className="nav-link" aria-current="page" to="/">Home</Link>
                                <Link className="nav-link" to="/search">Destination</Link>
                                <Link className="nav-link" to="/">Blog</Link>
                                <Link className="nav-link" to="/">Contact</Link>
                                <Link style={{backgroundColor: 'tomato', color: 'white'}} className="nav-link" to="/login">Login</Link>
                                <button style={{backgroundColor: 'black', color:'white', border: 'none', fontSize: '19px'}} onClick={()=>setLoggedInUser({})}>Sign out</button>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Header;