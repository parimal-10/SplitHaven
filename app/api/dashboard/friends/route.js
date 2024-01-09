import { NextResponse } from "next/server"

export async function POST() {
    const data = "parimal";

    return NextResponse.json(data, {status: 201});
}