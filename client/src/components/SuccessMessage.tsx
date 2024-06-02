import { useEffect } from "react";
import { IoCheckmarkCircleOutline, IoClose } from "react-icons/io5";

const SuccessMessage = ({ message, setMessage}: { message: string; setMessage: React.Dispatch<React.SetStateAction<string>>}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("");
    }, 5000);
    
    return () => clearTimeout(timer); // Clean up the timeout on component unmount
  }, [setMessage]);
  
  return (
    <div className="bg-[#DDF2DF] py-3 px-4 rounded flex items-center justify-between my-4">
      <div className="flex items-center gap-5">
        <IoCheckmarkCircleOutline size={32} className="text-[#1A8200]" />
        <span>{message}</span>
      </div>

      <button onClick={() => setMessage("")}>
        <IoClose size={24} />
      </button>
    </div>
  );
};

export default SuccessMessage;
