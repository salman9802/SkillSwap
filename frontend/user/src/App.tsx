import { Navigate, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";

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
import { store } from "./features/store";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="user/register" element={<RegisterPage />} />
        <Route path="user/login" element={<LoginPage />} />

        <Route element={<AuthLayout />}>
          <Route path="marketplace" element={<MarketplacePage />} />
          <Route path="request/:requestId" element={<RequestPage />} />

          <Route path="user">
            <Route index element={<Navigate to="/user/account" replace />} />

            <Route path="account" element={<UserAccountLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="new-request" element={<NewRequestPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="manage-sessions" element={<ManageSessionsPage />} />
            </Route>

            <Route
              path="account/sessions/:sessionId"
              element={<SessionPage />}
            />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Provider>
  );
};

export default App;
