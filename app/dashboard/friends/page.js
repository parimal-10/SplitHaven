import React from "react"
import FriendCard from "../../components/dashboard/FriendCard"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/lib/auth"
import { PrismaClient } from "@prisma/client"

export default async function Friends() {
  const session = await getServerSession(authOptions);

  const prisma = new PrismaClient();
  const friendsData = [];
  
  try {
    const userID = session?.user?.id;

    const friends = await prisma.friends.findMany({
      where: {
        OR: [
          {
            user_id1: userID,
          },
          {
            user_id2: userID,
          },
        ],
      },
    });

    try {
      for (const friend of friends) {
        let friendData;
        let friendTransactions;
        let friendID = userID != friend.user_id1 ? friend.user_id1 : friend.user_id2;
        let balance = 0;

        friendData = await prisma.users.findUnique({
          where: {
            id: friendID,
          },
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true
          },
        });

        try {

          friendTransactions = await prisma.friend_transactions.findMany({
            where: {
              OR: [
                {
                  payer_id: userID,
                  payee_id: friendID
                },
                {
                  payer_id: friendID,
                  payee_id: userID
                }
              ]
            },
            orderBy: {
              time: "desc"
            }
          })

        } catch (err) {
          console.log("error getting transaction of friend", err);
        }

        friendTransactions.forEach(transaction => {
          if (transaction.payer_id === userID) {
            balance += Number(transaction.amount);
          } else {
            balance -= Number(transaction.amount);
          }
        }); 

        const combinedFriend = {
          ...friendData,
          userID: userID,
          balance: balance,
          transactions: friendTransactions
        };

        friendsData.push(combinedFriend);
      }
    } catch (err) {
      console.log("error getting extra details of friends");
    }

    await prisma.$disconnect();
  } catch (err) {
    console.log("error getting friends", err);
  }

  return (
    <div className="container mx-auto mt-8 max-[640px]:flex max-[640px]:justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
        {friendsData.map((friend) => (
          <FriendCard key={friend.id} friend={friend} />
        ))}
      </div>
    </div>
  );
}
