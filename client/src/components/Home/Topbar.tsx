import useContents from "../../hooks/useContents";
import { FaFilter } from "react-icons/fa";
import { useFilter } from "../../store";
import SideFilter from "./SideFilter";
const Topbar = () => {
  const { data: contents } = useContents();
  const filterStore = useFilter();
  return (
    <>
      <div>
        <div className="flex sm:items-center gap-4 justify-between sm:flex-row flex-col">
          <h1 className="text-[#18171C] sm:text-3xl text-2xl font-semibold">
            Koinpr Marketplace
          </h1>

          <div>
            <input
              type="text"
              placeholder="Search"
              className="rounded-lg border border-gray-300 px-2 py-3 sm:max-w-[374px] w-full outline-0 text-gray-700"
            />
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <div>
            <p>
              <span className="font-semibold">Showing Result</span>:{" "}
              <span className="text-[#3772FF] font-semibold">
                {contents?.data?.length}
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
      {
        filterStore.isOpen && <div className="lg:hidden block">
        <SideFilter isMobile />
      </div>
      }
    </>
  );
};

export default Topbar;
