var sqlite3 = require('sqlite3');
var axios = require('axios');
const Car = require('../entity/Car');

let databaseName = "cars";
global.DBcars = new Array();
let carsForDB = new Array();
global.carProperties = [
    "Brand",            //  array[] - multiple options
    "Model",            //  array[] - multiple options
    "Body",             //  array[] - multiple options - ?
    "Year",             //  object{min: value, max: value} - range
    "Type",             //  array[] - multiple options
    "TransmissionType",  //  string - 1 option
    "Horsepower",       //  object{min: value, max: value} - range
    "Seats",            //  string/int - 1 option
    "Dors",            //  string/int - 1 option
    "Price",            //  object{min: value, max: value} - range       
];

let generateCarPrice = (APIcar) => {
    let price = 3000; //euro
    let brand = APIcar.model_make_id.toLowerCase();

    // console.log(indexes)
    if(!APIcar)
        return 0;
        
    price += APIcar.model_engine_power_ps/100 * 10000;

    if(brand === "porsche" || brand === "ferrari" || brand === "lamborghini")
        price*=10;
    if(brand === "bmw" || brand === "mercedes-benz" || brand === "audi" || brand === "lexus" || brand === "land-rover")
    price*=1.5;
    if(APIcar.model_seats === 2)
        price+=30000;
    if(APIcar.model_body.toLowerCase() === "convertible")
        price+=30000;
    if(APIcar.model_engine_type.toLowerCase() === "electric")
        price+=20000;

    price *= (1 + (APIcar.model_year/2005-1)*40); //    year coefficient
    
    price = price.toFixed();
    // console.log(APIcar.model_make_id + " " + APIcar.model_name + "(" + APIcar.model_engine_power_ps + ") --> " + price);
    return price;
}

let carFieldArray = new Array();
var i = 0;
let carBrands = [
    'Ford',
    'Dacia',
    'Tesla',
    'BMW',
    'Mercedes-Benz',
    'Audi',
    'Ferrari',
    'Toyota',
    'Lamborghini',
    'KIA',
    'Volvo',
    'Volkswagen',
    'Honda',
    'Hyundai',
    'Nissan',
    'Porsche',
    'Chevrolet',
    'Lexus',
    'Land-Rover',
]

let getCars = async () => {   //  api source -> https://www.carqueryapi.com/documentation/api-usage/
    await axios.get(`https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getTrims&make=${carBrands[i++]}&min_year=2005`,"application/json")
         .then((response) => {
            
            let car = new Car();

            var carsRawData = response.data;
            carsRawData = carsRawData.substring(2,carsRawData.length-2)
            carsRawData = JSON.parse(carsRawData)["Trims"]

            // console.log(carsRawData)
            carsRawData.forEach((APIcar, index) => {
                if(!carsForDB.find((tempCar) => tempCar.Model === APIcar.model_name)){
                    // generateCarPrice(carsRawData[index])
                    brand = APIcar.model_make_id;

                    car.Brand = (brand === "BMW" || brand === "Mercedes-Benz") ? brand : ((brand === "land-rover") ? "Land-Rover" : brand.substring(0,1).toUpperCase()+brand.substring(1).toLowerCase())
                    car.Model = APIcar.model_name
                    car.Body = APIcar.model_body !== "SUV" ? APIcar.model_body : "Sport Utility Vehicles"
                    car.Year = APIcar.model_year
                    car.Type = APIcar.model_engine_fuel
                    car.TransmissionType = APIcar.model_transmission_type 
                    car.Horsepower = APIcar.model_engine_power_ps
                    car.Seats = APIcar.model_seats ? APIcar.model_seats : ((APIcar.model_body === "Two Seaters") ? 2 : 4 )
                    car.Doors = APIcar.model_doors ? APIcar.model_doors : ((APIcar.model_seats === 2) ? 2 : 5 )
                    car.Price = generateCarPrice(carsRawData[index])

                    carsForDB.push(JSON.parse(JSON.stringify(car)))
                }
            })
            
         })
         .catch((error) => {
            // console.log(error)
            console.log("error" + error.message)
         })
}
// getCars();  // only to fill the database

