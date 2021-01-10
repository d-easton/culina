
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

const funcs = {
    "getRecordIndex": getRecordIndex
}

export default funcs;