import mongoose from "mongoose";

const { Schema } = mongoose;

const UploadSchema = new Schema(
  {
    url: { type: String, required: true },
    filename: { type: String, required: true },
    size: { type: Number, required: false },
  },
  { _id: false }
);

const ApplicationSchema = new Schema({
  id: { type: Schema.Types.ObjectId },
  emailAddress: { type: String, required: true },
  projectName: { type: String, required: true },
  projectTweet: { type: String, required: true },
  productPitch: { type: String, required: true },
  additionalDetails: { type: String, required: false },
  referral: { type: String, required: false },
  helpfulLinks: { type: [String], required: false, default: [] },
  helpfulUploads: { type: [UploadSchema], required: false, default: [] },
  founderBackground: { type: String, required: true },
  evidenceOfExceptionalAbility: { type: String, required: true },
  discordId: { type: String, required: true },
  votes: { type: [Schema.Types.ObjectId], required: true, default: [] },
  submittedAt: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.models.Application || mongoose.model("Application", ApplicationSchema);
