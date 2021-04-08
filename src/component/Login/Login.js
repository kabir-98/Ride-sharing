import React, { useContext } from 'react';
import { useState } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { createUserWithEmailAndPassword, handelGoogleSignIn, handelSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './LoginManager';

const Login = () => {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    displayName: '',
    email: '',
    password: '',
    photo: '',
    error: '',
    success: false
  });

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: '/' } };

  const googleSignIn = () => {
    handelGoogleSignIn()
      .then(res => {
        handelResponse(res, true);
      })
  }

  const signOut = () =>{
    handelSignOut()
    .then(res => {
      handelResponse(res, false);
    })
  }

  const handelSubmit = (event) => {
    event.preventDefault();
    if (newUser && user.email && user.password) {
      //console.log("HandleSubmit" + JSON.stringify(user));
      createUserWithEmailAndPassword(user.displayName, user.email, user.password)
      .then(res => {
        console.log({res});
        //handelResponse(res, true);
      })
    }

    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        handelResponse(res, true);
      })
    }
  }

  const handelBlur = (event) => {
    let isInputValid = true;
    if (event.target.name === 'email') {
      isInputValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if (event.target.name === 'password') {
      const isPasswordValid = event.target.value.length > 8;
      const passwordHasNumber = /\d{1}/.test(event.target.value);
      isInputValid = isPasswordValid && passwordHasNumber;
    }
    if (isInputValid) {
      const newUserInfo = { ...user }
      newUserInfo[event.target.name] = event.target.value;

      setUser(newUserInfo);
    }
  }

  const handelResponse = (res, redirect) =>{
    setUser(res);
    setLoggedInUser(res);
    if(redirect){
      history.replace(from);
    }
  }

    return (
        <div className="container">
            <div className="row mt-5">
                <div style={{width: '40%', border: '1px solid black', padding: '20px', margin: 'auto'}}>
                    <h4 className="text-center">Login</h4>
                    <br/>
                    
                    <form onSubmit={handelSubmit}>
                        {newUser &&
                            <div className="mb-3">
                                <label  className="form-label">Name</label>
                                <input type="text" name="displayName" onBlur={handelBlur} className="form-control" />
                            </div>
                        }
                        <div className="mb-3">
                            <label  className="form-label">Email address</label>
                            <input type="text" name="email" onBlur={handelBlur} className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label  className="form-label">Password</label>
                            <input type="password" name="password" onBlur={handelBlur} className="form-control"/>
                        </div>
                        {/* {newUser &&
                            <div className="mb-3">
                                <label  className="form-label">Confirm Password</label>
                                <input type="password" name="rePassword" onBlur={handelBlur} className="form-control" />
                            </div>
                        } */}
                        <br/>
                        <input type="submit" className="btn btn-primary form-control" value={newUser ? 'Sign up' : 'Sign in'}/>
                    </form>
                    <br/>
                    <p className="text-center">{newUser ? 'Already have an Account?' : "Don't have account?"}<button name="newUser" onClick={() => setNewUser(!newUser)} style={{border : "none", backgroundColor: "white", color: "blue"}}>{newUser ? 'Login' : 'Create a new Account'}</button></p>
                    <p style={{ color: "red" }}>{user.error}</p>
                </div>
                <div className="text-center mt-4 mb-5" style={{margin: 'auto'}}>
                    <p>----------Or----------</p>
                    <button onClick={googleSignIn} style={{borderRadius: '10px', width: '30%', border: '1px solid gray'}}>Continue with Google</button>
                </div>
            </div>
        </div>
    );
};

export default Login;
