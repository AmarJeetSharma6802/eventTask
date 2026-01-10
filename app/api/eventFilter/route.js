import DBconnect from "../db/DBconnect.js";
import Event from "../model/event.model.js";

export async function GET(req) {
  await DBconnect();

  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  const query = {
    date: { $gte: new Date() },
  };

  if (category && category !== "All") {
    query.category = category;
  }

  const events = await Event.find(query).sort({ date: 1 });
  return Response.json(events);
}
