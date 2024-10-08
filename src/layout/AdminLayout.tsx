import { useState } from "react";
import {
  Menu,
  X,
  Home,
  Calendar,
  User,
  ActivityIcon,
  LogOut,
  ArrowRight,
} from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/redux/store/hooks";
import { logOut } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";

const AdminLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/");
    toast.success("User logged out successfully");
  };

  return (
    <div className="relative flex h-screen overflow-hidden bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-gray-800 text-gray-100 transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:w-64 md:translate-x-0`}
      >
        <div className="flex items-center justify-between bg-gray-700 p-4">
          <h2 className="text-lg font-semibold">Admin Dashboard</h2>
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="transform text-gray-100 transition-transform duration-300 hover:rotate-90 md:hidden"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <nav className="p-4">
          <ul>
            <li>
              <NavLink
                to={"/dashboard"}
                className="flex items-center rounded p-2 text-gray-300 hover:bg-gray-700 hover:text-gray-100"
              >
                <Home size={20} className="mr-2" /> Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/bookings"}
                className="flex items-center rounded p-2 text-gray-300 hover:bg-gray-700 hover:text-gray-100"
              >
                <Calendar size={20} className="mr-2" /> Bookings
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/facilities"}
                className="flex items-center rounded p-2 text-gray-300 hover:bg-gray-700 hover:text-gray-100"
              >
                <ActivityIcon size={20} className="mr-2" /> Facilities
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/add-admin"}
                className="flex items-center rounded p-2 text-gray-300 hover:bg-gray-700 hover:text-gray-100"
              >
                <User size={20} className="mr-2" /> Add Admin
              </NavLink>
            </li>
            {/* Add more admin-specific links here */}
          </ul>
        </nav>
        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 w-full bg-gray-700 p-4">
          <NavLink to={"/"}>
            <button className="flex w-full items-center rounded p-2 text-gray-300 hover:bg-gray-600 hover:text-gray-100">
              <ArrowRight size={20} className="mr-2" /> Exit
            </button>
          </NavLink>
          <button
            className="mt-2 flex w-full items-center rounded p-2 text-gray-300 hover:bg-gray-600 hover:text-gray-100"
            onClick={() => handleLogout()}
          >
            <LogOut size={20} className="mr-2" /> Logout
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div
        className={`flex-1 bg-gray-900 p-6 transition-transform duration-300 ${
          isSidebarOpen ? "md:ml-64" : "md:ml-0"
        }`}
      >
        <div className="mb-10 flex items-center justify-between md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="transform text-gray-100 transition-transform duration-300 hover:rotate-90"
          >
            <Menu size={24} />
          </button>

          <h2>Admin Dashboard</h2>
        </div>
        <div className="max-h-screen overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
