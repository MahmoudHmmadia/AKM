// seeders/admin-seeder.js
import bcrypt from "bcryptjs";
import { config } from "dotenv";
import mongoose from "mongoose";
import Account from "../models/Account";

config();

async function seedAdmin() {
  // Connect to the database
  await mongoose.connect(process.env.DB_URL!, { dbName: "AKM" });

  // Check if admin already exists
  const existingAdmin = await Account.findOne({ role: "ADMIN" });

  if (!existingAdmin) {
    // Create admin credentials
    const adminCredentials = {
      email: "AKM_ADMIN",
      password: "akm123",
      role: "ADMIN",
      name: "admin",
      phone: "admin",
      code: "admin",
      active: true,
    };

    // Hash the admin password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminCredentials.password, salt);
    adminCredentials.password = hashedPassword;

    // Create admin user
    await Account.create(adminCredentials);

    console.log("Admin user created successfully");
  } else {
    console.log("Admin user already exists");
  }

  // Close the database connection
  await mongoose.disconnect();
}

// Execute the admin seeder
seedAdmin();
