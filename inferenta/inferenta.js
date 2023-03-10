//import the package
const {RuleEngine} = require('node-rules');

const {filterPropertyEquals, filterPropertyByInterval, filterPropertyByArray} = require("./helperFunctions/filterFunctions.js");
const {checkIfElementWithPropertyExists, checkIfElementWithPropertyExistsInInterval, checkIfElementWithPropertyExistsInArray} = require("./helperFunctions/checkPropertiesFunctions.js");

var properties = [
    "Type",
    "Brand",
    "Model",
    "Version",
    "Year",
    "Option",
    "Price",
    "Color",
    "BatteryCapacity",
    "Horsepower",
]

const cars = [ // https://www.ultimatespecs.com/car-specs#T
    {
        "Id": 1,
        "Type": "Electric",
        "Brand": "Tesla",
        "Model": "S",
        "Version": "Plaid",
        "Year": "2021",
        "Option": "Basic",
        "Price": 137990,
        "Color": "Black",
        "BatteryCapacity": 95, //kWh
        "Horsepower": 1020, //HP
    },
    {
        "Id": 2,
        "Type": "Diesel",
        "Brand": "Toyota",
        "Model": "Hilux 2021 Double-Cab",
        "Version": "2.8 D-4D 4WD GR Sport",
        "Year": "2022",
        "Option": "Basic",
        "Price": 30305, //euro
        "Color": "Black",
        "BatteryCapacity": null, //kWh
        "Horsepower": 204, //HP
    },
    {
        "Id": 3,
        "Type": "Petrol",
        "Brand": "Lexus",
        "Model": "RX AL20 2020",
        "Version": "350 FWD",
        "Year": "2019",
        "Option": "Basic",
        "Price": 45175, //euro
        "Color": "Black",
        "BatteryCapacity": null, //kWh
        "Horsepower": 294, //HP
    },
    {
        "Id": 4,
        "Type": "Petrol",
        "Brand": "Ferrari",
        "Model": "F8 Spider",
        "Version": "3.9 V8",
        "Year": "2020",
        "Option": "Basic",
        "Price": 285377, //euro
        "Color": "Yellow",
        "BatteryCapacity": null, //kWh
        "Horsepower": 720, //HP
    },
    {
        "Id": 5,
        "Type": "Petrol",
        "Brand": "Dacia",
        "Model": "1310",
        "Version": "First gen 1.4L",
        "Year": "1979",
        "Option": "Basic",
        "Price": 5000, //euro
        "Color": "Red",
        "BatteryCapacity": null, //kWh
        "Horsepower": 56, //HP
    },
    {
        "Id": 6,
        "Type": "Hybrid",
        "Brand": "BMW",
        "Model": "XM G09",
        "Version": "",
        "Year": "2023",
        "Option": "Basic",
        "Price": 170051, //euro
        "Color": "Obsidian",
        "BatteryCapacity": null, //kWh
        "Horsepower": 653, //HP
    },
]

global.filteredCars = cars;
global.test = new Array();

//define the rules
var rules = [
    //  Rule 1
    {
        name: "Choose Brand",
        condition: function(R, car) 
        {
            console.log("### Filter by Brand")
            R.when(car /*&& (checkIfBrandExists(car.Brand))*/ && (checkIfElementWithPropertyExists("Brand", car.Brand)));
        },
        consequence: function(R, car) {
            // car.result = true;
            filterPropertyEquals("Brand", car.Brand)
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
            filterPropertyEquals("Type", car.Type)
            R.next();
        }
    },
    //  Rule 3
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
            filterPropertyByInterval("Price", car.Price)
            R.next();
        }
    },
    //  Rule 4
    {
        name: "Choose Color Interval",
        condition: function(R, car) 
        {
            console.log("### Filter by Color")
            R.when(car && (checkIfElementWithPropertyExistsInArray("Color", car.Color)));
        },
        consequence: function(R, car) {
            // car.result = true;
            // filterPropertyEquals("Price", car.Type)
            filterPropertyByArray("Color", car.Color)
            R.next();
        }
    },
];
/*as you can see above we removed the priority 
and on properties for this example as they are optional.*/ 

var userChoices = {
    "Type": "Petrol",
    "Brand": "BMW",
    "Model": "XM G09",
    "Version": "",
    "Year": { min: 2015, max: 2023},
    "Option": "Basic",
    "Price": { min: 5000, max: 55000}, //euro
    "Color": ["Obsidian", "Red", "Sapphire", "Yellow"],
    "Horsepower": { min: 100, max: 500} //HP,
};

//initialize the rule engine
var R = new RuleEngine(rules);
 
//Now pass the fact on to the rule engine for results
R.execute(userChoices,function(result){ 
    // console.log("test -> ", test);
    if(result.result) 
        console.log("\n-----Car[s] Found----\n"); 
    else 
        console.log("\n-----Car[s] Not Found----\n");
    
});

const inferenta = (userChoices, carList) => {
    
}

module.exports = {
    inferenta: inferenta,
}