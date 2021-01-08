
const getMealPlanTitles = (fetchedMealPlans) => {
    let titles = [];
    fetchedMealPlans.forEach( (plan) => {
        titles.push(plan.name);
    })
    return titles;
}

const getCalendarIDFromTitle = (fetchedMealPlans, targetTitle) => {
    let output = 0;
    fetchedMealPlans.forEach( (plan) => {
        if (plan.name == targetTitle){
            // console.log("match at "+plan.name+" == "+targetTitle);
            output = plan.id;      
        }
    });
    console.log(output)
    return output;
}

const funcs = {
    'getMealPlanTitles': getMealPlanTitles,
    'getCalendarIDFromTitle': getCalendarIDFromTitle
}
export default funcs;
