var sqlite3 = require('sqlite3');
var axios = require('axios')

let getCars = () => {
    axios.get("https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getTrims&make=ford&body=SUV&model=Expedition&year=2013","application/json")
         .then((response) => {
            var trims = response.data;
            trims = trims.substring(2,trims.length-2)
            trims = JSON.parse(trims)
            console.log(trims)
         })
         .catch((error) => {
            // console.log(error)
            console.log("error" + error.message)
         })
}
getCars();

let db = new sqlite3.Database('./mcu.db', (err) => {
    console.log(err)
    if (!err) {
        // createDatabase();
        createTables(db)
        return;
    } else if (err) {
        console.log("Getting error " + err);
        exit(1);
    } else {
        runQueries(db);
    }
    
});

function createTables(newdb) {
    var createTable = `create table cars (
                            Id integer primary key not null,
                            Type text not null,
                            Brand text not null,
                            Model text not null UNIQUE,
                            Year integer not null,
                            Option text not null,
                            Price integer not null,
                            Color text not null,
                            BatteryCapacity integer not null,
                            Horsepower integer not null
                        );`;

    newdb.run(createTable, () => {
        // inserValues(newdb);
        runQueries(newdb);
    });
    // runQueries(newdb);
}

function inserValues(db) {
    let car = {
        "Id": 5,
        "Type": "Petrol",
        "Brand": "Dacia",
        "Model": "1311",
        "Version": "First gen 1.4L",
        "Year": "1979",
        "Option": "Basic",
        "Price": 5000, //euro
        "Color": "Red",
        "BatteryCapacity": "", //kWh
        "Horsepower": 56, //HP
    };

    db.run(`INSERT INTO cars
            ("Type", Brand, Model, "Year", "Option", Price, Color, BatteryCapacity, Horsepower)
            VALUES(?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10);
    `, {
        2: car.Type,
        3: car.Brand,
        4: car.Model,
        5: car.Year,
        6: car.Option,
        7: car.Price,
        8: car.Color,
        9: car.BatteryCapacity,
        10: car.Horsepower,
    });
}



function runQueries(db) {
    // console.log("prost")
    db.all(`select * from cars;`, [], (err, rows) => {
        // if(rows)
        rows.forEach(row => {
            console.log(row);
        });
    });
}