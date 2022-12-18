// This file is used to map API calls (Presentation Layer) with the
// Business-Logic layer

const router = require('express').Router()
const passport = require("passport");
const locationsService = require('./locations.service')

const roleMiddleware = (allowedRoles) => (req, res, next) => allowedRoles.includes(req.user?.role) ? next() : res.status(403).send()

router.get('/', (req, res) => {
    return res.status(200).send('Hello World');
});

router.get('/locations', passport.authenticate('jwt',{session:false}), async(req, res) => {
    try{
        const data = await locationsService.findAll();
        return res.status(200).json(data)
    }
    catch(error){
        return res.status(400).json({message: error.message})
    }
})

router.get('/locations/:id', passport.authenticate('jwt',{session:false}), async (req, res) => {
    try{
        const data = await locationsService.findOneByID(req.params.id);
        return res.status(200).json(data)
    }
    catch(error){
        return res.status(400).json({message: error.message})
    }
})

router.post('/locations', passport.authenticate('jwt',{session:false}), roleMiddleware(['admin']), async(req,res) => {
    try{
        const location = {
            ...req.body
        }
        const newLocation = await locationsService.addLocation(location)
        return res.status(200).json(newLocation)
    }
    catch(error)
    {
        return res.status(400).json({message: error.message})
    }
})

router.put('/locations/:id', passport.authenticate('jwt',{session:false}), roleMiddleware(['admin']), async(req,res) => {
    try{
        const modifiedLocation = {
            ...req.body
        }
        const location = await locationsService.modifyLocation(req.params.id,modifiedLocation)
        return res.status(200).json(location)
    }
    catch(error)
    {
        return res.status(400).json({message: error.message})
    }
})

router.delete('/locations/:id', passport.authenticate('jwt',{session:false}), roleMiddleware(['admin']), async(req,res) => {
    try{
        const done = await locationsService.deleteByID(req.params.id);
        return res.status(200).send(done)
    }
    catch(error){
        return res.status(400).json({message: error.message})
    }
})

module.exports = router