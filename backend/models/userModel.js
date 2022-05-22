import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // should not be the more than one persone having same email address
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false, //an admin will have to make a user an admin not by registring
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPasswords = async function (enteredPass) {
  return await bcrypt.compare(enteredPass, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const bSalt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, bSalt);
});

const User = mongoose.model("User", userSchema);

export default User;
