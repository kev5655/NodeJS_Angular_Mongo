import {Router} from "express";
import asyncHandler from "express-async-handler"
import {sample_foods, sample_tags} from "../data";
import {FoodModel} from "../modles/food.model";

const router = Router();

router.get("/seed", asyncHandler(
    async (req, res) => {
        console.log("Run Async");
        const foodsCount = await FoodModel.countDocuments();
        if (foodsCount > 0) {
            res.send("Seed is already done!");
            return;
        }

        await FoodModel.create(sample_foods);
        res.send("Seed Is Done!");
    }
))

router.get("/", asyncHandler(
    async (req, res) => {
        const foods = await FoodModel.find();
        res.send(foods);
    }
))


router.get("/search/:searchTerm", asyncHandler(
    async (req, res) => {
        const searchRegex = new RegExp(req.params.searchTerm, 'i');
        const foods = await FoodModel.find({name: {$regex: searchRegex}})
        res.send(foods);
    }));

router.get("/tag", asyncHandler(
    async (req, res) => {
        const tags = await FoodModel.aggregate([
            {
                $unwind: '$tags'
            },
            {
                $group: {
                    _id: '$tags',
                    count: {$sum: 1}
                }
            },
            {
                $project: {
                    _id: 0,
                    name: '$_id',
                    count: '$count'
                }
            }
        ]).sort({count: -1});

        const all = {
            name: 'All',
            count: await FoodModel.countDocuments()
        }

        tags.unshift(all);

        res.send(tags);
    }
));

router.get("/tag/:tagName", asyncHandler(
    async (req, res) => {
     const foodsByTag = "All" === req.params.tagName ?
         await FoodModel.find() :
         await FoodModel.find({tags: req.params.tagName});
    res.send(foodsByTag);
}));

router.get("/:foodId", asyncHandler(
    async ({params}, res) => {
        const foodById = await FoodModel.findById(params.foodId)
        res.send(foodById);
    }
));

export default router;