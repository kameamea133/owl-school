/* eslint-disable react/prop-types */
const FormContainer = ({ children }) => {
    return (
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-md bg-white p-5 rounded-lg shadow-md">
          {children}
        </div>
      </div>
    );
  };
  
  export default FormContainer;
  