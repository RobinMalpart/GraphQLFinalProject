import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGN_IN } from '../graphql/mutations';
import { SignInMutation, SignInMutationVariables } from '../generated/graphql';
import { useNavigate } from 'react-router-dom';
import HeaderDisconnected from './HeaderDisconnected';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signIn, { loading, error }] = useMutation<SignInMutation, SignInMutationVariables>(SIGN_IN);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await signIn({ variables: { username, password } });
      if (data?.signIn.success) {
        localStorage.setItem('token', data.signIn.token as string);
        navigate('/');
      } else {
        alert(data?.signIn.message);
      }
    } catch (err) {
      console.error(err);
      if (err.networkError && err.networkError.statusCode === 403) {
        alert("Utilisateur ou Mot de passe incorrect");
      }
    }
  };

  return (
    <div>
      <HeaderDisconnected />
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mt-3 mx-auto">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input type="text" id="username" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="mb-4">
            <label htmlFor="password-login" className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" id="password-login" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700" disabled={loading} >
            Login
          </button>
          {error && <p className="text-red-500 mt-4">{error.message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;