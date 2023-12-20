import React from "react";

function FriendCard({ friend }) {
  return (
    <a href="/particular-friend" id={friend.id} className="bg-neededCyan p-4 shadow-md rounded-md mb-4 flex items-center max-w-sm min-w-fit cursor-pointer">
      
        <img src="./profile.com" className="mr-4"></img>

        <h3 className="text-xl font-semibold">
          {friend.username} ({friend.name})
        </h3>

        <div className="ml-auto"> 
          {friend.toReceive && (
            <span className="text-green-600">{`+ ₹${friend.toReceive}`}</span>
          )}
          {friend.toGive && (
            <span className="text-red-600">{`- ₹${friend.toGive}`}</span>
          )}
        </div>
      
    </a>
  );
}

export default FriendCard;
