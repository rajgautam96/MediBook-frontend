import { Link, useNavigate } from "react-router-dom";
import { problems, doctors } from "../data/problems";

export default function Home() {

  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}

      <section className="hero">
        <div className="container hero-grid">

          <div>

            <div className="eyebrow">
              Your Health, Our Priority
            </div>

            <h1>
              Find the Right Doctor.
              <br />
              <span>Feel Better.</span>
            </h1>

            <p>
              Book appointments with trusted doctors.
              Choose your health concern, explore specialists
              and schedule a visit with ease.
            </p>

            <div style={{
              display: "flex",
              gap: 12,
              marginTop: 24,
              flexWrap: "wrap"
            }}>

              <Link className="btn btn-primary" to="/doctors">
                Find a Doctor →
              </Link>

              <Link className="btn btn-outline" to="/register">
                Create Account
              </Link>

            </div>

          </div>

          <div className="hero-art">
            🩺
          </div>

        </div>
      </section>


      {/* Health Concerns */}

      <section className="section">

        <div className="container">

          <div className="section-head">

            <div className="eyebrow">
              Explore By Concern
            </div>

            <h2>
              What Brings You Here Today?
            </h2>

            <p>
              Select a health concern to explore relevant specialists.
            </p>

          </div>


          <div className="grid-4">

            {problems.map((problem) => (

              <button
                className="card problem-card"
                key={problem.id}
                onClick={() =>
                  navigate(
                    "/doctors?specialty=" +
                    encodeURIComponent(problem.specialty)
                  )
                }
              >

                <div className="problem-icon">
                  {problem.icon}
                </div>

                <h3>{problem.name}</h3>

                <p className="muted">
                  {problem.description}
                </p>

                <span className="tag">
                  Find Specialists →
                </span>

              </button>

            ))}

          </div>

        </div>

      </section>


      {/* Popular Doctors */}

      <section
        className="section"
        style={{ background: "white" }}
      >

        <div className="container">

          <div className="section-head">

            <div className="eyebrow">
              Our Specialists
            </div>

            <h2>
              Meet Our Doctors
            </h2>

            <p>
              Explore doctors across different specializations.
            </p>

          </div>


          <div className="grid-4">

            {doctors.slice(0, 4).map((doctor) => (

              <div
                className="card doctor-card"
                key={doctor.id}
              >

                <div className="doctor-avatar">
                  {doctor.emoji}
                </div>

                <h3>{doctor.name}</h3>

                <p className="muted">
                  {doctor.specialty}
                </p>

                <p className="muted">
                  ⭐ {doctor.rating} · {doctor.experience} experience
                </p>

                <Link
                  className="btn btn-outline full"
                  to={`/appointment/${doctor.id}`}
                >
                  Book Appointment
                </Link>

              </div>

            ))}

          </div>


          <div style={{
            textAlign: "center",
            marginTop: 28
          }}>

            <Link
              className="btn btn-primary"
              to="/doctors"
            >
              View All Doctors
            </Link>

          </div>

        </div>

      </section>

    </>
  );
}