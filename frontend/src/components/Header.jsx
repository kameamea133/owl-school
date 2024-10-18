import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  // Fonction pour toggle le menu mobile
  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogoClick = () => {
    navigate('/'); // Redirection vers la page d'accueil
  };
  const handleSignIn = () => {
    navigate("/login"); // Redirection vers /login
    setIsOpen(false); // Fermer le menu après la redirection
  };

  const handleSignUp = () => {
    navigate("/register"); // Redirection vers /register
    setIsOpen(false); // Fermer le menu après la redirection
  };

  return (
    <header className="bg-black w-full sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Titre à gauche */}
        <div onClick={handleLogoClick} className="text-white font-bold text-xl flex items-center gap-2 cursor-pointer">
          <img src="/logoMyTeachersApp.png" alt="logo" className="w-20 h-20 rounded-full" />
          Owl School
        </div>

        {/* Icône Hamburger ou Fermeture pour mobile */}
        <div className=" z-50 md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
          </button>
        </div>

        {/* Boutons à droite - visibles sur grands écrans */}
        <div className="hidden md:flex space-x-4">
        <button
            onClick={handleSignIn}
            className="block py-2 px-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100"
          >
            Sign In
          </button>
          <button
            onClick={handleSignUp}
            className="block py-2 px-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100"
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Menu mobile - visible seulement lorsque l'icône hamburger est cliqué */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center md:hidden"  // Ajout de pt-16 pour espacer l'icône
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="text-center space-y-4">
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
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
