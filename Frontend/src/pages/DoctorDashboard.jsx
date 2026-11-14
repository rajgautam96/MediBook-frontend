import { Navigate } from "react-router-dom";

export default function DoctorDashboard() {

  const user = JSON.parse(
    localStorage.getItem("medibookUser") || "null"
  );

  // Authentication check
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Only doctor can access
  if (user.role !== "doctor") {
    return <Navigate to="/dashboard" />;
  }


  // Get all appointments
  const allAppointments = JSON.parse(
    localStorage.getItem("medibookAppointments") || "[]"
  );


  // Match appointments with doctor's specialization
  const appointments = allAppointments.filter(
    (appointment) =>
      appointment.doctorEmail === user.email ||
      (
        user.specialty &&
        appointment.doctorSpecialty === user.specialty
      )
  );


  // Statistics
  const total = appointments.length;

  const pending = appointments.filter(
    (a) => a.status === "Pending"
  ).length;

  const accepted = appointments.filter(
    (a) => a.status === "Accepted"
  ).length;

  const rejected = appointments.filter(
    (a) => a.status === "Rejected"
  ).length;


  // Accept or Reject Appointment
  function updateStatus(id, status) {

    const updatedAppointments = allAppointments.map(
      (appointment) => {

        if (appointment.id === id) {

          return {
            ...appointment,
            status: status
          };

        }

        return appointment;

      }
    );


    localStorage.setItem(
      "medibookAppointments",
      JSON.stringify(updatedAppointments)
    );


    window.location.reload();

  }


  return (

    <main className="page">

      <div className="container">

        {/* Welcome */}

        <div className="eyebrow">
          Doctor Dashboard
        </div>

        <h1 className="page-title">
          Welcome, Dr. {user.name} 👨‍⚕️
        </h1>

        <p className="muted">
          Manage your patient appointments and requests.
        </p>


        {/* Doctor Information */}

        <div
          className="card"
          style={{ marginTop: 25 }}
        >

          <h3>Doctor Profile</h3>

          <p className="muted">
            Name: {user.name}
          </p>

          <p className="muted">
            Email: {user.email}
          </p>

          <p className="muted">
            Specialization: {user.specialty || "Not specified"}
          </p>

        </div>


        {/* Statistics */}

        <div className="stats">

          <div className="stat">

            <strong>{total}</strong>

            <span className="muted">
              Total Requests
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


        {/* Appointment Requests */}

        <h2 style={{ marginTop: 35 }}>
          Patient Appointment Requests
        </h2>


        {appointments.length === 0 ? (

          <div className="empty">

            <h3>No Appointment Requests</h3>

            <p>
              You currently don't have any patient requests.
            </p>

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

                  {/* Patient Details */}

                  <div>

                    <h3>
                      {appointment.patientName}
                    </h3>

                    <p className="muted">
                      {appointment.patientEmail}
                    </p>

                    <p className="muted">
                      Date: {appointment.date}
                    </p>

                    <p className="muted">
                      Time: {appointment.time}
                    </p>

                    <span
                      className={
                        "status " +
                        appointment.status.toLowerCase()
                      }
                    >
                      {appointment.status}
                    </span>

                  </div>


                  {/* Actions */}

                  <div className="actions">

                    {appointment.status === "Pending" && (

                      <>

                        <button
                          className="small-btn"
                          style={{
                            background: "#dcfce7",
                            color: "#166534"
                          }}
                          onClick={() =>
                            updateStatus(
                              appointment.id,
                              "Accepted"
                            )
                          }
                        >
                          Accept
                        </button>


                        <button
                          className="small-btn"
                          style={{
                            background: "#fee2e2",
                            color: "#991b1b"
                          }}
                          onClick={() =>
                            updateStatus(
                              appointment.id,
                              "Rejected"
                            )
                          }
                        >
                          Reject
                        </button>

                      </>

                    )}

                  </div>

                </div>

              ))}

          </div>

        )}


        {/* Summary */}

        <div style={{ marginTop: 35 }}>

          <h2>Appointment Summary</h2>

          <div className="grid-3" style={{ marginTop: 18 }}>

            <div className="card">

              <h3>Pending</h3>

              <h2 style={{ color: "#d97706" }}>
                {pending}
              </h2>

            </div>


            <div className="card">

              <h3>Accepted</h3>

              <h2 style={{ color: "#16a34a" }}>
                {accepted}
              </h2>

            </div>


            <div className="card">

              <h3>Rejected</h3>

              <h2 style={{ color: "#dc2626" }}>
                {rejected}
              </h2>

            </div>

          </div>

        </div>

      </div>

    </main>

  );

}