import { Response } from "express";

export function serverErrorResponse(res: Response, err: any) {
  console.log(err);

  res.status(500).json({ message: err.message ? err.message : err });
}

export function clientErrorResponse(
  res: Response,
  { en, ar }: { en: string; ar: string },
  status: number = 400,
  data?: any
) {
  return res.status(status).json({ enMessage: en, arMessage: ar, data });
}

export function successResponse(
  res: Response,
  data: any,
  status: number = 200
) {
  return res.status(status).json({ materials: data, message: "success" });
}

export const NOT_FOUND_DATA_MESSAGE = {
  en: "data not found",
  ar: "البيانات غير موجود",
};

export const UPDATED_DATA_MESSAGE = {
  enMessage: "Data Updated Successfully",
  arMessage: "تم تعديل البيانات بنجاح",
};

export const CREATED_DATA_MESSAGE = {
  enMessage: "Data Created Successfully",
  arMessage: "تم إنشاء البيانات بنجاح",
};

export const DELETED_DATA_MESSAGE = {
  enMessage: "data deleted successfully",
  arMessage: "تم حذف البيانات بنجاح",
};

export const NO_PERMISSIONS_MESSAGE = {
  en: "Permissions",
  ar: "ليس لديك صلاحيات",
};

export const CONFLICT = {
  en: "The Email Already Exist",
  ar: "البريد الالكتروني موجود لدينا",
};

export const INVALID_EMAIL = {
  en: "invalid email",
  ar: "البريد الإلكتروني غير صحيح",
};

export const INVALID_PASSWORD = {
  en: "Invalid Password",
  ar: "كلمة السر غير صحيحة",
};

export const DES_ACTIVE = {
  ar: "لم يتم تأكيد حسابك بعد",
  en: "Your account has not been confirmed yet",
};

export const CONFIRMED = {
  arMessage: "تم التأكيد بنجاح",
  enMessage: "Confirmed successfully",
};

export const NOT_CONFIRMED = {
  ar: "لقد قمت بارسال رمز خاطئ",
  en: "You have sent an incorrect code",
};

export const LOGOUT = {
  arMessage: "تم تسجيل الخروج بنجاح",
  enMessage: "logout successfully",
};

export const WRONG_OLD_PASS = {
  en: "Old Password Not Match",
  ar: "كلمة السر القديمة خاطئة",
};

export const NO_OLD_PASS = {
  en: "Old Password Not Match",
  ar: "كلمة السر القديمة خاطئة",
};
