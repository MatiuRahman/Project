import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin user",
    email: "ali@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Jana",
    email: "jana@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "alia",
    email: "alia@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "try",
    email: "try@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
