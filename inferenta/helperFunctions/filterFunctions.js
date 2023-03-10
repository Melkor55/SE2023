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
}

const filterPropertyEquals = (property, value) => {
    const temp = filteredCars.filter(car => { return car[property] === value})
    console.log(temp);  test = temp;
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
    console.log(temp);
}

const filterPropertyByArray = (property, valueArray) => {
    const temp = new Array()
    filteredCars.forEach(car => {
        // console.log(car[property] + " - " + value) 
        valueArray.forEach(value => {
            if(car[property] === value)
                temp.push(car);
        });
    });
    console.log(temp);
}

module.exports = {
    filterPropertyEquals: filterPropertyEquals,
    filterPropertyByInterval: filterPropertyByInterval,
    filterPropertyByArray: filterPropertyByArray,
}