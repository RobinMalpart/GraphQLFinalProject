import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';
import { CreateUserMutation, CreateUserMutationVariables } from '../generated/graphql';
import { useNavigate } from 'react-router-dom';
import HeaderDisconected from './HeaderDisconnected';

const SignUp: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [createUser, { loading, error }] = useMutation<CreateUserMutation, CreateUserMutationVariables>(CREATE_USER);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await createUser({ variables: { username, password } });
      if (data?.createUser.success) {
        alert('Vous êtes inscrit, vous allez être redirigé vers la page de connexion...');
        setTimeout(() => { navigate('/login'); }, 2000);
      } else {
        alert('Erreur : ' + data?.createUser.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <HeaderDisconected />
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mt-3 mx-auto">
        <h2 className="text-2xl font-bold mb-4">Inscrivez-vous</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nom d'utilisateur</label>
            <input type="text" id="username" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500" value={username} onChange={(e) => setUsername(e.target.value)}/>
          </div>
          <div className="mb-4">
            <label htmlFor="password-signup" className="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input type="password" id="password-signup" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div className='flex justify-center mb-3'>
            <a href='/login' className='my-auto hover:text-blue-500'>Vous avez déjà un compte ?</a>
          </div>
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700" disabled={loading}>S'inscrire</button>
          {error && <p className="text-red-500 mt-4">{error.message}</p>}
        </form>
      </div>
    </div>
  );
};

export default SignUp;