// const {filteredCars} = require("./index.js")

const filterByBrand = (brandName) => {
    // let temp = new Array();
    // filteredCars.forEach(car => {
    //     console.log(car.Brand + " - " + brandName) 
    //     if(car.Brand === brandName)
    //         temp.push
    // });
    const temp = filteredCars.filter(car => { return car.Brand === brandName})
    console.log(temp);
    filteredCars = temp;
    return temp;
}

const filterPropertyEquals = (property, value) => {
    console.log(value)
    const temp = filteredCars.filter(car => { return car[property] === value})
    // console.log(temp);  test = temp;
    console.table(temp.sort((a, b) => a.Body.localeCompare(b.Body)));
    filteredCars = temp;
    return temp;
}

const filterPropertyByInterval = (property, valueInterval) => {
    const {min, max} = valueInterval;
    console.log(min + " : " + max);
    const temp = new Array()
    filteredCars.forEach(car => {
        // console.log(car[property] + " - " + value) 
        if(min <= car[property] && car[property] <= max)
            temp.push(car);
    });
    console.table(temp.sort((a, b) => a.Body.localeCompare(b.Body)));
    // console.log(temp);
    filteredCars = temp;
    return temp;
}

const filterPropertyByArray = (property, valueArray) => {
    const temp = new Array()
    console.log(valueArray);
    filteredCars.forEach(car => {
        // console.log(car[property] + " - " + value) 
        valueArray.forEach(value => {
            if(car[property] === value)
                temp.push(car);
        });
    });
    console.table(temp.sort((a, b) => a.Body.localeCompare(b.Body)));
    // console.log(temp);
    filteredCars = temp;
    return temp;
}

module.exports = {
    filterPropertyEquals: filterPropertyEquals,
    filterPropertyByInterval: filterPropertyByInterval,
    filterPropertyByArray: filterPropertyByArray,
}