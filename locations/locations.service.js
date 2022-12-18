// This file holds the Business-Logic layer, interacting with Data Layer

const Location = require('./locations.model')

async function findOneByID(id)
{
  return await Location.findOne({_id: id})
}

async function findAll(){
	return await Location.find()
}

async function deleteByID(id){
	const location = await Location.findOne({_id:id})
	await location.remove()
	return "La location ayant pour id " + id + " a été supprimée avec succès."
}

async function addLocation(location){
	try {
		const newLocation = new Location(location)
		await newLocation.save();
		return newLocation;
    } catch (e) {
        throw new Error(e)
    }
}

async function modifyLocation(id,modifiedLocation){
	await Location.updateOne({ _id: id }, modifiedLocation)
	return await findOneByID(id)
}

module.exports.findAll = findAll
module.exports.findOneByID = findOneByID
module.exports.deleteByID = deleteByID
module.exports.addLocation = addLocation
module.exports.modifyLocation = modifyLocation