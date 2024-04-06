const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const cors = require('cors');
const { end } = require('@popperjs/core');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'utvonaliranyitas'
});

db.connect((err) => {
    if (err) 
    {

        throw err;

    }
    console.log('MySQL connected');
});

app.get('/', (req, res) => {
    res.send('Hello from server!');
});

app.get('/api/data/drivers', (req, res) => { /*Drivers adatinak elérése.*/
    let sql = 'SELECT * FROM drivers';
    db.query(sql, (err, result) => {

        if (err) throw err;
        res.json(result);

    });
});

app.put('/api/data/drivers/update', (req, res) => { /*Drivers adatainak felülírása.*/
  const { Id, name, birthDate, address, licenseNumber, licenseExpirationDate } = req.body;
  const sql = `UPDATE drivers SET name=?, birthDate=?, address=?, licenseNumber=?, licenseExpirationDate=? WHERE Id=?`;
  db.query(sql, [name, birthDate, address, licenseNumber, licenseExpirationDate, Id], (err, result) => {
    if (err) 
    {

        res.status(500).json({message: "Hiba történt az adatok frissítése közben."});
        
    } 
    else 
    {

      res.status(200).json({message: "Az adatok sikeresen frissítve lettek."});

    }
  });
});  

app.get('/api/data/cars', (req, res) => { /*Cars adatinak elérése.*/
    let sql = 'SELECT * FROM cars';
    db.query(sql, (err, result) => {

        if (err) throw err;
        res.json(result);

    });
});

app.post('/api/data/trips/upload', (req, res) =>{ /*Trips feltöltése.*/
    const { car, driver, startDate, tripType, startPlace, endPlace, distance, newMileage } = req.body;
    const sql = 'INSERT INTO trips(car, driver, startDate, tripType, startPlace, endPlace, distance, newMileage) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [car, driver, startDate, tripType, startPlace, endPlace, distance, newMileage], (err, result) => {
        if(err)
        {

            res.status(500).json({message: "Hiba történt az adatok feltöltése közben."});

        }
        else
        {

            res.status(200).json({message: "Az adatok sikeresen fel lettek töltve."});

        }
    });
});

app.get('/api/data/trips', (req, res) => { /*Trips adatinak elérése.*/
    let sql = 'SELECT * FROM trips';
    db.query(sql, (err, result) => 
    {

        if (err) throw err;
        res.json(result);

    });
});

app.put('/api/data/trips/update', (req, res) => { /*Trips adatainak felülírása.*/
  const { Id, car, driver, startDate, tripType, startPlace, endPlace, distance, newMileage } = req.body;
  const sql = `UPDATE trips SET car=?, driver=?, startDate=?, tripType=?, startPlace=?, endPlace=?, distance=?, newMileage=? WHERE Id=?`;
  db.query(sql, [car, driver, startDate, tripType, startPlace, endPlace, distance, newMileage, Id], (err, result) => 
  {
    if (err) 
    {

        res.status(500).json({message: "Hiba történt az adatok frissítése közben."});

    } 
    else 
    {

      res.status(200).json({message: "Az adatok sikeresen frissítve lettek."});

    }
  });
});

const jwt = require('jsonwebtoken');

app.post('/api/data/registration/upload', (req, res) =>{ /*Regisztráció feltöltése.*/
    const { username, password } = req.body;
    const sql = 'INSERT INTO users(username, password) VALUES (?, ?)';
    db.query(sql, [username, password], (err, result) => 
    {
        if(err)
        {

            res.status(500).json({message: "Hiba történt az adatok feltöltése közben."});

        }
        else
        {

            const jwtToken = jwt.sign({ username }, 'secret_key', {expiresIn: '100y'});

            res.status(200).json({ jwtToken });

        }
    });
});

app.post('/api/data/login', (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => { /*Keressük meg az adatbázisban a felhasználót a megadott felhasználónév alapján.*/
        if (err) 
        {

            res.status(500).json({ message: 'Hiba történt a bejelentkezés során.' });

        }
        else /*Ha találtunk egyezést a felhasználónévre és jelszóra az adatbázisban.*/
        {

            if (results.length > 0) 
            
            {
                const user = results[0];
                const jwtToken = jwt.sign({ username }, 'secret_key', { expiresIn: '100y' }); /*Generáljunk egy JWT tokent és küldjük vissza*/
                res.status(200).json({ jwtToken });

            } else 
            {

                res.status(401).json({ message: 'Sikertelen bejelentkezés. Hibás felhasználónév vagy jelszó.' }); /*Ha nem találtunk egyezést a felhasználónévre és jelszóra az adatbázisban.*/

            }

        }
    });
});


app.get('/api/data/registration', (req, res) => { /*Regisztráció adatinak elérése.*/
    let sql = 'SELECT * FROM users';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.post('/api/data/protected_endpoint', (req, res) => {
    
    const token = req.headers.authorization.split(' ')[1]; /*A token-t darbolni kell.*/

    try 
    {

        const decodedToken = jwt.verify(token, 'secret_key'); /*Dekódolás.*/

        res.status(200).json({ message: 'A token érvényes.' });

    } 
    catch (error) 
    {

        res.status(401).json({ message: 'Érvénytelen token vagy hiba történt az ellenőrzés során.' });

    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
