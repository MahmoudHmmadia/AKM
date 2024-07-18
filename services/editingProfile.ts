import { Request } from "express";
import Business from "../models/Business";
import Customer from "../models/Customer";
import Staff from "../models/Staff";

export async function editCustomer(req: Request, account: any) {
  const { interests, socialLinks } = req.body;
  const customer = await Customer.findByIdAndUpdate(account.customer, {
    interests: typeof interests == "string" ? JSON.parse(interests) : interests,
    socialLinks:
      typeof socialLinks == "string" ? JSON.parse(socialLinks) : socialLinks,
  });

  return customer;
}

export async function editBusiness(req: Request, account: any) {
  const {
    contactNumber,
    operatingHours,
    socialLinks,
    category,
    address,
    staff,
  } = req.body;

  const business = await Business.findByIdAndUpdate(account.business, {
    contactNumber,
    operatingHours,
    socialLinks:
      typeof socialLinks == "string" ? JSON.parse(socialLinks) : socialLinks,
    category,
    address,
    staff: typeof staff == "string" ? JSON.parse(staff) : staff,
  });

  return business;
}

export async function editStaff(req: Request, account: any) {
  const { goals } = req.body;

  const staff = await Staff.findByIdAndUpdate(account.staff, {
    goals: typeof goals == "string" ? JSON.parse(goals) : goals,
  });

  return staff;
}
