import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { Button } from "./ui/button";

const Header = () => {
  const user = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }
 
  const [isOpen, setIsOpen] = useState(false);
 
  
  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogoClick = () => {
    navigate('/'); 
  };

  const handleProfileClick = () => {
    navigate("/profile");
    setIsOpen(false); 
  };
  const handleSignIn = () => {
    navigate("/login"); 
    setIsOpen(false); 
  };

  const handleSignUp = () => {
    navigate("/register"); 
    setIsOpen(false); 
  };


  return (
    <header className="bg-black w-full sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* left - logo */}
        <div onClick={handleLogoClick} className="text-white font-bold text-xl flex items-center gap-2 cursor-pointer">
          <img src="/logoMyTeachersApp.png" alt="logo" className="w-20 h-20 rounded-full" />
          Owl School
          
        </div>

        {/* icon menu */}
        <div className=" z-50 md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
          </button>
        </div>

        {/* right buttons on wide screen */}
        <div className="hidden md:flex space-x-4">
        
        {user ? (
            <>
              <img src={user.profileImage} alt="user picture" className="w-10 h-10 rounded-full object-cover"/>
              <span className="block py-2 px-4  text-white ">
                Welcome {user.name} 
              </span>
              <button
                onClick={handleProfileClick} 
                className="block py-2 px-4 bg-white text-green-600 rounded-lg hover:bg-gray-100"
                
              >
                Profile
              </button>
              <button
                onClick={logoutHandler}
                className="block py-2 px-4 bg-white text-red-600 rounded-lg hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* if not logged in - sign in and sign up */}
              <Button
                onClick={handleSignIn}
                // className="block py-2 px-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100"
                variant="secondary"
              >
                Sign In
              </Button>
              <Button
                onClick={handleSignUp}
                // className="block py-2 px-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100"
                variant="secondary"
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </nav>

      {/* mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center md:hidden"  // Ajout de pt-16 pour espacer l'icône
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="text-center space-y-4 mt-20">
            {user ? (
                <>
                <li className="flex items-center justify-center space-x-2">
                <img src={user.profileImage} alt="user picture" className="w-10 h-10 rounded-full object-cover"/>
                    <span className="text-white">{user.name}</span> 
                  </li>
                  <li>
                    <button
                      onClick={handleProfileClick} 
                      className="block py-2 px-4  w-40 bg-green-500 hover:bg-green-700 text-white rounded-lg"
                    >
                      Profile
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={logoutHandler} 
                      className="block py-2 px-4  w-40 bg-red-500 hover:bg-red-700 text-white rounded-lg"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <button
                      onClick={handleSignIn}
                      className="block py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white rounded-lg"
                    >
                      Sign In
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleSignUp}
                      className="block py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white rounded-lg"
                    >
                      Sign Up
                    </button>
                  </li>
                </>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
