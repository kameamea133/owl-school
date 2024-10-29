import { Button } from "./ui/button";

const Hero = ({ title, subtitle, buttonText, buttonAction }) => {
  return (
    <section className="w-full opacity-90 flex items-center justify-center h-[80vh] bg-contain bg-top bg-no-repeat" style={{ backgroundImage: "url('/heroImg2.png')" }}>
      <div className="text-center text-white">
        <h1 className="text-5xl font-bold mb-4 text-black">{title}</h1>
        <p className="text-lg mb-8">{subtitle}</p>
        <Button 
          onClick={buttonAction} 
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          {buttonText}
        </Button>
      </div>
    </section>
  );
};

export default Hero;
