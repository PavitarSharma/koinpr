import useContents from "../../hooks/useContents";
import { FaFilter } from "react-icons/fa";
import { useFilter } from "../../store";
import SideFilter from "./SideFilter";
import { useAuthContext, useFilterContext } from "../../hooks/useGlobalState";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();
  const { data: contents } = useContents();
  const filterStore = useFilter();
  const { searchTerm, setSearchTerm } = useFilterContext();
  const { user } = useAuthContext();
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <div>
        <div className="flex md:items-center gap-4 justify-between md:flex-row flex-col">
          <h1 className="text-[#18171C] sm:text-3xl text-2xl font-semibold">
            Koinpr Marketplace
          </h1>

          <div className="flex sm:items-center gap-4 sm:flex-row flex-col">
            {user && (
              <button
                onClick={() => navigate("/add-offering")}
                className="flex items-center justify-center gap-2 bg-black text-white px-8 py-3 rounded"
              >
                <IoMdAdd size={22} />
                <span>Add Offering</span>
              </button>
            )}
            <div>
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearchChange}
                className="rounded-lg border border-gray-300 px-2 py-3 sm:max-w-[374px] w-full outline-0 text-gray-700"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <div>
            <p>
              <span className="font-semibold">Showing Result</span>:{" "}
              <span className="text-[#3772FF] font-semibold">
                {contents?.totals}
              </span>
            </p>
            <p className="text-[#A4A4A4]">Content distribution</p>
          </div>

          <button
            onClick={filterStore.onOpen}
            className="border border-gray-300 rounded p-4 lg:hidden block"
          >
            <FaFilter />
          </button>
        </div>
      </div>
      {filterStore.isOpen && (
        <div className="lg:hidden block">
          <SideFilter isMobile />
        </div>
      )}
    </>
  );
};

export default Topbar;
