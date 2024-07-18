import { model, Schema } from "mongoose";

const staffSchema = new Schema(
  {
    account: {
      type: Schema.ObjectId,
      ref: "Account",
      required: true,
    },
    business: {
      type: Schema.ObjectId,
      ref: "Business",
      required: true,
    },
    goals: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Staff = model("Staff", staffSchema);

export default Staff;
