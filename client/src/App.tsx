import { Routes, Route } from "react-router-dom";
import ROUTES from "./routes";
import { AddOffering, Home } from "./pages";
import { Navbar } from "./components";
import { AddOfferingContextProvider } from "./context";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route
          path={ROUTES.ADD_OFFERING}
          element={
            <AddOfferingContextProvider>
              <AddOffering />
            </AddOfferingContextProvider>
          }
        />
      </Routes>
    </>
  );
}
