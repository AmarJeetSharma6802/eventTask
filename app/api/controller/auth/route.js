export const runtime = "nodejs";

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import realForm from "../../model/user.model.js";
import transporter from "../../utils/nodemailer.js";
import DBconnect from "../../db/DBconnect.js";

export async function POST(req) {
  await DBconnect();

  const body = await req.json();
  const { name, email, password, otp, action } = body;

  if (action === "register") {
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields required" },
        { status: 400 }
      );
    }

    const exists = await realForm.findOne({ email });
    if (exists) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otpCode, 10);

    await realForm.create({
      name,
      email,
      password: hashedPassword,
      emailOtp: hashedOtp,
      emailOtpExpires: Date.now() + 5 * 60 * 1000,
    });

    await transporter.sendMail({
      from: `"My App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify your email",
      html: `
        <h3>Your OTP is <b>${otpCode}</b></h3>
        <p>Valid for 5 minutes</p>
      `,
    });

    return NextResponse.json(
      {
        message: "Registered successfully. OTP sent",
        next: "verify_otp",
      },
      { status: 201 }
    );
  }

  if (action === "verify_otp") {
    if (!email || !otp) {
      return NextResponse.json(
        { message: "Email and OTP required" },
        { status: 400 }
      );
    }

    const user = await realForm.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    if (!user.emailOtp || user.emailOtpExpires < Date.now()) {
      return NextResponse.json(
        { message: "OTP expired" },
        { status: 400 }
      );
    }

    const isValid = await bcrypt.compare(otp, user.emailOtp);
    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid OTP" },
        { status: 400 }
      );
    }

    user.emailOtp = undefined;
    user.emailOtpExpires = undefined;

    const accessToken = jwt.sign(
      { id: user._id },
      process.env.ACCESSTOKEN,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESHTOKEN,
      { expiresIn: "7d" }
    );

    user.refreshToken = refreshToken;
    await user.save();

    const res = NextResponse.json({
      message: "OTP verified. Logged in",
      redirect: "/home",
    });

    res.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 15 * 60,
      path: "/",
    });

    res.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return res;
  }

  if (action === "login") {
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password required" },
        { status: 400 }
      );
    }

    const user = await realForm.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );
    }

    const accessToken = jwt.sign(
      { id: user._id },
      process.env.ACCESSTOKEN,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESHTOKEN,
      { expiresIn: "7d" }
    );

    user.refreshToken = refreshToken;
    await user.save();

    const res = NextResponse.json({
      message: "Login successful",
      redirect: "/home",
    });

    res.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 15 * 60,
      path: "/",
    });

    res.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return res;
  }

  return NextResponse.json(
    { message: "Invalid action" },
    { status: 400 }
  );
}
