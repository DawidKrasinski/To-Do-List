import { NextRequest, NextResponse } from "next/server";
import { useDataSource } from "../db/data-source";
import { Priority } from "../db/entity/Priority";

export async function GET() {
  await useDataSource();

  try {
    const results = await Priority.find({ order: { order: "ASC" } });
    return NextResponse.json(results);
  } catch (error) {
    console.log("cant use get method", error);
    return NextResponse.json({ error: "cant use get method" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await useDataSource();
  const body = await req.json();

  try {
    const priority = new Priority(body.name, body.order, body.color);
    console.log(priority);
    await priority.save();
    return NextResponse.json({}, { status: 201 });
  } catch (error) {
    console.log("cant use get method", error);
    return NextResponse.json({ error: "cant use get method" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  await useDataSource();
  const body = await req.json();
  const { fromId, toId } = body;

  function arrayMove(array: Priority[], from: number, to: number) {
    const draggedItem = array[from];
    array.splice(from, 1);
    array.splice(to, 0, draggedItem);
    return array;
  }

  try {
    const priorities = await Priority.find({ order: { order: "ASC" } });
    const fromIndex = priorities.findIndex(
      (priority) => priority.id === fromId
    );
    const toIndex = priorities.findIndex((priority) => priority.id === toId);
    const updatedPriorities = arrayMove(priorities, fromIndex, toIndex);
    for (let i = 0; i < updatedPriorities.length; i++) {
      updatedPriorities[i].order = i;
    }
    await Priority.save(updatedPriorities);

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
