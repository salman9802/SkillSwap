import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AuthLayout from "./pages/layouts/AuthLayout";
import MarketplacePage from "./pages/MarketplacePage";
import RegisterPage from "./pages/user/RegisterPage";
import LoginPage from "./pages/user/LoginPage";
import RequestPage from "./pages/RequestPage";
import UserAccountLayout from "./pages/layouts/UserAccountLayout";
import DashboardPage from "./pages/user/DashboardPage";
import NewRequestPage from "./pages/user/NewRequestPage";
import ProfilePage from "./pages/user/ProfilePage";
import ManageSessionsPage from "./pages/user/ManageSessionsPage";
import SessionPage from "./pages/user/SessionPage";
import NotFoundPage from "./pages/NotFoundPage";

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
          <Route index element={<Navigate to="/user/account" replace />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />

          {/* // TODO: general user layout */}
          <Route path="account" element={<UserAccountLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="new-request" element={<NewRequestPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="manage-sessions" element={<ManageSessionsPage />} />
          </Route>

          <Route path="account/sessions/:sessionId" element={<SessionPage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
