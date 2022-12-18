const locationsService = require('./locations.service')
const Location = require('./locations.model')
jest.mock('./locations.model')

beforeEach(() => {
    jest.resetAllMocks()
})

describe('Locations getLocations', () => {
    it('Should call model find', async () => {
        Location.find.mockResolvedValue([1,2,3,4])
        expect(await locationsService.findAll()).toEqual([1,2,3,4])
        expect(Location.find).toHaveBeenCalledTimes(1)
    })
})

describe('Locations FindOne',()=>{
    it('Should get a location', async()=>{
        const mockLocation ={
            _id: '789411ec17dfkdimpok1409', filmName:'Tintin en Biélorusie'
        }
        Location.findOne.mockResolvedValue(mockLocation)

        expect(await locationsService.findOneByID('789411ec17dfkdimpok1409')).toEqual(mockLocation)
        expect(Location.findOne).toHaveBeenCalledTimes(1)
    })
})

describe('Locations AddLocation', () =>{

    it('Should add a new location to the database', async () => {
        const newLocation = { filmName: 'Tintin au Qatar'};
        const save = jest.fn().mockResolvedValue();
        Location.mockImplementation(() => ({
            save
        }));
    
        await locationsService.addLocation(newLocation);
        expect(Location).toHaveBeenCalledWith(newLocation);
    });
})

describe('Locations Modify',()=>{
    it('Should modify a location', async()=>{
        let mockLocation ={
            _id: '789411ec17dfkdimpok1409', filmName:'Tintin en Biélorusie'
        }
        const modifiedLocation ={
            filmName:'Tintin en Chine'
        }
        Location.updateOne.mockResolvedValue(mockLocation)
        await locationsService.modifyLocation(mockLocation.id,modifiedLocation)
        expect(Location.updateOne).toHaveBeenCalledTimes(1)
    })

})

describe('Locations Delete', () => {
    it('Should delete a Location', async () => {
        const mockLocation = {_id: 'okpj51654efnk', filmName: 'Tintin en Zambie', remove: jest.fn().mockReturnValue(true)}
        const id = mockLocation._id
        Location.findOne.mockResolvedValue(mockLocation)
        expect(await locationsService.deleteByID(mockLocation._id)).toEqual("La location ayant pour id " + id + " a été supprimée avec succès.")
    })
})