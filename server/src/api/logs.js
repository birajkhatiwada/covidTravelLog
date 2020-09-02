const {Router} = require('express');
const LogEntry = require('../models/logEntry');
const logEntry = require('../models/logEntry');
const router = Router();



router.get('/', async(req, res, next) =>{
    try {
        const entries = await LogEntry.find();
        res.json(entries);
    } catch (error) {
        next(error);
    }

});


router.post('/', async(req, res, next)=>{
    try{
        // console.log("inside router ");
        //     const logEntry = new LogEntry(req.body);
        //     const createdEntry = await logEntry.save();
        //     res.json(createdEntry);
        if(req.body.type === "create"){
            console.log("inside router ");
            const logEntry = new LogEntry(req.body);
            const createdEntry = await logEntry.save();
            res.json(createdEntry);
        }
        if(req.body.type === "delete"){
            console.log("inside delete ");
            console.log(req.body);
            await LogEntry.deleteOne({
                _id: req.body._id}
            )
            res.json("it works");
        }

    }catch(error){
        console.log("validation error");
        // console.log(error.name);
        if(error.name === 'ValidationError'){
            res.status(422);
        }

        next(error);
    }
});

module.exports = router;