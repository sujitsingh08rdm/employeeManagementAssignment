import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import Button from "../ui/Button";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  return (
    <nav className="h-14 bg-white shadow-sm flex items-center justify-between px-6 border-b">
      <div className="text-lg font-semibold text-[#5044e5]">
        Employee Management System
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-gray-700">{user?.name}</span>

        <Button onClick={() => dispatch(logout())}>Logout</Button>
      </div>
    </nav>
  );
};

export default Navbar;
