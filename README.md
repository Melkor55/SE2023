# SE2023

## `npm install` to install the required packages(the dependencies from package.json)

- ### `cd inferenta` + `node inferenta.js` to run --> `inferenta` part

- ### `cd database` + `node database.js` to run --> `bazaCunostinte` part


# **`npm start`** to run whole aplication(the backend)

- ## the *endpoint* for the app is : <[localhost:3005/inferenta](http://localhost:3005/inferenta/)>
---

> ## the aplication aims to find the best result for the given filters, meaning if will  
> 
> ## _**`STILL`**_ show a result even if _**`NOT ALL`**_ the filters match the user's selection

---
- ### the *`Post`* request body should be like below :
```json
{
    "Brand": ["Lamborghini", "Audi", "Porsche", "Mercedes-Benz"],
    "Body": "Two Seaters",
    "Year": {"min": 2005, "max": 2022},
    "Type": "Gasoline",
    "TransmissionType": "Automated Manual",
    "Horsepower": { "min": 120, "max": 700},
    "Seats": 5,
    "Doors": 4,
    "Price": { "min": 100000, "max": 1500000}
}
```
- ### the response for will be of type :
```json
{
	"Id": 116,
	"Brand": "Lamborghini",
	"Model": "Huracan",
	"Body": "Two Seaters",
	"Year": 2022,
	"Type": "Gasoline",
	"TransmissionType": "Automated Manual",
	"Horsepower": 610,
	"Seats": 2,
	"Doors": 2,
	"Price": 857057
}
```
---
## All car field possibilities
- #### the _**Brand**_ is considered as _multiple choice_
```javascript
let carBrand = [
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
```
```javascript
let carBody = 
[
  'Midsize Cars',
  'Sport Utility Vehicles',
  'Standard Pickup Trucks',
  'Subcompact Cars',
  'Midsize Station Wagons',
  'Compact Cars',
  'Large Cars',
  'Cargo Vans',
  'Passenger Vans',
  'Sedan',
  'Hatchback',
  'Roadster',
  'Two Seaters',
  'Small Station Wagons',
  'Coupe',
  'Convertible',
  'Minivan',
  'Small Pickup Trucks',
  'Station Wagon',
  'Small Sport Utility Vehicles'
]
```
```javascript
let carYear = {"min": 2009, "max": 2022};
```
```javascript
let carType = [ 'Electric', 'Flex-Fuel', 'Diesel', 'Hybrid', 'Gasoline' ]
```
```javascript
let carTransmissionType = [ 'Automatic', 'Manual', 'Direct Drive', 'Automated Manual' ];
```
```javascript
let carHorsepower = {"min": 68, "max": 887};
```
```javascript
let carSeats = [ 2, 5 ];
```
```javascript
let carDoors = [ 2, 3, 4, 5 ];
```
```javascript
let carPrice = {"min": 11169, "max": 1228002};
```
---
### Examples :
![Alt text](./img/1.png?raw=true "Title")

![Alt text](./img/2.png?raw=true "Title")

![Alt text](./img/3.png?raw=true "Title")

![Alt text](./img/4.png?raw=true "Title")
