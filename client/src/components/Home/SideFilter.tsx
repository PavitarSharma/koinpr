import { IoChevronDownOutline, IoChevronUpOutline } from "react-icons/io5";
import useToggle from "../../hooks/useToggle";
import {
  budgets,
  categories,
  contentLanguages,
  productTypes,
  regions,
} from "../../constants";
import { useFilterContext } from "../../hooks/useGlobalState";

const SideFilter = ({ isMobile = false }: { isMobile?: boolean }) => {
  const {
    setCategoriesFilter,
    setLanguagesFilter,
    setRegionsFilter,
    setProductTypeFilter,
    setBudget,
    budget
  } = useFilterContext();
  const categoryToggle = useToggle(true);
  const languageToggle = useToggle(false);
  const regionToggle = useToggle(false);
  const productTypeToggle = useToggle(true);
  const budgetToggle = useToggle(true);

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFilter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    const { checked, value } = event.target;

    setFilter((prevState) =>
      checked
        ? [...prevState, value]
        : prevState.filter((item) => item !== value)
    );
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleCheckboxChange(event, setCategoriesFilter);
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleCheckboxChange(event, setLanguagesFilter);
  };

  const handleRegionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleCheckboxChange(event, setRegionsFilter);
  };

  const handleProductTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleCheckboxChange(event, setProductTypeFilter);
  };

  const handleBudgetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setBudget(value);
  };
  return (
    <div
      className={`w-[222px] card h-max space-y-8 ${
        isMobile && "fixed top-[70px] left-0 h-screen"
      }`}
    >
      {/* Categories Filter */}
      <div className="">
        <div
          onClick={categoryToggle.onToggle}
          className="flex items-center justify-between cursor-pointer"
        >
          <h5 className="font-semibold">Categories</h5>
          {categoryToggle.open ? (
            <IoChevronUpOutline size={20} />
          ) : (
            <IoChevronDownOutline size={20} />
          )}
        </div>
        {categoryToggle.open && (
          <div className="space-y-4 mt-4 max-h-60 overflow-y-auto scrollbar pr-4">
            {categories.map((option, index) => (
              <div key={index} className="flex gap-3">
                <input
                  type="checkbox"
                  value={option.value}
                  onChange={handleCategoryChange}
                  id={`category-${option.value}`}
                  className="rounded-lg border border-gray-300 p-2 w-4 h-4 outline-0 text-gray-700"
                />
                <label htmlFor={`category-${option.value}`} className="text-sm">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Language Filter */}
      <div>
        <div
          onClick={languageToggle.onToggle}
          className="flex items-center justify-between cursor-pointer"
        >
          <h5 className="font-semibold">Language</h5>
          {languageToggle.open ? (
            <IoChevronUpOutline size={20} />
          ) : (
            <IoChevronDownOutline size={20} />
          )}
        </div>
        {languageToggle.open && (
          <div className="space-y-4 mt-4 max-h-60 overflow-y-auto scrollbar pr-4">
            {contentLanguages.map((option, index) => (
              <div key={index} className="flex gap-3">
                <input
                  type="checkbox"
                  value={option.value}
                  onChange={handleLanguageChange}
                  id={`language-${option.value}`}
                  className="rounded-lg border border-gray-300 p-2 w-4 h-4 outline-0 text-gray-700"
                />
                <label htmlFor={`language-${option.value}`} className="text-sm">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Region Filter */}
      <div>
        <div
          onClick={regionToggle.onToggle}
          className="flex items-center justify-between cursor-pointer"
        >
          <h5 className="font-semibold">Region</h5>
          {regionToggle.open ? (
            <IoChevronUpOutline size={20} />
          ) : (
            <IoChevronDownOutline size={20} />
          )}
        </div>
        {regionToggle.open && (
          <div className="space-y-4 mt-4 max-h-60 overflow-y-auto scrollbar pr-4">
            {regions.map((option, index) => (
              <div key={index} className="flex gap-3">
                <input
                  type="checkbox"
                  id={`region-${option.value}`}
                  value={option.value}
                  onChange={handleRegionChange}
                  className="rounded-lg border border-gray-300 p-2 w-4 h-4 outline-0 text-gray-700"
                />
                <label htmlFor={`region-${option.value}`} className="text-sm">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Product Type Filter */}
      <div>
        <div
          onClick={productTypeToggle.onToggle}
          className="flex items-center justify-between cursor-pointer"
        >
          <h5 className="font-semibold">Product Type</h5>
          {productTypeToggle.open ? (
            <IoChevronUpOutline size={20} />
          ) : (
            <IoChevronDownOutline size={20} />
          )}
        </div>
        {productTypeToggle.open && (
          <div className="space-y-4 mt-4 max-h-60 overflow-y-auto scrollbar pr-4">
            {productTypes.map((option, index) => (
              <div key={index} className="flex gap-3">
                <input
                  type="checkbox"
                  id={`productType-${option}`}
                  value={option}
                  onChange={handleProductTypeChange}
                  className="rounded-lg border border-gray-300 p-2 w-4 h-4 outline-0 text-gray-700"
                />
                <label htmlFor={`productType-${option}`} className="text-sm">
                  {option}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Budget Filter */}
      <div>
        <div
          onClick={budgetToggle.onToggle}
          className="flex items-center justify-between cursor-pointer"
        >
          <h5 className="font-semibold">Budget</h5>
          {budgetToggle.open ? (
            <IoChevronUpOutline size={20} />
          ) : (
            <IoChevronDownOutline size={20} />
          )}
        </div>
        {budgetToggle.open && (
          <div className="space-y-4 mt-4 max-h-60 overflow-y-auto scrollbar pr-4 ">
            {budgets.map((option, index) => (
              <div key={index} className="flex gap-3">
                <input
                  type="radio"
                  id={`productType-${option}`}
                  value={option}
                  checked={budget === option}
                  onChange={handleBudgetChange}
                  className="rounded-lg border border-gray-300 p-2 w-4 h-4 outline-0 text-gray-700"
                />
                <label htmlFor={`productType-${option}`} className="text-sm">
                  {option}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SideFilter;
