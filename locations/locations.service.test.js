const locationsService = require('./locations.service')
const Location = require('./locations.model')
jest.mock('./locations.model')

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

/*describe('Locations Add',()=>{
    it('Should get a location', async()=>{
        const mockLocation ={
            _id: '789411ec17dfkdimpok1409', filmName:'Tintin en Biélorusie'
        }
        Location.findOne.mockResolvedValue(mockLocation)

        expect(await locationsService.findOneByID('789411ec17dfkdimpok1409')).toEqual(mockLocation)
        expect(Location.findOne).toHaveBeenCalledTimes(1)
    })
})

describe('Locations Delete',()=>{
    it('Should get a location', async()=>{
        const mockLocation ={
            _id: '789411ec17dfkdimpok1409', filmName:'Tintin en Biélorusie'
        }
        Location.findOne.mockResolvedValue(mockLocation)

        expect(await locationsService.deleteByID('789411ec17dfkdimpok1409')).toEqual("La location ayant pour id " + req.params.id + " a été supprimée avec succès.")
        expect(Location.findOne).toHaveBeenCalledTimes(1)
    })
})

describe('Locations Modify',()=>{
    it('Should get a location', async()=>{
        let mockLocation ={
            _id: '789411ec17dfkdimpok1409', filmName:'Tintin en Biélorusie'
        }
        const newLocation ={
            _id: '789411ec17dfkdimpok1409', filmName:'Tintin en Chine'
        }
        Location.updateOne.mockResolvedValue(mockLocation)

        expect(await locationsService.modifyLocation('789411ec17dfkdimpok1409',newLocation)).toEqual(mockLocation)
        expect(Location.updateOne).toHaveBeenCalledTimes(1)
    })
})*/