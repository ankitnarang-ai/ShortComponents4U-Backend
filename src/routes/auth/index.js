"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const index_1 = require("../../models/user/index");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.authRouter = (0, express_1.Router)();
exports.authRouter.post("/public/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, password } = req.body;
        const passwordHash = yield bcrypt_1.default.hash(password, 10);
        const user = new index_1.User({
            firstName,
            lastName,
            email,
            password: passwordHash
        });
        yield user.save();
        res.send({
            message: "User created successfully",
        });
    }
    catch (error) {
        res.status(400).send({
            message: "Error creating user",
        });
    }
}));
/** Login api */
exports.authRouter.post("/public/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield index_1.User.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }
        const isPasswordValid = yield user.isValidPassword(password);
        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, 'secret');
        res.cookie("token", token, {
            httpOnly: true,
            secure: true, // 🔒 Required when frontend != backend domain
            sameSite: 'none', // 🔄 Required for cross-origin
        });
        res.send({
            message: "Login successful",
        });
    }
    catch (error) {
        res.status(400).send({
            message: error.message
        });
    }
}));
/** Logout api */
exports.authRouter.post("/public/logout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie('token');
        res.send('Logged out successfully');
    }
    catch (error) {
        res.status(400).send(`message : ${error.message}`);
    }
}));
