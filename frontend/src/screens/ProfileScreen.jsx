import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import { useUpdateUserMutation } from '../slices/usersApiSlice';
import Spinner from '../components/Spinner';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../slices/authSlice';



const ProfileScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [image, setImage] = useState(null); 
    const [profileImage, setProfileImage] = useState('');
    

    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);
    const [updateProfile, { isLoading }] = useUpdateUserMutation();

    
    
    useEffect(() => {
     setName(userInfo.name);
     setEmail(userInfo.email);
     setProfileImage(userInfo.profileImage);
    }, [userInfo.setName, userInfo.setEmail, userInfo.profileImage]);

    const handleImageChange = (e) => {
      setImage(e.target.files[0]); 
  };

    const SubmitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
          toast.error('Passwords do not match');
        } else {
          const formData = new FormData();
          formData.append('name', name);
          formData.append('email', email);
          formData.append('password', password);
          if (image) {
            formData.append('image', image); 
          }
          try {
            const res = await updateProfile(formData).unwrap();
            dispatch(setCredentials({ ...res }));
            toast.success('Profile Updated');
           } catch (err) {
            toast.error(err?.data?.message || err.error);
          }
        }

    }


  return (
    <FormContainer>
      <h1 className="text-2xl font-bold mb-6 text-center">Update Profile</h1>

      <form onSubmit={SubmitHandler} className="space-y-4">
      <div className="my-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

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
          <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700">
            Profile Image (optional)
          </label>
          {/* dispaly image if exists */}
          {profileImage && <img src={profileImage} alt="Profile" className="w-20 h-20 rounded-full" />}
          <input
            type="file"
            id="profileImage"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={handleImageChange} 
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

        <div className="my-2">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
          {isLoading && <Spinner />}
        <button
          
          type="submit"
          className="mt-3 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          Update
        </button>
      </form>
    </FormContainer>
  )
}

export default ProfileScreen