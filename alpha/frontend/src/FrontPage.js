import React from 'react';
import RecipeContainer from './RecipeContainer';
// import ListContainer from './ListContainer';



const FrontPage = (props) => {

    const { handleSignout, user} = props;


    return (

        <section className="main">
            <nav>
                <h2> Welcome</h2>
                <button onClick={handleSignout}> Logout </button>


            </nav>
            {/* <ListContainer email={user.email}/> */}
            <RecipeContainer email={user.email}/>
        </section>    
    );

};

export default FrontPage;