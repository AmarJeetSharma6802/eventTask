export const runtime = "nodejs";

import DBconnect from "../db/DBconnect.js";
import Subscriber from "../model/subscriber.model.js";
import { NextResponse } from "next/server";


export async function POST(req) {
  await DBconnect();

  const { email, eventUrl } = await req.json();

  if (!email || !eventUrl) {
    return NextResponse.json(
      { error: "Missing data" },
      { status: 400 }
    );
  }

  await Subscriber.create({ email, eventUrl });

  return NextResponse.json({ redirect: eventUrl });
}
