//import the package
const {RuleEngine} = require('node-rules');

const {filterPropertyEquals, filterPropertyByInterval, filterPropertyByArray} = require("./helperFunctions/filterFunctions.js");
const {checkIfElementWithPropertyExists, checkIfElementWithPropertyExistsInInterval, checkIfElementWithPropertyExistsInArray} = require("./helperFunctions/checkPropertiesFunctions.js");
// const {getRandomIntegerInRange} = require("./helperFunctions/getRandomIntegerInRange.js")
const {getRandomIntegerInRange} = require("./helperFunctions/getRandomIntegerInRange.js")
const {getDB, DBcars} = require("../database/database.js");
// const  getRandomIntegerInRange  = require('./helperFunctions/getRandomIntegerInRange.js');

var properties = [
    "Type",             //  array[] - multiple options
    "Brand",            //  array[] - multiple options
    "Model",            //  string - 1 option
    "Version",          //  string - 1 option
    "Year",             //  object{min: value, max: value} - range
    "Option",           //  array[] - multiple options - ?
    "Price",            //  object{min: value, max: value} - range
    "Color",            //  array[] - multiple options
    "BatteryCapacity",  //  object{min: value, max: value} - range
    "Horsepower",       //  object{min: value, max: value} - range
]

global.filteredCars;// = cars;
global.resultCar;
global.test = new Array();

let i = 0;
let FiltersArray = new Array();

//define the rules
var rules = [
    //  Rule 1
    {
        name: "Choose Brand",
        condition: function(R, car) 
        {
            console.log("### Filter by Brand")
            R.when(car /*&& (checkIfBrandExists(car.Brand))*/ && (checkIfElementWithPropertyExistsInArray("Brand", car.Brand)));
        },
        consequence: function(R, car) {
            // car.result = true;
            FiltersArray[i++] = filterPropertyByArray("Brand", car.Brand);
            R.next();
        }
    },
    //  Rule 2
    {
        name: "Choose Type",
        condition: function(R, car) 
        {
            console.log("### Filter by Type")
            R.when(car && (checkIfElementWithPropertyExists("Type", car.Type)));
        },
        consequence: function(R, car) {
            // car.result = true;
            FiltersArray[i++] = filterPropertyEquals("Type", car.Type)
            R.next();
        }
    },
    // Rule 3
    {
        name: "Choose TransmissionType Interval",
        condition: function(R, car) 
        {
            console.log("### Filter by TransmissionType")
            R.when(car && (checkIfElementWithPropertyExists("TransmissionType", car.TransmissionType)));
        },
        consequence: function(R, car) {
            // car.result = true;
            FiltersArray[i++] = filterPropertyEquals("TransmissionType", car.TransmissionType)
            R.next();
        }
    },
    //  Rule 4
    {
        name: "Choose Price Range",
        condition: function(R, car) 
        {
            console.log("### Filter by Price")
            R.when(car && (checkIfElementWithPropertyExistsInInterval("Price", car.Price)));
        },
        consequence: function(R, car) {
            // car.result = true;
            // filterPropertyEquals("Price", car.Type)
            FiltersArray[i++] = filterPropertyByInterval("Price", car.Price)
            R.next();
        }
    },
    //  Rule 5
    {
        name: "Choose Horsepower Range",
        condition: function(R, car) 
        {
            console.log("### Filter by Horsepower")
            R.when(car && (checkIfElementWithPropertyExistsInInterval("Horsepower", car.Horsepower)));
        },
        consequence: function(R, car) {
            // car.result = true;
            FiltersArray[i++] = filterPropertyByInterval("Horsepower", car.Horsepower)
            R.next();
        }
    },
    //  Rule 6
    {
        name: "Choose Body",
        condition: function(R, car) 
        {
            console.log("### Filter by Body")
            R.when(car && (checkIfElementWithPropertyExists("Body", car.Body)));
        },
        consequence: function(R, car) {
            // car.result = true;
            FiltersArray[i++] = filterPropertyEquals("Body", car.Body)
            R.next();
        }
    },
    //  Rule 7
    {
        name: "Choose Year Range",
        condition: function(R, car) 
        {
            console.log("### Filter by Year")
            R.when(car && (checkIfElementWithPropertyExistsInInterval("Year", car.Year)));
        },
        consequence: function(R, car) {
            // car.result = true;
            FiltersArray[i++] = filterPropertyByInterval("Year", car.Year)
            R.next();
        }
    },
    //  Rule 8
    {
        name: "Choose Seats",
        condition: function(R, car) 
        {
            console.log("### Filter by Seats")
            R.when(car && (checkIfElementWithPropertyExists("Seats", car.Seats)));
        },
        consequence: function(R, car) {
            // car.result = true;
            FiltersArray[i++] = filterPropertyEquals("Seats", car.Seats)
            R.next();
        }
    },
    //  Rule 9
    {
        name: "Choose Doors",
        condition: function(R, car) 
        {
            console.log("### Filter by Doors")
            R.when(car && (checkIfElementWithPropertyExists("Doors", car.Doors)));
        },
        consequence: function(R, car) {
            // car.result = true;
            FiltersArray[i++] = filterPropertyEquals("Doors", car.Doors)
            R.next();
        }
    },
    //  Rule 10
    {
        name: "Check results 1",
        condition: function(R, car) 
        {
            console.log("### Check results 1")
            R.when(car && (filteredCars.length === 1));
        },
        consequence: function(R, car) {
            car.car = filteredCars[0];
            car.result = true;
            R.stop();
        }
    },
    //  Rule 11
    {
        name: "Check results 2",
        condition: function(R, car) 
        {
            console.log("### Check results 2")
            R.when(car && (filteredCars.length > 1));
        },
        consequence: function(R, car) {
            let number = getRandomIntegerInRange(0,filteredCars.length);
            // console.log(number,filteredCars.length)
            car.car = filteredCars[number];
            car.result = true;
            R.stop();
        }
    },
    //  Rule 12
    {
        name: "Check results 3",
        condition: function(R, car) 
        {
            console.log("### Check results 3")
            R.when(car && (filteredCars.length < 1));
        },
        consequence: function(R, car) {
            let number = getRandomIntegerInRange(0,filteredCars.length);
            FiltersArray.reverse();
            // console.table(FiltersArray[0].sort((a, b) => a.Body.localeCompare(b.Body)));
            filteredCars = new Array();
            console.log(number,filteredCars.length)
            for(let j = 0 ; j < FiltersArray.length-1, filteredCars.length < 1  ; j ++)
            {
                for(let m = 0 ; m < FiltersArray[j], filteredCars.length < 1  ; m++ )
                {
                    for(let n = 0 ; n < FiltersArray[j+1], filteredCars.length < 1 ; n++)
                    {
                        if(FiltersArray[j][m] === FiltersArray[j+1][n])
                        {
                            filteredCars.push(FiltersArray[j][m]);
                            console.log(filteredCars)
                        }
                            
                        console.log(`${j}-${m}-${n}`)
                    }
                        
                }
            }
            // console.log(number,filteredCars.length)
            // resultCar = filteredCars[0];
            car.result = true;
            car.car = filteredCars[0];
            R.stop();
        }
    },


];
/*as you can see above we removed the priority 
and on properties for this example as they are optional.*/ 

