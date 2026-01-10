import DBconnect from "../db/DBconnect.js";
import Event from "../model/event.model.js";

export async function GET() {
  await DBconnect();

  const events = await Event.find({}).sort({ date: -1 });
  return Response.json(events);
}
