// This file is used to map API calls (Presentation Layer) with the
// Business-Logic layer

const router = require('express').Router()
const usersService = require('./users.service')
const passport = require('passport');

const roleMiddleware = (allowedRoles) => (req, res, next) => allowedRoles.includes(req.user?.role) ? next() : res.status(403).send()

router.post('/users/register', async(req,res) => {
    try{
        const newUser = await usersService.register(req.body)
        return res.status(200).json(newUser)
    }
    catch(error)
    {
        return res.status(400).json({message: error.message})
    }
})


router.post('/username', passport.authenticate('local',{session:false}),  async(req,res) => {
    try{
        const user = await usersService.findOneByUsername(req.body?.username);
        return res.status(200).json(user)
    }
    catch(error)
    {
        return res.status(400).json({message: error.message})
    }   
})

router.post('/users/login', passport.authenticate('local',{session:false}),  async(req,res) => {
    try{
        const user = await usersService.findOneByUsername(req.body?.username);
        return res.status(200).json("Token: "+ await usersService.generateToken(user))
    }
    catch(error)
    {
        return res.status(400).json({message: error.message})
    }   
})

router.get('/users/me', passport.authenticate('jwt',{session:false}), async(req,res) => {
    try{
        const user = await usersService.findOneByID(req.user._id)
        //res.status(200).send("L'utilisateur a été modifié avec succès.\n")
        return res.status(200).json(user)
    }
    catch(error)
    {
        return res.status(400).json({message: error.message})
    }
})

router.put('/users/me', passport.authenticate('jwt',{session:false}), async(req,res) => {
    try{
        if(req.body.role!=null){
            return res.status(403).send("Vous n'êtes pas autorisé à modifier votre rôle !");
        }
        const user = await usersService.modifyUser(req.user._id,req.body)
        //res.status(200).send("L'utilisateur a été modifié avec succès.\n")
        return res.status(200).json(user)
    }
    catch(error)
    {
        return res.status(400).json({message: error.message})
    }
})

router.delete('/users/me', passport.authenticate('jwt',{session:false}), async(req,res) => {
    try{
        await usersService.deleteByID(req.user.id);
        return res.status(200).send("L'utilisateur ayant pour id " + req.user.id + " a été supprimé avec succès.")
    }
    catch(error){
        return res.status(400).json({message: error.message})
    }
})

router.get('/users', passport.authenticate('jwt',{session:false}),roleMiddleware(['admin']),async(req,res) => {
    try{
        const data = await usersService.findAll();
        return res.status(200).json(data)
    }
    catch(error){
        return res.status(400).json({message: error.message})
    }
})

module.exports = router