let getDB = async () => {
    console.log("cars -> 1")
    // DBcars = new Array();
    // DBcars = new (Array);
    db = new sqlite3.Database(`./database/${databaseName}.db`, async (err) => {
        console.log(err)
        if (!err) {
            createTables(db);
            // while(i < carBrands.length)
            await getCars();
            carsForDB.forEach((car) => insertValuesIntoDB(db,car));
            // await getCarsFromDB(db);
            //console.table(DBcars.sort((a, b) => a.Body.localeCompare(b.Body)));
            getCarsFieldFromDB(db, carFieldArray, "TransmissionType")
            return;
        } else if (err) {
            console.log("Getting error " + err);
            exit(1);
        } else {
            getCarsFromDB(db);
        }    
    });
    // const temp = await getCarsFromDB(db);
    return await getCarsFromDB(db);
} 

function createTables(newdb) {
    var createTable = `create table IF NOT EXISTS ${databaseName} (
                            Id integer primary key AUTOINCREMENT,
                            Brand text not null,
                            Model text not null UNIQUE,
                            Body text not null,
                            Year integer not null,
                            Type text not null,
                            TransmissionType text not null,
                            Horsepower integer not null,
                            Seats integer not null,
                            Doors integer not null,
                            Price integer not null                           
                        );`;

    newdb.run(createTable, () => {
        // carsForDB.forEach((car) => insertValuesIntoDB(newdb,car));
        // getCarsFromDB(newdb);
    });
}

function insertValuesIntoDB(db, car) {
    db.run(`INSERT OR IGNORE INTO ${databaseName}
            (Brand,Model,Body,Year,Type,TransmissionType,Horsepower,Seats,Doors,Price)
            VALUES(?, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?11);
            `, {
                1: car.Brand,
                2: car.Model,
                3: car.Body,
                4: car.Year,
                5: car.Type,
                6: car.TransmissionType,
                7: car.Horsepower,
                8: car.Seats,
                9: car.Doors,
                11: car.Price,
            });
}

function insertValuesIntoFieldInDB(db, field, value){
    db.run(`REPLACE INTO ${databaseName}
            (${field})
            VALUES(${value});
            `);
}

async function getCarsFromDB(db) {
    DBcars = new Array();
    return new Promise((resolve, reject) => { 
        db.all(`select * from ${databaseName};`, [], (err, rows) => {
            if(rows)
            {
                rows.forEach(car => {   // pushes the Cars from the database into the array after going through a few filters
                    // console.log(row);
                    if(car.Type.includes("Flex-Fuel") )
                        car.Type = "Flex-Fuel";
                    else if(car.Type.includes("Gasoline") || car.Type.includes("Unleaded"))
                        car.Type = "Gasoline";
                        if(car.Type.includes("Hybrid") )
                        car.Type = "Hybrid";    
                    DBcars.push(car);
                });
                resolve(DBcars);
                
            }    
            else
            {
                reject(err);
                exit(1);
            }
               
            // console.table(DBcars.sort((a, b) => a.Body.localeCompare(b.Body)));
        });
    });
}

function getCarsFieldFromDB(db, array, field) {     // to get all the options a column in the database holds (for example - can get all Brands)
    db.all(`select ${field} from ${databaseName};`, [], (err, rows) => {
        if(rows)
            rows.forEach(row => {
                // console.log(row);
                if(!array.find( (element) => element.toLowerCase() === row[`${field}`].toLowerCase() ))
                {
                    // array.push( (row[`${field}`] === "BMW" | row[`${field}`] === "Mercedes-Benz") ? row[`${field}`] : row[`${field}`].substring(0,1).toUpperCase()+row[`${field}`].substring(1).toLowerCase())
                    array.push(row[`${field}`]);
                }
            });
        else
            exit(1);
        // console.table(array);
        console.dir(array, {'maxArrayLength': null});
        
    });    
}
// getDB()
module.exports = {
    getDB: getDB,
    DBcars: DBcars,
}