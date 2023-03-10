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
    let x = (1, 1, 1)
    console.log(x[0])
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
    filteredCars.forEach(car => {
        // console.log(car[property] + " - " + value) 
        if(min <= car[property] && car[property] <= max)
            flag = true;
    });
    return flag;
}

const checkIfElementWithPropertyExistsInArray = (property, valueArray) => {
    let flag = false;
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