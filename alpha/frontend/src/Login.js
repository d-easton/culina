import React from 'react';
// import grpcClient from './ice_cream_client'
import IceCreamClient from './ice_cream_pb'
// import IceCreamClient from './ice_cream_pb'
const services = require('./ice_cream_grpc_web_pb');
const messages = require('./ice_cream_pb');
// const grpc = require('grpc');


const Login = (props) => {
    
    const { email, setEmail, emailError, password, setPassword, passwordError, handleLogin, handleSignup, hasAccount, sethasAccount} = props;

    console.log(props)
    // const client = new services.IceCreamClient('http://localhost:8082');
    // // const client = new services.IceCreamClient('http://35.193.28.175:8082');
    // console.log(client)
    // // console.log(IceCreamClient)
    // // console.log(services)

    // // fetch('http://35.193.28.175:8085/recipe').then(response => response.json()).then(recipe=> {
    // //     console.log(recipe)
    // // })

    // const iceCreamRequest = new messages.IceCreamRequest();
    // iceCreamRequest.setScoops(4);
    // iceCreamRequest.setFlavor('Vanilla');
    // var metadata = { 'Content-Type': 'application/grpc-web+proto',
    //                 'Accept': '*/*'
    //                 // 'Connection': 'keep-alive'
    //                 // 'Accept-Encoding': 'gzip, deflate, br'
    //                 };

    // // console.log(iceCreamRequest)
    
    // client.orderIceCream(iceCreamRequest, metadata, (err, response) => {
    //     if (err) {
    //         // console.log(response)
    //         // console.log(err)
    //         console.log('this thing broke!', err);
    //     } else {
    //         // console.log(response.data)
    //         // console.log(response.content)
    //         // console.log(response)
    //         console.log('response from golang:', response.getMessage());
    //     }
    // });


    return( 
        <section className="login">
            <div className="loginContainer">
            <label> Username </label>
            <input type="text" autoFocus required value={email} onChange={e => setEmail(e.target.value)} />
            <p className="errorMsg"> {emailError} </p>
            <label> Password </label>
            <input type="tpassword" required value={password} onChange={e => setPassword(e.target.value)} />
            <p className="errorMsg"> {passwordError} </p>

            <div className="btnContainer">
                { hasAccount ? (
                    <>
                    <button onClick={handleLogin}>Sign In</button>
                    <p>Don't have an account? <span onClick={ () => sethasAccount(!hasAccount) } > Sign up </span></p>
                    </>
                ) : (
                    <>
                    <button onClick={handleSignup}>Sign Up</button>
                    <p>Have an account? <span onClick={ () => sethasAccount(!hasAccount) }>Sign in</span></p>
                    </>
                )}
            </div>

            </div>           
        </section>
    );
};

export default Login;