import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider } from "./context/SidebarContext"; //
import Login from "./pages/auth/Login";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import Websites from "./pages/dashboard/Websites";
import Vulnerabilities from "./pages/dashboard/Vulnerabilities";

const NotFound = () => <div>404 - Page Not Found</div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login" />} />
        <Route path="/auth/login" element={<Login />} />

        {/* Wrap dashboard route with the SidebarProvider */}
        <Route
          path="/dashboard"
          element={
            <SidebarProvider>
              <DashboardLayout />
            </SidebarProvider>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="websites" element={<Websites />} />
          <Route path="vulnerabilities" element={<Vulnerabilities />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
