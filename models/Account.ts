import { model, Schema } from "mongoose";

const accountSchema = new Schema(
  {
    role: {
      type: String,
      enum: ["CUSTOMER", "BUSINESS", "STAFF", "ADMIN"],
      default: "CUSTOMER",
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    profile: {
      type: String,
      default: "",
    },

    token: {
      type: String,
      default: "",
    },

    active: {
      type: Boolean,
      default: false,
    },

    visible: {
      type: Boolean,
      default: true,
    },

    code: {
      type: String,
      default: "000000",
    },
    business: {
      type: Schema.ObjectId,
      ref: "Business",
      required: false,
    },
    customer: {
      type: Schema.ObjectId,
      ref: "Customer",
      required: false,
    },
    staff: {
      type: Schema.ObjectId,
      ref: "Staff",
      required: false,
    },
  },
  { timestamps: true }
);

const Account = model("Account", accountSchema);

export default Account;
