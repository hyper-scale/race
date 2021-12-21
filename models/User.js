import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  id: { type: Schema.Types.ObjectId },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String },
  discordId: { type: String },
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
