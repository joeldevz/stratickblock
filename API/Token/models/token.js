import mongoose, { Schema } from "mongoose";
const TokensSchema = new Schema({
  name: { type: String, required: true, unique: true },
  symbol: { type: String, required: true, unique: true },
  usd: { type: Object, required: true },
});

export default mongoose.models.Token || mongoose.model("Token", TokensSchema);
