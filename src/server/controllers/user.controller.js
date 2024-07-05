import User from "../models/user.model.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

async function modifyProfile(req, res) {
  const { userId } = req.params;
  const { name, password } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    if (name) user.name = name;
    if (password) {
      // Generar un hash de la nueva contraseña
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      user.password = hashedPassword; // Guardar la contraseña hasheada
    }

    await user.save();
    res.status(200).send({ message: "Profile updated successfully", user });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error updating profile", error: error.message });
  }
}

async function deleteAccount(req, res) {
  const { userId } = req.params;

  try {
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({ message: "Account deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error deleting account", error: error.message });
  }
}

export { modifyProfile, deleteAccount };
