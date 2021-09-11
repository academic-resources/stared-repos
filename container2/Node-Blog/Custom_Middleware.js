let upperName = {};


function uppercase(req, res, next) {
    if (req.body.name.length > 128){
        res
        .status(400)
        .json({
            message: "A Hobbit's name cannot be longer than 128 characters. That's just superfluous."
        })
    } else {
        upperName.name = req.body.name
        .toLowerCase().split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
        next();
    }
}

function userLength(req, res, next) {
    console.log('name length',upperName.name.length);
}

module.exports = {uppercase, upperName};