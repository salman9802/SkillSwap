import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AuthLayout from "./pages/layouts/AuthLayout";
import MarketplacePage from "./pages/MarketplacePage";
import RegisterPage from "./pages/user/RegisterPage";
import LoginPage from "./pages/user/LoginPage";
import RequestPage from "./pages/RequestPage";
import UserAccountLayout from "./pages/layouts/UserAccountLayout";
import Dashboard from "./components/user/Dashboard";
import NewRequest from "./components/user/NewRequest";
import Profile from "./components/user/Profile";

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
          <Route path="account" element={<UserAccountLayout />}>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="new-request" element={<NewRequest />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>
      </Route>
      {/* // TODO: NotFoundPage (404) */}
    </Routes>
  );
};

export default App;
