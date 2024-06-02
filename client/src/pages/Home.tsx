import { useEffect } from "react";
import { Contents, SideFilter, Topbar, Topbrands } from "../components";

const Home = () => {
  useEffect(() => {
    document.title = "Home - Koinpr";
  }, []);

  return (
    <div className="flex gap-6 container-box">
      {/* Side Filter Container */}
      <div className="lg:block hidden">
      <SideFilter />
      </div>

      {/* Data Container */}
      <div className="space-y-6 flex-1">
        <Topbar />
        <div className="flex gap-6">
          <Contents />
          <Topbrands />
        </div>
      </div>
    </div>
  );
};

export default Home;
