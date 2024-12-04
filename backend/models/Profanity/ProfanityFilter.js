import mongoose from "mongoose";

const profanityFilterSchema = new mongoose.Schema({
  bannedWords: [String],
});

export const ProfanityFilter = mongoose.model(
  "ProfanityFilter",
  profanityFilterSchema
); 