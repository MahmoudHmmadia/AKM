import { model, Schema } from "mongoose";

const customerSchema = new Schema(
  {
    account: {
      type: Schema.ObjectId,
      ref: "Account",
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
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
