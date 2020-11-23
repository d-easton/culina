import React, {useState, useEffect} from 'react';
import fire from './fire/fire';
import Login from './Login';
import FrontPage from './FrontPage';
import './css/App.css';

const UserEmail = React.createContext('not set')

const App = () => {
  const [user,setUser] = useState("");
  const [email,setEmail] = useState("");
  //hash password
  const [password,setPassword] = useState("");
  // let password = "";
  // const setPassword = (pwd) => {
  //   console.log(pwd)
  //   password = useState(pwd)
  // }

  const [emailError,setEmailError] = useState("");
  const [passwordError,setPasswordError] = useState("");

  const [hasAccount,sethasAccount] = useState(false);

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const clearErrors= () => {
    setEmailError("");
    setPasswordError("");
  };
  
  const handleLogin = (  ) => {
    // console.log(em)
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email,password)   // hash
      .catch( (err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
        }
      }); 
  };

  const handleSignup = () => {
    clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email,password)
      .catch( (err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
        }
      }); 
  };  
  
  const handleSignout = () => {
    fire.auth().signOut();
  };

  const authListener = () => {
    fire.auth().onAuthStateChanged( (user) => {
       if (user) {
         clearInputs();
         setUser(user);
       }
       else {
         setUser("");
       }
    }); 
  };
   
  useEffect( () => {
    authListener();
  }, []);

  // console.log(email)
  // console.log(user.email)

  const handleEmail = () => {
      console.log("handleEmail = ");
        console.log(user.email);
        return user.email; 
  };
    //console.log(handleEmail());

    //Creating context for user email


    return (
    <div className="App">
            {user ? (
                //<UserEmail.Consumer email={user.email}>
                  <FrontPage handleSignout={handleSignout} user={user}/> ) :
               // </UserEmail.Consumer>) :
      (
      <Login 
                      email={email}
                      setEmail={setEmail}
                      emailError={emailError}
                      password={password}
                      setPassword={setPassword}
                      passwordError={passwordError}
                      handleLogin={handleLogin}
                      handleSignup={handleSignup}
                      hasAccount={hasAccount}
                      sethasAccount={sethasAccount}
                      loginCallback={setEmail}
      /> )
      }
    </div>
  );

};

export default App;
