import React from "react";
import "./css/Welcome.css";

function Welcome() {
    return (
        <div className="welcome">
            <hr className="divider"/>
            <div className="welcome__container">
                <h2>A Creative Way to Cook</h2> 
                <p>
                    We built Culina around the idea that cooking is a creative process. As you cook, you learn what you like. 
                    A recipe isn't a rule book, it's a basic idea to which you add your own creativity. That's why Culina is
                    more than just a digital cookbook—the recipes you create in Culina are living documents. 
                    Tweak ingredients. Add margin notes. Edit steps. 
                    Culina helps you iterate on and experiment with your favorite dishes until they're perfect.
                </p>
                <br/>
                <h2>Cooking is Meant to be Shared</h2>
                <p>
                    Culina is more than just your personal cooking diary. Once you've perfected your favorite dishes, share it with
                    others through Culina's Community Recipe Box feature. Or, if you're looking for new ideas, you browse or search 
                    the Recipe Box for great recipes to use in your next meal. Once you find something you like, you can add it 
                    to your personal cookbook and edit it as you please.
                </p>
                <br/>
                <h2>More Food, Less Stress</h2>
                <p>
                    We can't chop your onions for you, but we can help with everything else. With Culina, it's to create and save meal
                    plans containing your favorite recipes. When you're ready to stock up, generate a grocery list from a single recipe or from 
                    an entire week's meal plan. 
                </p>
            </div>
            <hr className="divider"/>
        </div>
    );
}

export default Welcome;