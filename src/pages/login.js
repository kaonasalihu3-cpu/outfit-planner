import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const result = await login(form.email, form.password);

    if (result.ok) {
      navigate("/");
    } else {
      setError(result.message);
    }
  }

  return (
    <div className="page">
      <section className="section narrow">
        <h1>Login</h1>
        <p>Welcome back. Log in to access your glowup account.</p>

        {error && <p style={{ color: "#ff9b9b", fontSize: "0.85rem" }}>{error}</p>}

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password *</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>

          <p style={{ fontSize: "0.85rem", marginTop: "0.7rem" }}>
            Don&apos;t have an account?{" "}
            <Link to="/register" style={{ color: "#fdd7f0" }}>
              Register
            </Link>
          </p>
        </form>
      </section>
    </div>
  );
}

export default Login;
