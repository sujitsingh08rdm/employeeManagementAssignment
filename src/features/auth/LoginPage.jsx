import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { getUserByEmail, setUserSession } from "../../api/authService";
import { loginSuccess } from "./authSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const users = await getUserByEmail(email);
      const user = users[0];

      console.log(user);

      if (!user) {
        setError("User not found");
        return;
      }

      if (user.password !== password) {
        setError("Invalid credentials");
        return;
      }

      const { password: _, ...sessionUser } = user;
      setUserSession(sessionUser);
      dispatch(loginSuccess(sessionUser));
      navigate("/dashboard/summary");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen min-h-175 bg-gray-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 min-h-80 rounded shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-2 text-center">EMS v1</h2>
        <h3 className="text-xl font-semibold mb-4 text-center">Login</h3>

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          type="submit"
          className="bg-[#5044e5] text-white w-full py-2 rounded hover:opacity-90"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
