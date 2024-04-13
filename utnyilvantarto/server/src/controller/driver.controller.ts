import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Driver } from '../entity/Driver';
import { Controller } from "./base.controller";

export class DriverController extends Controller {

    repository = AppDataSource.getRepository(Driver);

    getDrivers = async (req: Request, res: Response) => {
        try {
            const drivers = await this.repository.find();
            res.json(drivers);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    updateDriver = async (req: Request, res: Response) => {
        try {
            const updatedDriverData = req.body;
            const driverToUpdate = await this.repository.findOne({
                where: { Id: req.body.id },
                select: [ 'Id', 'name', 'birthDate', 'address', 'licenseNumber', 'licenseExpirationDate' ]
            });
            if (!driverToUpdate) {
                return res.status(404).json({ message: 'Driver not found' });
            }
            
            Object.assign(driverToUpdate, updatedDriverData);
           
            await this.repository.save(driverToUpdate);
           
            res.json(driverToUpdate);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    

}