// var userChoices = {
//     "Brand": ["BMW", "Volvo"],
//     // "Model": "XM G09",
//     "Body": "Compact Cars",
//     "Year": { min: 2015, max: 2021},
//     "Type": "Gasoline",
//     "TransmissionType": "Automatic",
//     "Horsepower": { min: 200, max: 350}, //HP,
//     "Seats": 5,
//     "Doors": 4,
//     "Price": { min: 5000, max: 75000}, //euro
// };
//initialize the rule engine
//Now pass the fact on to the rule engine for results
let applyRules = async (userChoices) => {    
    return new Promise((resolve, reject) => {
        var R = new RuleEngine(rules);
        R.execute(userChoices,function(result){ 
        // console.log("all filters -> ");
        // for(let j = 0 ; j < i ; j ++)
        //     console.table(FiltersArray[j].sort((a, b) => a.Body.localeCompare(b.Body)));
        // console.log(FiltersArray);
            // console.log("test -> ", test);
            if(result.result) 
            {
                console.log("\n-----Car Found----\n");
                resolve(result.car); 
            } 
            else
            {
                console.log("\n-----Car Not Found----\n");
                reject(result.car);
            }    
        });
    });    
}
const inferenta = async (userChoices, carList) => {

    filteredCars = new Array();
    filteredCars = await getDB();

    // console.table(filteredCars.sort((a, b) => a.Body.localeCompare(b.Body)));
    resultCar = await applyRules(userChoices);
    // console.log(resultCar);
    return resultCar;
}
// inferenta();

module.exports = {
    inferenta: inferenta,
}