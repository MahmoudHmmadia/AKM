import { compare, hash } from "bcryptjs";
import { Request, Response } from "express";
import { default as Account, default as User } from "../models/Account";
import {
  editBusiness,
  editCustomer,
  editStaff,
} from "../services/editingProfile";
import {
  clientErrorResponse,
  NO_OLD_PASS,
  NOT_FOUND_DATA_MESSAGE,
  serverErrorResponse,
  successResponse,
  UPDATED_DATA_MESSAGE,
  WRONG_OLD_PASS,
} from "../utils/responses";

export async function editAccount(req: Request, res: Response) {
  try {
    const { name, password, id, oldPassword, phoneNumber } = req.body;

    const oldAccount = await User.findById(id);

    if (!oldAccount) {
      return clientErrorResponse(res, NOT_FOUND_DATA_MESSAGE);
    }

    if (
      phoneNumber &&
      ((oldAccount.role != "CUSTOMER" && oldAccount.role != "BUSINESS") ||
        oldAccount.active)
    )
      return clientErrorResponse(res, {
        en: "you cant change phone number",
        ar: "لا يمكنك تغيير رقم الهاتف",
      });

    let hashed: string = "";

    if (password) {
      if (oldPassword) {
        const pass = await compare(oldPassword, oldAccount.password);
        if (!pass) {
          return clientErrorResponse(res, WRONG_OLD_PASS);
        }
        hashed = await hash(password, 10);
      } else {
        return clientErrorResponse(res, NO_OLD_PASS);
      }
    }

    await Account.findByIdAndUpdate(id, {
      password: hashed ? hashed : oldAccount.password,
      name,
      profile: req.file
        ? `${process.env.IMAGES_URL}/profiles/${req.file.filename}`
        : oldAccount.profile,
      phoneNumber,
    });

    if (oldAccount.role == "CUSTOMER") {
      await editCustomer(req, oldAccount);
    }
    if (oldAccount.role == "BUSINESS") {
      await editBusiness(req, oldAccount);
    }
    if (oldAccount.role == "STAFF") {
      await editStaff(req, oldAccount);
    }

    const account = await Account.findById(id).populate(
      oldAccount.role.toLowerCase()
    );

    return successResponse(res, {
      data: account,
      ...UPDATED_DATA_MESSAGE,
    });
  } catch (err) {
    return serverErrorResponse(res, err);
  }
}

export async function changeAccountVisibleStatus(req: Request, res: Response) {
  try {
    const { visible, id } = req.body;

    const oldAccount = await Account.findById(id);

    if (!oldAccount) {
      return clientErrorResponse(res, NOT_FOUND_DATA_MESSAGE);
    }

    await User.findByIdAndUpdate(id, {
      visible,
    });

    const account = await Account.findById(id).populate(
      oldAccount.role.toLowerCase()
    );

    return successResponse(res, {
      data: account,
      ...UPDATED_DATA_MESSAGE,
    });
  } catch (err) {
    return serverErrorResponse(res, err);
  }
}
