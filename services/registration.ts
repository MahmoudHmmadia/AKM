import { Request } from "express";
import Business from "../models/Business";
import Customer from "../models/Customer";
import Staff from "../models/Staff";

export async function createStaff(req: Request, account: any) {
  const { goals, business } = req.body;

  const staff = await Staff.create({
    goals: typeof goals == "string" ? JSON.parse(goals) : goals,
    business,
    account: account._id,
  });

  return staff;
}
export async function createCustomer(req: Request, account: any) {
  const { phoneNumber, interests, socialLinks } = req.body;
  const customer = await Customer.create({
    phoneNumber,
    interests: typeof interests == "string" ? JSON.parse(interests) : interests,
    socialLinks:
      typeof socialLinks == "string" ? JSON.parse(socialLinks) : socialLinks,
    account: account._id,
  });

  return customer;
}
export async function createBusiness(req: Request, account: any) {
  const { contactNumber, operatingHours, socialLinks, category, address } =
    req.body;

  const business = await Business.create({
    contactNumber,
    operatingHours,
    socialLinks:
      typeof socialLinks == "string" ? JSON.parse(socialLinks) : socialLinks,
    category,
    address,
    account: account._id,
  });

  return business;
}
