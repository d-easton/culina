import React from 'react';
import { useHistory } from 'react-router-dom';
import fire from '../../fire';

const bcrypt = require('bcryptjs');
const saltRounds = 10;



let hashedPass = ""

const Login = (props) => {
    
    let history = useHistory();
    const { email, setEmail, emailError, password, setPassword, passwordError, handleLogin, handleSignup, hasAccount, sethasAccount, version} = props;
    let testAccount = hasAccount
    if(version && hasAccount){
      testAccount = false
    }
    if(version && !hasAccount){
      testAccount = true
    }

    const encryptPassword = (pass) => {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(pass, salt, (err, hash) => {
                // console.log(""+hash);
                // console.log(pass)
                // console.log(typeof(""+hash));
                // console.log(password)
                // console.log(email)
                hashedPass = ""+hash
                // return pass
                return ""+hash 
            });
        });
    }

    const owertwtwrt = (pass) => {
        let ok = encryptPassword(pass)
        hashedPass = ok

        return setPassword(pass)
    }

    function check(em) {
        // console.log('hi')
        // console.log(hashedPass)
        LogLog()
    }

    const LogLog = (  ) => {
        // console.log(em)
        fire
          .auth()
          .signInWithEmailAndPassword(email,hashedPass)   // hash
          .catch( (err) => {
            switch (err.code) {
              case "auth/invalid-email":
              case "auth/user-disabled":
              case "auth/user-not-found":
                break;
              case "auth/wrong-password":
                break;
            }
          }); 
      };

      const SignSign = () => {
        fire
          .auth()
          .createUserWithEmailAndPassword(email,password)
          .catch( (err) => {
            switch (err.code) {
              case "auth/email-already-in-use":
              case "auth/invalid-email":
                break;
              case "auth/weak-password":
                break;
            }
          }); 
      };  

    return( 
        <section className="login">
            <div className="loginContainer">
            <label> Email </label>
            <input type="text" autoFocus required value={email} onChange={e => setEmail(e.target.value)} />
            <p className="errorMsg"> {emailError} </p>
            <label> Password </label>
            <input type="password" required value={password} onChange={e => setPassword( e.target.value )} />    
            <p className="errorMsg"> {passwordError} </p>

            <div className="btnContainer">
                { testAccount ? (
                    <>
                    <button onClick={() => {handleLogin(); history.push('/')}}>Sign In</button>
                    {/* <button onClick={handleLogin}>Sign In</button> */}
                    <p>Don't have an account? <span onClick={ () => sethasAccount(!hasAccount) }> Sign up </span></p>
                    </>
                ) : (
                    <>
                    <button onClick={() => {handleSignup(); history.push('/')}}>Sign Up</button>
                    {/* <button onClick={handleSignup}>Sign Up</button> */}
                    <p>Have an account? <span onClick={ () => sethasAccount(!hasAccount) }>Sign in</span></p>
                    </>
                )}
            </div>

            </div>           
        </section>
    );
};

export default Login;