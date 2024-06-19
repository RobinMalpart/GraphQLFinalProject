import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USERS } from '../graphql/queries';
import { GetUsersQuery } from '../generated/graphql';

const UserList: React.FC = () => {
  const { loading, error, data } = useQuery<GetUsersQuery>(GET_USERS);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const getRandomColor = () => {
    const colors = ['bg-green-500', 'bg-red-500', 'bg-gray-500', 'bg-orange-500'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  return (
    <ul>
        {shuffleArray(data?.getUsers.slice(0, 10)).map(user => (
        <li key={user.id} className="flex my-1 items-center relative">
          <img src='https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg' alt="Profile" className="h-8 w-8 object-cover mr-3 rounded-xl" />
          <span className={`h-3 w-3 rounded-full absolute bottom-0 left-0 ${getRandomColor()}`}></span>
          <span>{user.username}</span>
        </li>
        ))}
    </ul>
  );
};

export default UserList;
