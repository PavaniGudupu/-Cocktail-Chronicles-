const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();

const API_URL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/", async (req, res) => {
    try {
        const response = await axios.get(API_URL);
        const request = response.data;
        const drink = response.data.drinks[0];
        const drinkName = drink.strDrink;
        const drinkImage = drink.strDrinkThumb;
        console.log(request);
        res.render("index.ejs", {name: drinkName, image: drinkImage});
    } catch (error) {
        console.log("Failed request: ", error.message);
        res.status(500).send("Failed to fetch a random drink");
    }
});

// Route to handle AJAX request
app.get('/random-drink', async (req, res) => {
    try {
        const response = await axios.get(API_URL);
        const drink = response.data.drinks[0];
        const drinkName = drink.strDrink;
        const drinkImage = drink.strDrinkThumb;
        res.json({name: drinkName, image: drinkImage});
    } catch (error) {
        console.log("Failed request: ", error.message);
        res.status(500).json({error: "Failed to fetch a random drink"});
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000...");
});
