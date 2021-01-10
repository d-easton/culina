
import constants from './constants.js';

const getRecordIndex = (record, data) => {
    console.log(data);
    let output = -1;
    data.forEach( (element, index) => {
        if ( element[constants.id] == record[constants.id] && element[constants.unit] == record[constants.unit]  ) {
            output = index;
        }
    })
    console.log("return index: "+output);
    return output;
}

const parseRecipeID = (rawInput) => {
    return rawInput.replace(' ','_').toUpperCase();
}
const parseRecipeID = (rawInput) => {
    return rawInput.replace(' ','_').toUpperCase();
}
const parseIngredientAndUnit = (rawInput) => {
    return rawInput.replace(' ','_').toUpperCase();
}
const parseQuantity = (rawInput) => {
    return rawInput.replace(' ','_').toUpperCase();
}

const funcs = {
    "getRecordIndex": getRecordIndex
}

export default funcs;