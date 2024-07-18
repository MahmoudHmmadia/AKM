import { model, Schema } from "mongoose";

const businessSchema = new Schema(
  {
    account: {
      type: Schema.ObjectId,
      ref: "Account",
      required: true,
    },

    staff: [
      {
        type: Schema.ObjectId,
        ref: "Staff",
      },
    ],

    contactNumber: {
      type: String,
      required: true,
    },
    operatingHours: {
      type: String,
      default: "",
    },
    socialLinks: {
      type: Array,
      default: [],
    },
    category: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Business = model("Business", businessSchema);

export default Business;
