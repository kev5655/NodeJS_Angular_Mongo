import express from "express";
import cors from "cors";
import {sample_foods, sample_tags} from "./data";

const app = express();
app.use(cors({
    credentials: true,
    origin:["http://localhost:4200"]
}))

app.get("/api/foods", (req, res) => {
    res.send(sample_foods);
})

app.get("/api/foods/search/:searchTerm", (req, res) => {
    const searchTerm = req.params.searchTerm;
    const foods = sample_foods.filter((food) => food.name.toLowerCase().includes(searchTerm.toLowerCase()));
    res.send(foods);
})

app.get("/api/foods/tags", (req, res) => {
    res.send(sample_tags);
})

app.get("/api/foods/tag/:tagName", (req, res) => {
    const foodsByTag = "All" === req.params.tagName ?
        sample_foods :
        sample_foods.filter(food => food.tags?.includes(req.params.tagName));
    res.send(foodsByTag);
})

app.get("/api/foods/:foodId", ({params}, res) => {
    const foodById = sample_foods.find(food => food.id === params.foodId);
    res.send(foodById);
})



const port = 5000;
app.listen(port , () => {
    console.log("Website served on http://localhost:" + port);
})