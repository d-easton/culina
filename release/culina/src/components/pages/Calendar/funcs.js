
const getMealPlanTitles = (fetchedMealPlans) => {
    let titles = [];
    fetchedMealPlans.forEach( (plan) => {
        titles.push(plan.title);
    })
    return titles;
}


const funcs = {
    'getMealPlanTitles': getMealPlanTitles
}
export default funcs;
