import * as yup from "yup";

enum RoleEnum {
  CUSTOMER = "CUSTOMER",
  BUSINESS = "BUSINESS",
  STAFF = "STAFF",
  ADMIN = "ADMIN",
}

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const registerUserSchema = yup
  .object({
    email: yup.string().email().required().trim(),
    role: yup
      .string()
      .oneOf([RoleEnum.CUSTOMER, RoleEnum.STAFF, RoleEnum.BUSINESS]),
    password: yup
      .string()
      .matches(PASSWORD_REGEX, "password does not meet strong requirement")
      .required(),
  })
  .required();
