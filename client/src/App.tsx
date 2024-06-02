import { Routes, Route } from "react-router-dom";
import ROUTES from "./routes";
import { AddOffering, Cart, ContentDetail, Home, Login, SignUp, Success } from "./pages";
import { Navbar } from "./components";
import { AddOfferingContextProvider } from "./context";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.SIGNUP} element={<SignUp />} />
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route
          path={ROUTES.ADD_OFFERING}
          element={
            <AddOfferingContextProvider>
              <AddOffering />
            </AddOfferingContextProvider>
          }
        />
        <Route path={ROUTES.CONTENT_DETAIL} element={<ContentDetail />} />
        <Route path={ROUTES.CART} element={<Cart />} />
        <Route path={ROUTES.SUCCESS} element={<Success />} />
      </Routes>
    </>
  );
}
