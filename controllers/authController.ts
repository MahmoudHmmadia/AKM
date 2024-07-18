import { compare, hash } from "bcryptjs";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { default as Account, default as User } from "../models/Account";
import {
  createBusiness,
  createCustomer,
  createStaff,
} from "../services/registration";
import {
  clientErrorResponse,
  CONFIRMED,
  CONFLICT,
  DES_ACTIVE,
  INVALID_EMAIL,
  INVALID_PASSWORD,
  LOGOUT,
  NOT_CONFIRMED,
  NOT_FOUND_DATA_MESSAGE,
  serverErrorResponse,
  successResponse,
  UPDATED_DATA_MESSAGE,
} from "../utils/responses";
export async function register(req: Request, res: Response) {
  try {
    const { role, email, name, password } = req.body;

    const isExist = await Account.findOne({ email });

    if (isExist) return clientErrorResponse(res, CONFLICT, 409);

    const hashedPassword = await hash(password, 10);

    const token = sign({ email }, process.env.SECRET!);

    const account = await Account.create({
      role,
      email,
      name,
      password: hashedPassword,
      token,
      profile: req.file
        ? process.env.IMAGES_URL + "/accounts" + req.file?.filename
        : "",
    });

    if (role == "CUSTOMER") {
      const customer = await createCustomer(req, account);
      account.customer = customer._id;
      await account.save();
    } else if (role == "STAFF") {
      const staff = await createStaff(req, account);
      account.staff = staff._id;
      await account.save();
    } else if (role == "BUSINESS") {
      const business = await createBusiness(req, account);
      account.business = business._id;
      await account.save();
    }
    const updatedAccount = await Account.findOne({ email }).populate(
      account.role.toLowerCase()
    );

    return successResponse(res, updatedAccount);
  } catch (err) {
    return serverErrorResponse(res, err);
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const account = await Account.findOne({ email });

    if (!account) return clientErrorResponse(res, INVALID_EMAIL, 401);

    const match = await compare(password, account.password);

    if (!match) {
      return clientErrorResponse(res, INVALID_PASSWORD, 401);
    }

    if (!account.active) return clientErrorResponse(res, DES_ACTIVE, 401);

    const token = sign({ email }, process.env.SECRET!);

    account.token = token;

    await account.save();
    let data: any;
    if (account.role == "CUSTOMER") {
      data = await Account.findOne({ email }).populate("customer");
    }
    if (account.role == "STAFF") {
      data = await Account.findOne({ email }).populate("staff");
    }
    if (account.role == "BUSINESS") {
      data = await Account.findOne({ email }).populate("business");
    }

    return successResponse(res, data);
  } catch (err) {
    return serverErrorResponse(res, err);
  }
}

export async function checkOtp(req: Request, res: Response) {
  try {
    const { code, email } = req.body;

    const account = await Account.findOne({ email });

    if (!account) {
      return clientErrorResponse(res, NOT_FOUND_DATA_MESSAGE);
    }

    if (code === account.code) {
      account.active = true;
      account.save();
      return successResponse(res, CONFIRMED);
    }

    return clientErrorResponse(res, NOT_CONFIRMED);
  } catch (err) {
    return serverErrorResponse(res, err);
  }
}

export async function logout(req: Request, res: Response) {
  try {
    const { id } = req.body;

    const account = await Account.findById(id);

    if (!account) {
      return clientErrorResponse(res, NOT_FOUND_DATA_MESSAGE);
    }

    account.token = "";
    account.save();
    return successResponse(res, LOGOUT);
  } catch (err) {
    return serverErrorResponse(res, err);
  }
}

export async function resetPassword(req: Request, res: Response) {
  try {
    const { id } = req.body;

    const account = await Account.findById(id);

    if (!account) return clientErrorResponse(res, NOT_FOUND_DATA_MESSAGE);

    const defaultPassword = "DEFAULT_PASSWORD";

    account.password = defaultPassword;

    await account.save();

    const updatedAccount = await User.findById(id);

    return successResponse(res, {
      data: updatedAccount,
      ...UPDATED_DATA_MESSAGE,
    });
  } catch (err) {
    return serverErrorResponse(res, err);
  }
}
