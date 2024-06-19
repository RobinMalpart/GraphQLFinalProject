import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USERS } from '../graphql/queries';
import { GetUsersQuery } from '../generated/graphql';

const UserList: React.FC = () => {
  const { loading, error, data } = useQuery<GetUsersQuery>(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data?.getUsers.map(user => (
        <li key={user.id}>{user.username}</li>
      ))}
    </ul>
  );
};

export default UserList;
