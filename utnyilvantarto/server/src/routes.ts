import express from 'express';
import { CarController } from './controller/car.controller';
import { DriverController } from './controller/driver.controller';
import { RegistrationController } from './controller/registration.controller';
import { TripController } from './controller/trip.controller';
import { ReportController } from './controller/report.controller';

export function getRoutes(){

  const router = express.Router();

  /*Car.*/
  const carController = new CarController();
  router.get('/car', carController.getAll);

  /*Driver.*/
  const driverController = new DriverController();
  router.get('/driver', driverController.getAll);
  router.put('/driver/update', driverController.update);

  /*Registration.*/
  const registrationController = new RegistrationController();
  router.post('/registration/upload', registrationController.postReg);
  router.get('/user', registrationController.getAll);
  router.post('/login', registrationController.login);
  router.post('/protected_endpoint', registrationController.callProtectedEndpoint);

  /*Report.*/
  const reportController = new ReportController();
  //router.get('/car', reportController.getAll);
  //router.get('/trip', reportController.getAll);
  //router.post('/protected_endpoint', reportController.create);

  /*Trip*/
  const tripController = new TripController();
  router.get('/trip', tripController.getAll);
  router.get('/driver', tripController.getAll);
  router.get('/car', tripController.getAll);
  router.put('/trip/update', tripController.update);
  router.post('/trip/upload', tripController.create);
  


  return router;
}
