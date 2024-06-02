import { FaCircleCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";
const Success = () => {
  return (
    <div className="bg-green-200 h-screen flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-4">
            <FaCircleCheck className="w-20 h-20 text-green-600" />
            <p className="text-2xl font-medium">Order Success</p>
            <Link to="/" className="bg-black text-white py-3 px-8 rounded">Shop More</Link>
        </div>
    </div>
  )
}

export default Success