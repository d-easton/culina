
const getRecordIndex = (id, data) => {
    let output = -1;
    data.forEach( (element, index) => {
        if ( element.id == id ) {
            output = index;
        }
    })
    return output;
}

const funcs = {
    "getRecordIndex": getRecordIndex
}

export default funcs;