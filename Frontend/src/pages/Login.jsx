import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function submit(e) {

    e.preventDefault();

    const users = JSON.parse(
      localStorage.getItem("medibookUsers") || "[]"
    );

    const user = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password
    );

    if (!user) {

      setError("Invalid email or password. Please register first.");

      return;
    }

    localStorage.setItem(
      "medibookUser",
      JSON.stringify(user)
    );

    navigate(
      user.role === "doctor"
        ? "/doctor-dashboard"
        : "/dashboard"
    );

  }


  return (

    <main className="page">

      <form
        className="form-card"
        onSubmit={submit}
      >

        <div className="eyebrow">
          Welcome Back
        </div>

        <h1 className="page-title">
          Login to MediBook
        </h1>

        <p className="muted">
          Access your account and manage appointments.
        </p>


        {error && (
          <p style={{ color: "#dc2626" }}>
            {error}
          </p>
        )}


        <div className="form-group">

          <label>Email Address</label>

          <input
            className="form-control"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />

        </div>


        <div className="form-group">

          <label>Password</label>

          <input
            className="form-control"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />

        </div>


        <button
          className="btn btn-primary full"
          type="submit"
        >
          Login
        </button>


        <p
          className="muted"
          style={{
            textAlign: "center",
            marginTop: 18
          }}
        >

          Don't have an account?

          {" "}

          <Link
            to="/register"
            style={{
              color: "#0d9488",
              fontWeight: 700
            }}
          >
            Create Account
          </Link>

        </p>

      </form>

    </main>

  );
}