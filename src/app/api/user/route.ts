import { NextRequest, NextResponse } from "next/server";
import { useDataSource } from "../db/data-source";
import { User } from "../db/entity/User";

export async function POST(req: NextRequest) {
  await useDataSource();

  try {
    const body = await req.json();

    const user = new User(body.localStorageId, "defaultName", "/", "dark");
    await user.save();
    return NextResponse.json({}, { status: 201 });
  } catch (error) {
    console.log("cant use POST method", error);
    return NextResponse.json(
      { error: "cant use POST method" },
      { status: 500 }
    );
  }
}

//.
