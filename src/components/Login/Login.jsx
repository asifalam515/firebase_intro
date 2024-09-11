import { useState } from "react";
import app from "../../firebase/firebase.init";
import {
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  getAuth,
  signOut,
} from "firebase/auth";

const Login = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);

  // event handler
  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const loggedInUser = result.user;
        console.log(loggedInUser);
        setUser(loggedInUser);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSingIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const loggedInUser = result.user;
        console.log(loggedInUser);
        setUser(loggedInUser);
      })
      .catch((error) => {
        console.log("Error Occured", error);
      });
  };
  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        console.log("done");
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
        // An error happened.
      });
  };
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  return (
    <div className="flex flex-row gap-10">
      {user ? (
        <div>
          (
          <button className="btn btn-error" onClick={handleLogOut}>
            Log Out
          </button>
          <button>Log Out using Github</button>)
        </div>
      ) : (
        <div>
          <button className="btn btn-primary" onClick={handleSingIn}>
            Sign In
          </button>
          <button onClick={handleGithubSignIn} className="btn btn-primary">
            Sign In using Github
          </button>
        </div>
      )}
      {user && (
        <div>
          <h1>Name:{user.displayName}</h1>
        </div>
      )}
    </div>
  );
};

export default Login;
