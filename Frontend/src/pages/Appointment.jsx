import { useState } from "react";

import {
  Link,
  Navigate,
  useNavigate,
  useParams
} from "react-router-dom";

import { doctors } from "../data/problems";

export default function Appointment() {

  const { id } = useParams();

  const doctor = doctors.find(
    (d) => d.id === Number(id)
  );

  const user = JSON.parse(
    localStorage.getItem("medibookUser") || "null"
  );

  const navigate = useNavigate();

  const [date, setDate] = useState("");

  const [time, setTime] = useState("10:00 AM");

  const [message, setMessage] = useState("");


  if (!doctor) {

    return (

      <main className="page container">

        <div className="empty">

          Doctor not found.

          <Link to="/doctors">
            Browse Doctors
          </Link>

        </div>

      </main>

    );

  }


  if (!user) {
    return <Navigate to="/login" />;
  }


  function book(e) {

    e.preventDefault();

    if (user.role !== "patient") {

      setMessage(
        "Only patient accounts can book appointments."
      );

      return;

    }


    const appointments = JSON.parse(
      localStorage.getItem("medibookAppointments") || "[]"
    );


    const appointment = {

      id: Date.now(),

      doctorId: doctor.id,

      doctorName: doctor.name,

      doctorEmail: "",

      patientName: user.name,

      patientEmail: user.email,

      date,

      time,

      status: "Pending"

    };


    localStorage.setItem(
      "medibookAppointments",
      JSON.stringify([
        ...appointments,
        appointment
      ])
    );


    navigate("/dashboard");

  }


  const today = new Date()
    .toISOString()
    .split("T")[0];


  return (

    <main className="page">

      <div className="form-card">

        <div className="eyebrow">
          Schedule a Visit
        </div>

        <h1 className="page-title">
          Book Appointment
        </h1>


        {/* Doctor Details */}

        <div
          className="card"
          style={{
            margin: "20px 0",
            boxShadow: "none"
          }}
        >

          <div className="doctor-avatar">
            {doctor.emoji}
          </div>

          <h3>{doctor.name}</h3>

          <span className="tag">
            {doctor.specialty}
          </span>

          <p className="muted">
            {doctor.experience} experience · ⭐ {doctor.rating}
          </p>

          <strong>
            Consultation Fee: ₹{doctor.fee}
          </strong>

        </div>


        {message && (

          <p style={{ color: "#dc2626" }}>
            {message}
          </p>

        )}


        {/* Booking Form */}

        <form onSubmit={book}>

          <div className="form-group">

            <label>
              Appointment Date
            </label>

            <input
              className="form-control"
              type="date"
              min={today}
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

          </div>


          <div className="form-group">

            <label>
              Available Time
            </label>

            <select
              className="form-control"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            >

              <option>10:00 AM</option>
              <option>11:00 AM</option>
              <option>12:00 PM</option>
              <option>02:00 PM</option>
              <option>03:00 PM</option>
              <option>04:00 PM</option>
              <option>05:00 PM</option>

            </select>

          </div>


          <button
            className="btn btn-primary full"
            type="submit"
          >
            Confirm Appointment
          </button>

        </form>

      </div>

    </main>

  );

}