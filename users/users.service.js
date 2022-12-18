const User = require('./users.model')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config()

async function register(body)
{
	try {
		const hash = await bcrypt.hash(body.password,10);
		const username = body.username
		const role = "user";
		const user = new User({username, password : hash, role})
		return await user.save()
    } catch (e) {
        throw new Error(e)
    }
}

async function checkPassword(username,password)
{
    const user = await User.findOne({username})
    return await bcrypt.compare(password,user.password)
}

function generateToken(user){
	console.log(user.username)
    return jwt.sign({ _id: user.id, username : user.username },process.env.JWT_SECRET);
}


async function findOneByID(id)
{
  return User.findOne({_id: id}).select("-password")
}

async function findAll(){
	return await User.find().select("-password")
}

async function findOneByUsername(username)
{
    return await User.findOne({username}).select("-password")
}

async function deleteByID(id){
	const user = await User.findOne({_id:id})
	user.remove()
	console.log('Utilisateur supprimé !');
}

async function modifyUser(id,body){
	try {
		const hash = await bcrypt.hash(body.password,10);
		const username = body.username
		await User.updateOne({_id:id},{username,password: hash})
		return await findOneByID(id)

    } catch (e) {
        throw new Error(e)
    }
}

module.exports = { findOneByID, findAll, register, checkPassword, findOneByUsername, generateToken, deleteByID, modifyUser }
