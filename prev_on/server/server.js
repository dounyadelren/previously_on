import fetch from 'node-fetch';
import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
const app = express()
const apiPort = 8000
dotenv.config()

app.use(cors())

app.get('/',  (req, res) => {
    fetch(`https://api.betaseries.com/oauth/access_token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&redirect_uri=${process.env.REDIRECT_URI}&code=${req.query.code}`, {method: 'POST'})
        .then(res => res.json())
        .then(data => {     
            res.redirect(`http://localhost:3000/accueil/${data.access_token}`)
        })
})

app.listen(apiPort, () => console.log(`Server running on port http://localhost:${apiPort}`))