import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';
import { Controller } from "./base.controller";
import jwt from 'jsonwebtoken';

export class RegistrationController extends Controller {

    repository = AppDataSource.getRepository(User);

    jwt = require('jsonwebtoken');
    
    postReg = async (req: Request, res: Response) => {
        const newUser = new User();
        newUser.username = req.body.username;
        newUser.password = req.body.password;

        try {
            const savedUser = await this.repository.save(newUser);
            const jwtToken = jwt.sign({ username: savedUser.username }, 'secret_key', { expiresIn: '1h' });
            res.status(200).json({ jwtToken });
        } catch (error) {
            res.status(500).json({ message: "Hiba történt az adatok feltöltése közben." });
        }
    };

    getUser = async (req: Request, res: Response) => {
        try {
            const users = await this.repository.find();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    login = async (req: Request, res: Response) => {
        try {
            const user = await this.repository.findOne({
                where: { username: req.body.username },
                select: [ 'Id', 'password' ]
            });
  
            if (!user) {
                res.status(500).json({ message: 'Hiba történt a bejelentkezés során.' });
            }
  
            const findUserPass = (req.body.password === user.password);
            if (findUserPass) {

                const token = jwt.sign({ username: user.username }, 'secret_key', { expiresIn: '1h' }); /*Generáljunk egy JWT tokent és küldjük vissza*/
                res.json({ jwtToken: token });
            }
            else
            {

                res.status(401).json({ message: 'Sikertelen bejelentkezés. Hibás felhasználónév vagy jelszó.' }); /*Ha nem találtunk egyezést a felhasználónévre és jelszóra az adatbázisban.*/

            }
  
        } catch (err) {
            this.handleError(res, err);
        }
    };

    callProtectedEndpoint = async (req: Request, res: Response) => {

        const token = req.headers.authorization.split(' ')[1];

        try{
            const decodedToken = jwt.verify(token, 'secret_key');

            console.log(decodedToken);
            res.status(200).json({message: 'A token érvényes'});
        } catch (error){
            res.status(401).json({message: 'Érvénytelen token vagy hiba történt az ellenőrzés során.'})
        }

    };

}
