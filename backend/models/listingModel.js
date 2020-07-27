const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema(
  {
    title: { type: String, required: true },
    price: { type: String, required: true, max: 8 },
    images: [
      {
        url: { type: String },
        thumbnailUrl: { type: String },
      },
    ],
    description: { type: String, required: true },
    location: {
      latitude: { type: String },
      longitude: { type: String },
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
