const checkIfBrandExists = (brandName) => {
    let flag = false;
    filteredCars.forEach(car => {
        // console.log(car.Brand + " - " + brandName) 
        if(car.Brand === brandName)
            flag = true;
    });
    return flag;
}

const checkIfElementWithPropertyExists = (property, value) => {
    let flag = false;
    console.log(value) 
    filteredCars.forEach(car => {
        // console.log(car[property] + " - " + value) 
        if(car[property] === value)
            flag = true;
    });
    return flag;
}

const checkIfElementWithPropertyExistsInInterval = (property, valueInterval) => {
    let flag = false;
    const {min, max} = valueInterval;
    console.log(min + " : " + max);
    filteredCars.forEach(car => {
        // console.log(car[property] + " - " + value) 
        if(min <= car[property] && car[property] <= max)
            flag = true;
    });
    return flag;
}

const checkIfElementWithPropertyExistsInArray = (property, valueArray) => {
    let flag = false;
    console.log(valueArray);
    filteredCars.forEach(car => {
        // console.log(car[property] + " - " + value) 
        valueArray.forEach(value => {
            if(car[property] === value)
                flag = true;
        });
    });
    return flag;
}

module.exports = {
    checkIfElementWithPropertyExists: checkIfElementWithPropertyExists,
    checkIfElementWithPropertyExistsInInterval: checkIfElementWithPropertyExistsInInterval,
    checkIfElementWithPropertyExistsInArray: checkIfElementWithPropertyExistsInArray,
}