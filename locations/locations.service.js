// This file holds the Business-Logic layer, interacting with Data Layer

const Location = require('./locations.model')

async function findOneByID(id)
{
  return Location.findOne({_id: id})
}

async function findAll(){
	return Location.find()
}

async function deleteByID(id){
	const location = await Location.findOne({_id:id})
	location.remove()
	return "La location ayant pour id " + id + " a été supprimée avec succès."
}

async function addLocation(location){
	const newLocation = new Location(location)
	newLocation.save();
	console.log('Location ajoutée !');
	return newLocation;
}

function modifyLocation(id,modifiedLocation){
  return Location.updateOne({ _id: id }, modifiedLocation)
}

module.exports.findAll = findAll
module.exports.findOneByID = findOneByID
module.exports.deleteByID = deleteByID
module.exports.addLocation = addLocation
module.exports.modifyLocation = modifyLocation