import { useState } from 'react';
import { Link } from 'react-router-dom';
import FormContainer from '../components/FormContainer';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const SubmiitHandler = async (e) => {
        e.preventDefault();
        console.log('submit')

    }


  return (
    <FormContainer>
      <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>

      <form onSubmit={SubmiitHandler} className="space-y-4">
        <div className="my-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="my-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          
          type="submit"
          className="mt-3 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          Sign In
        </button>
      </form>


      <div className="py-3 text-center">
        <p>
          New Customer? <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
        </p>
      </div>
    </FormContainer>
  )
}

export default LoginScreen