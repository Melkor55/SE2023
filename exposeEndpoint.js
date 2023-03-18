var express = require('express');
var router = express.Router();

const inferenta = require('./inferenta/inferenta');
router.route('/inferenta').get((request, response) => {
    response.send('use POST request')
});

// Assign route
router.route('/inferenta').post((request, response) => {
    // console.log(request.body);
    inferenta.inferenta(request.body).then( result => {
        const car = result;
        console.log(car);
        if (!car)
        {
            response.statusMessage = "Car not found !"
            response.status(404).json(car);
        }
        else
        {
            response.statusMessage = "Car found !"
            response.status(202).json(car);
        }
    });
});

module.exports = router;