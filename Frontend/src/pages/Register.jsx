import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient"
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();


  function change(e) {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  }


  function submit(e) {

    e.preventDefault();

    const users = JSON.parse(
      localStorage.getItem("medibookUsers") || "[]"
    );

    const exists = users.some(
      (u) =>
        u.email.toLowerCase() === form.email.toLowerCase()
    );

    if (exists) {

      setError("This email is already registered.");

      return;
    }


    const user = {
      ...form,
      id: Date.now()
    };


    localStorage.setItem(
      "medibookUsers",
      JSON.stringify([...users, user])
    );


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
          Join MediBook
        </div>

        <h1 className="page-title">
          Create Account
        </h1>

        <p className="muted">
          Register as a patient or a doctor.
        </p>


        {error && (
          <p style={{ color: "#dc2626" }}>
            {error}
          </p>
        )}


        <div className="form-group">

          <label>Full Name</label>

          <input
            className="form-control"
            name="name"
            required
            value={form.name}
            onChange={change}
            placeholder="Your full name"
          />

        </div>


        <div className="form-group">

          <label>Email Address</label>

          <input
            className="form-control"
            type="email"
            name="email"
            required
            value={form.email}
            onChange={change}
            placeholder="you@example.com"
          />

        </div>


        <div className="form-group">

          <label>Password</label>

          <input
            className="form-control"
            type="password"
            minLength="6"
            name="password"
            required
            value={form.password}
            onChange={change}
            placeholder="Minimum 6 characters"
          />

        </div>


        <div className="form-group">

          <label>Register As</label>

          <select
            className="form-control"
            name="role"
            value={form.role}
            onChange={change}
          >

            <option value="patient">
              Patient
            </option>

            <option value="doctor">
              Doctor
            </option>

          </select>

        </div>


        <button
          className="btn btn-primary full"
          type="submit"
        >
          Create Account
        </button>


        <p
          className="muted"
          style={{
            textAlign: "center",
            marginTop: 18
          }}
        >

          Already registered?

          {" "}

          <Link
            to="/login"
            style={{
              color: "#0d9488",
              fontWeight: 700
            }}
          >
            Login
          </Link>

        </p>

      </form>

    </main>

  );
}