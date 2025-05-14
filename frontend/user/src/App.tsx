import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AuthLayout from "./pages/layouts/AuthLayout";
import MarketplacePage from "./pages/MarketplacePage";
import RegisterPage from "./pages/user/RegisterPage";
import LoginPage from "./pages/user/LoginPage";
import RequestPage from "./pages/RequestPage";

const App = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} />

      {/* // TODO: user auth context */}

      {/* // TODO: check user authentication */}
      <Route element={<AuthLayout />}>
        <Route path="marketplace" element={<MarketplacePage />} />
        <Route path="request/:requestId" element={<RequestPage />} />

        <Route path="user">
          <Route index element={undefined} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />

          {/* // TODO: general user layout */}
          <Route element={undefined}>
            <Route path="dashboard" element={undefined} />
            <Route path="new-request" element={undefined} />
            <Route path="profile" element={undefined} />
          </Route>
        </Route>
      </Route>
      {/* // TODO: NotFoundPage (404) */}
    </Routes>
  );
};

export default App;
