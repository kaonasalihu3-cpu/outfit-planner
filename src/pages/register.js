import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }

    register(form.name, form.email, form.password);
    navigate("/"); // or navigate("/login")
  }

  return (
    <div className="page">
      <section className="section narrow">
        <h1>Create account</h1>
        <p>Join glowup and save your favorite looks.</p>

        {error && <p style={{ color: "#ff9b9b", fontSize: "0.85rem" }}>{error}</p>}

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full name *</label>
            <input
              id="name"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
            />
          </div>

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

          <div className="form-group">
            <label htmlFor="confirm">Confirm password *</label>
            <input
              id="confirm"
              name="confirm"
              type="password"
              required
              value={form.confirm}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Create account
          </button>

          <p style={{ fontSize: "0.85rem", marginTop: "0.7rem" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#fdd7f0" }}>
              Login
            </Link>
          </p>
        </form>
      </section>
    </div>
  );
}

export default Register;