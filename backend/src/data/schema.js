import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const dataJokeSchema = new Schema({
    joke: {
        type: String,
        required: true
    }
});

const DadJoke = mongoose.model('DadJoke', dataJokeSchema);
export default DadJoke;