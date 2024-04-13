import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Report } from '../../../src/app/models/Report';
import { Controller } from "./base.controller";

export class ReportController extends Controller {

    repository = AppDataSource.getRepository(Report);

    getCars = async (req: Request, res: Response) => {
        try {
            const cars = await this.repository.find();
            res.json(cars);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    getTrip = async (req: Request, res: Response) => {
        try {
            const trips = await this.repository.find();
            res.json(trips);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

}
