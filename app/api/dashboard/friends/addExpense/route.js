import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request) {
    const prisma = new PrismaClient();

    try {

        const {formData, startDate, userID, friendID} = await request.json();

        const data = {
            payer_id: userID,
            payee_id: friendID,
        };

        if (formData.amount) {
            data.amount = formData.amount;
        }
        if (formData.description) {
            data.description = formData.description;
        }
        if (startDate) {
            data.time = startDate;
        }

        const transactionData = await prisma.friend_transactions.create({
            data: data
        })

        return NextResponse.json({status: 201});

    } catch (err) {

        console.log("Error adding the transaction to the database");
        return NextResponse.json({status: 401})

    } finally {
        prisma.$disconnect();
    }
    
}