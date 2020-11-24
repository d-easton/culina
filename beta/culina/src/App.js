import React, {useState, useEffect} from 'react';
import Navbar from './components/pages/Navbar';
import './App.css';
import FrontPage from './components/pages/FrontPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ListContainer from './components/pages/ListContainer';
import RecipeContainer from './components/pages/RecipeContainer';
import Services from './components/pages/Services';
import Products from './components/pages/Products';
import Login from './components/pages/Login';
import fire from './fire';


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
  
  const handleLogin = () => {
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email,password)  // hash
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
         recipes = <RecipeContainer user={user}/>
         groceryList = <ListContainer user={user}/>
       }
       else {
         setUser("");
       }
    }); 
  };
   
  useEffect( () => {
    authListener();
  }, []);

  const handleEmail = () => {
      return user.email; 
};

const signin = <Login  email={email}
  setEmail={setEmail}
  emailError={emailError}
  password={password}
  setPassword={setPassword}
  passwordError={passwordError}
  handleLogin={handleLogin}
  handleSignup={handleSignup}
  hasAccount={hasAccount}
  sethasAccount={sethasAccount}
  version={useState(true)[0]}
  loginCallback={setEmail}/>

const signup = <Login  email={email}
  setEmail={setEmail}
  emailError={emailError}
  password={password}
  setPassword={setPassword}
  passwordError={passwordError}
  handleLogin={handleLogin}
  handleSignup={handleSignup}
  hasAccount={hasAccount}
  sethasAccount={sethasAccount}
  version={useState(false)[0]}
  loginCallback={setEmail}/>

const signout = <FrontPage handleSignout={handleSignout}/>

let recipes = <RecipeContainer user={user}/>
let groceryList = <ListContainer user={user}/>
let frontpage = <FrontPage user={user}/>

  return (
    <div className="App">
      {user ? (
        <>
          <Router>
            <Navbar user={user} handleSignout={handleSignout}/> 
              <Switch>
                <Route path='/' exact render={(props) => frontpage } />
                <Route path='/grocery-list' render={(props) => groceryList } />
                <Route path='/recipe-list' render={(props) => recipes } />
                <Route path='/services' component={Services} />
                <Route path='/products' component={Products} />
                <Route path='/sign-in' render={(props) => signin} />
                <Route path='/sign-up' render={(props) => signup} />
                <Route path='/sign-out' render={(props) => signout} />
              </Switch>
          </Router>
        </>
    ): (
      <>
        <Router>
          <Navbar user={user} handleSignout={handleSignout}/> 
            <Switch>
              <Route path='/' exact component={FrontPage} />
              <Route path='/sign-in' render={(props) => signin} />
              <Route path='/sign-up' render={(props) => signup} />
              <Route path='/sign-out' render={(props) => signout} />
            </Switch>
        </Router>
      </>
    )}
  </div>
  )
}

export default App;
