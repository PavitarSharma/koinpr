import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const BackPage = ({ page }: { page: string }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-4">
      <IoArrowBackOutline
        onClick={() => navigate(-1)}
        size={24}
        className="cursor-pointer"
      />
      <span className="text-xl text-[#18171C] font-medium">{page}</span>
    </div>
  );
};

export default BackPage;
