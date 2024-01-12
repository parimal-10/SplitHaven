import React from "react"
import FriendCard from "../../components/dashboard/friends/FriendCard"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/lib/auth"
import { PrismaClient } from "@prisma/client"
import { cookies } from "next/headers"
import axios from "axios"
import SearchUser from "@/app/components/dashboard/friends/SearchUser"
import FriendRequest from "@/app/components/dashboard/friends/FriendRequest"
import "../../globals.css"

export default async function Friends() {
  const session = await getServerSession(authOptions);
  const userID = session?.user?.id;

  // const sessionToken = cookies()?.get("next-auth.session-token")?.value;
  // console.log(sessionToken);

  // try {
  //   const response = await axios.post("/api/dashboard/friends", null, {
  //     headers: {
  //       Authorization: `Bearer ${sessionToken}`
  //     }
  //   })
  //   console.log(response);
  // } catch (err) {
  //   console.log("Error sending post request", err);
  // }

  const prisma = new PrismaClient();
  const friendsData = [];

  try {

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
          balance: balance,
          transactions: friendTransactions
        };

        friendsData.push(combinedFriend);
      }
    } catch (err) {
      console.log("error getting extra details of friends");
    }

  } catch (err) {
    console.log("error getting friends", err);
  } finally {
    await prisma.$disconnect();
  }

  return (
    <div className="container mx-auto mt-8 flex flex-col max-[640px]:flex max-[640px]:justify-center">

      <div className="flex justify-between">
        <SearchUser userID={userID} />
        <FriendRequest userID={userID} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 items-center justify-center mt-4">
        {friendsData.map((friend) => (
          <FriendCard key={friend.id} userID={userID} friend={friend} />
        ))}
      </div>
    </div>
  );
}
