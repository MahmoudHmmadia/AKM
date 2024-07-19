import { model, Schema } from "mongoose";

const customerSchema = new Schema(
  {
    account: {
      type: Schema.ObjectId,
      ref: "Account",
    },
    interests: {
      type: Array,
      default: [],
    },
    socialLinks: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Customer = model("Customer", customerSchema);

export default Customer;
