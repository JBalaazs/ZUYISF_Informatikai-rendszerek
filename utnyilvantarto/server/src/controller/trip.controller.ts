import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Trip } from '../entity/Trip';
import { Controller } from "./base.controller";

export class TripController extends Controller {

    repository = AppDataSource.getRepository(Trip);

    getTrip = async (req: Request, res: Response) => {
        try {
            const trips = await this.repository.find();
            res.json(trips);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    getCars = async (req: Request, res: Response) => {
        try {
            const cars = await this.repository.find();
            res.json(cars);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    getDrivers = async (req: Request, res: Response) => {
        try {
            const drivers = await this.repository.find();
            res.json(drivers);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    updateTrip = async (req: Request, res: Response) => {

        try{
            const updateTripData = req.body;
            const tripToUpdate = await this.repository.findOne ({
                where: { Id: req.body.id },
                select: [ 'Id', 'car', 'driver', 'startDate', 'tripType', 'startPlace', 'endPlace', 'distance', 'newMileage' ]
            });

            if(!tripToUpdate){
                return res.status(404).json({message: 'Trip not found'});
            }

            Object.assign(tripToUpdate, updateTripData);
            await this.repository.save(tripToUpdate);

            res.json(tripToUpdate);

        } catch (error){
            res.status(500).json({message: error.message});
        }

    };

    postTrip = async (req: Request, res: Response) => {

        const newTrip = new Trip();
        newTrip.car = req.body.car;
        newTrip.driver = req.body.driver;
        newTrip.startDate = req.body.startDate;
        newTrip.tripType = req.body.tripType;
        newTrip.startPlace = req.body.startPlace;
        newTrip.endPlace = req.body.endPlace;
        newTrip.distance = req.body.distance;
        newTrip.newMileage = req.body.newMileage;

        try{
            if(newTrip)
            {
                await this.repository.save(newTrip);
            }
        } catch (error) {
            res.status(500).json({message: "Hiba történt az adatok feltöltése közben."});
        }

    };

    
}
