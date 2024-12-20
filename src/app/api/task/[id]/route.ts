import { getDB } from "../../db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  const connection = await getDB();

  if (!id) {
    return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
  }

  if (!connection) {
    return NextResponse.json(
      { error: "Can't connect to the database" },
      { status: 500 }
    );
  }

  try {
    const [results] = await connection.query(
      "SELECT id, name, done, description, priority, DATE_FORMAT(date, '%Y-%m-%d') AS date, startTime, endTime, DATE_FORMAT(doneDate, '%Y-%m-%d') AS doneDate FROM tasks WHERE id = ?",
      [parseInt(id, 10)]
    );
    return NextResponse.json(results);
  } catch (error) {
    console.error("Can't use GET method:", error);
    return NextResponse.json(
      { error: "Can't use GET method" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  const connection = await getDB();

  if (!id) {
    return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
  }

  if (!connection) {
    return NextResponse.json(
      { error: "Can't connect to the database" },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();
    await connection.query(
      "UPDATE tasks SET done = ?, doneDate = CURRENT_DATE WHERE id = ?;",
      [body.done, parseInt(id, 10)]
    );
    return NextResponse.json(
      { message: "Task updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Can't use PATCH method:", error);
    return NextResponse.json(
      { error: "Can't use PATCH method" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  const connection = await getDB();

  if (!id) {
    return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
  }

  if (!connection) {
    return NextResponse.json(
      { error: "Can't connect to the database" },
      { status: 500 }
    );
  }

  try {
    await connection.query("DELETE FROM tasks WHERE id = ?", [id]);
    return NextResponse.json(
      { message: "Task deleted successfully" },
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

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  const connection = await getDB();

  if (!id) {
    return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
  }

  if (!connection) {
    return NextResponse.json(
      { error: "Can't connect to the database" },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();
    await connection.query(
      "UPDATE tasks SET name = ?, priority = ?, description = ?, startTime = ?, endTime = ?, date = ? WHERE id = ?;",
      [
        body.name,
        body.priority,
        body.description,
        body.startTime,
        body.endTime,
        body.date,
        body.id,
      ]
    );
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
