import { Link, Navigate } from "react-router-dom";
import { problems } from "../data/problems";

export default function Dashboard() {

  const user = JSON.parse(
    localStorage.getItem("medibookUser") || "null"
  );

  // Authentication check
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Doctor redirect
  if (user.role === "doctor") {
    return <Navigate to="/doctor-dashboard" />;
  }

  // Get patient appointments
  const allAppointments = JSON.parse(
    localStorage.getItem("medibookAppointments") || "[]"
  );

  const appointments = allAppointments.filter(
    (appointment) =>
      appointment.patientEmail === user.email
  );

  const pending = appointments.filter(
    (a) => a.status === "Pending"
  ).length;

  const accepted = appointments.filter(
    (a) => a.status === "Accepted"
  ).length;

  const rejected = appointments.filter(
    (a) => a.status === "Rejected"
  ).length;


  return (

    <main className="page">

      <div className="container">

        {/* Welcome Section */}

        <div className="eyebrow">
          Patient Dashboard
        </div>

        <h1 className="page-title">
          Welcome, {user.name} 👋
        </h1>

        <p className="muted">
          Manage your healthcare appointments and
          explore doctors according to your health concerns.
        </p>


        {/* Statistics */}

        <div className="stats">

          <div className="stat">
            <strong>{appointments.length}</strong>
            <span className="muted">
              Total Appointments
            </span>
          </div>

          <div className="stat">
            <strong>{pending}</strong>
            <span className="muted">
              Pending Requests
            </span>
          </div>

          <div className="stat">
            <strong>{accepted}</strong>
            <span className="muted">
              Accepted Appointments
            </span>
          </div>

        </div>


        {/* Health Concerns */}

        <div style={{ marginTop: 40 }}>

          <h2>Explore Health Concerns</h2>

          <p className="muted">
            Select your health concern to find relevant specialists.
          </p>

          <div
            className="grid-4"
            style={{ marginTop: 22 }}
          >

            {problems.map((problem) => (

              <Link
                to={
                  "/doctors?specialty=" +
                  encodeURIComponent(problem.specialty)
                }
                className="card problem-card"
                key={problem.id}
              >

                <div className="problem-icon">
                  {problem.icon}
                </div>

                <h3>{problem.name}</h3>

                <p className="muted">
                  {problem.description}
                </p>

                <span className="tag">
                  {problem.specialty}
                </span>

              </Link>

            ))}

          </div>

        </div>


        {/* Appointment History */}

        <div style={{ marginTop: 45 }}>

          <h2>My Appointments</h2>

          <p className="muted">
            Check your appointment history and current status.
          </p>

          {appointments.length === 0 ? (

            <div className="empty" style={{ marginTop: 20 }}>

              <h3>No Appointments Yet</h3>

              <p>
                You haven't booked any appointments.
              </p>

              <Link
                to="/doctors"
                className="btn btn-primary"
              >
                Find a Doctor
              </Link>

            </div>

          ) : (

            <div
              className="card"
              style={{ marginTop: 20 }}
            >

              {appointments
                .slice()
                .reverse()
                .map((appointment) => (

                  <div
                    className="appointment-row"
                    key={appointment.id}
                  >

                    <div>

                      <h3>
                        {appointment.doctorName}
                      </h3>

                      <p className="muted">
                        Appointment Date: {appointment.date}
                      </p>

                      <p className="muted">
                        Time: {appointment.time}
                      </p>

                    </div>

                    <span
                      className={
                        "status " +
                        appointment.status.toLowerCase()
                      }
                    >
                      {appointment.status}
                    </span>

                  </div>

                ))}

            </div>

          )}

        </div>


        {/* Quick Actions */}

        <div style={{ marginTop: 40 }}>

          <h2>Quick Actions</h2>

          <div
            style={{
              display: "flex",
              gap: 15,
              flexWrap: "wrap",
              marginTop: 18
            }}
          >

            <Link
              to="/doctors"
              className="btn btn-primary"
            >
              Find Doctors
            </Link>

            <Link
              to="/"
              className="btn btn-outline"
            >
              Back to Home
            </Link>

          </div>

        </div>

      </div>

    </main>

  );

}