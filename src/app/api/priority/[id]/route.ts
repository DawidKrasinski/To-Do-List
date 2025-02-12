import { NextRequest, NextResponse } from "next/server";
import { useDataSource } from "../../db/data-source";
import { Priority } from "../../db/entity/Priority";
import { Task } from "../../db/entity/Task";

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  await useDataSource();
  const { id } = context.params;
  const body = await req.json();

  try {
    await Priority.createQueryBuilder()
      .update()
      .set({ name: body.name, color: body.color, order: body.order })
      .where("id = :id", { id: parseInt(id) })
      .execute();

    return NextResponse.json(
      { message: "Priority updated successfully" },
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

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  await useDataSource();
  console.log("ID:", id);

  if (!id) {
    return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
  }

  try {
    await Priority.createQueryBuilder()
      .softDelete()
      .where("id = :id", { id: parseInt(id) })
      .execute();

    return NextResponse.json(
      { message: "Priority deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Can't use DELETE method:", error);
    return NextResponse.json(
      { error: "Can't use DELETE method" },
      { status: 500 }
    );
  }
}
