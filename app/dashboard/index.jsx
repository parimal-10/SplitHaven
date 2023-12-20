import React from 'react'
import FriendCard from '../components/dashboard/FriendCard'
import "../styles.css"

const friendsData = [
  { id: 1, username: 'Fr1', name: 'Friend 1', toReceive: 20 },
  { id: 2, username: 'Fr2', name: 'Friend 2', toGive: 15 },
  { id: 2, username: 'Fr3', name: 'Friend 3', toGive: 15 },
  { id: 2, username: 'Fr4', name: 'Friend 4', toGive: 15 },
  // Add more friend data as needed
];

function Dashboard () {
  return (
    <div className="container mx-auto mt-8 max-[640px]:flex max-[640px]:justify-center">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
        {friendsData.map((friend) => (
          <FriendCard key={friend.id} friend={friend} />
        ))}
      </div>
        
    </div>
  );
};

export default Dashboard;
