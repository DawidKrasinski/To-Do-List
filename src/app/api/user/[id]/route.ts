import { NextRequest, NextResponse } from "next/server";
import { useDataSource } from "../../db/data-source";
import { User } from "../../db/entity/User";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  await useDataSource();
  try {
    const user = await User.findOneBy({
      localStorageId: context.params.id,
    });
    return NextResponse.json(user);
  } catch (error) {
    console.log("cant use get method", error);
    return NextResponse.json({ error: "cant use get method" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  await useDataSource();
  const { id } = context.params;
  console.log("id: ", id);
  const body = await req.json();

  try {
    await User.createQueryBuilder()
      .update()
      .set({ name: body.name, theme: body.theme, photo: body.photo })
      .where("localStorageId = :id", { id: id })
      .execute();

    return NextResponse.json(
      { message: "Task updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Can't use PUT method:", error);
    return NextResponse.json(
      { error: "Can't use PUT method" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } }
) {
  await useDataSource();
  const { id } = context.params;
  const body = await req.json();

  try {
    await User.createQueryBuilder()
      .update()
      .set({
        backgroundColor: body.background,
        fieldColor: body.field,
        textColor: body.text,
        navBarColor: body.navBarColor,
      })
      .where("localStorageId = :id", { id: id })
      .execute();

    return NextResponse.json(
      { message: "User updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Can't use PUT method:", error);
    return NextResponse.json(
      { error: "Can't use PUT method" },
      { status: 500 }
    );
  }
}
