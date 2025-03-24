import express from "express";
import DadJoke from "../data/schema.js"; 
const router = express.Router();

router.use(express.json()); // Middleware to parse JSON bodies

router.get("/", async(req, res) => {
    const jokes = await DadJoke.find();
    return res.json(jokes);
});

router.get("/random", async (req, res) => {
    const joke = await DadJoke.aggregate([{ $sample: { size: 1 } }]);
    return res.json(joke[0]);
    
});

router.post("/", async (req, res) => {
    const newJoke = req.body.joke;    
    if (!newJoke || typeof newJoke !== 'string' || newJoke.trim() === "") {
        return res.status(400).json("Please provide a joke");
    }
    
    const joke = new DadJoke({joke: newJoke});
    await joke.save();
    return res.status(201).location('/api/dad-jokes/' + joke.id).json(joke); 
});

router.delete("/:id", async (req, res) => {
    console.log(req.params.id);
    const joke = await DadJoke.findByIdAndDelete(req.params.id);
    console.log(joke);
    if(!joke) {
        return res.status(404).json("Joke not found");
    }    
    return res.sendStatus(204);
});

export default router;