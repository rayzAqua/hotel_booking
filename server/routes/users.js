import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user_controller.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express();

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//     res.send("You are logged in.")
// });

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//     res.send("You are user, user can delete user's acccount.")
// });

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//     res.send("You are admin, admin can do everything.")
// });

// UPDATE
router.put("/:id", verifyUser, updateUser);

// DELETE
router.delete("/:id" , verifyUser, deleteUser);

// GET ONE
router.get("/id=:id", verifyUser, getUser);

// GET ALL
router.get("/", verifyAdmin, getUsers);

export default router;