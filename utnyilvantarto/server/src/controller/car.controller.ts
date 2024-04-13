import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Car } from '../entity/Car';
import { Controller } from "./base.controller";

export class CarController extends Controller {

    repository = AppDataSource.getRepository(Car);

    getCars = async (req: Request, res: Response) => {
        try {
            const cars = await this.repository.find();
            res.json(cars);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

}
