import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { doctors } from "../data/problems";

export default function Doctors() {

  const [params] = useSearchParams();

  const [search, setSearch] = useState("");

  const [specialty, setSpecialty] = useState(
    params.get("specialty") || ""
  );


  const filtered = useMemo(() => {

    return doctors.filter((doctor) => {

      const matchesSearch =
        doctor.name.toLowerCase().includes(search.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(search.toLowerCase());

      const matchesSpecialty =
        !specialty || doctor.specialty === specialty;

      return matchesSearch && matchesSpecialty;

    });

  }, [search, specialty]);


  return (

    <main className="page">

      <div className="container">

        <div className="eyebrow">
          Find Your Specialist
        </div>

        <h1 className="page-title">
          Our Doctors
        </h1>

        <p className="muted">
          Choose a doctor based on specialization and consultation details.
        </p>


        {/* Search and Filter */}

        <div className="toolbar">

          <input
            className="form-control"
            placeholder="Search doctor or specialty..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />


          <select
            className="form-control"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
          >

            <option value="">
              All Specializations
            </option>

            {[...new Set(doctors.map((d) => d.specialty))].map(
              (specialization) => (

                <option
                  key={specialization}
                  value={specialization}
                >
                  {specialization}
                </option>

              )
            )}

          </select>


          <button
            className="btn btn-outline"
            onClick={() => {
              setSearch("");
              setSpecialty("");
            }}
          >
            Clear Filters
          </button>

        </div>


        {/* Doctors List */}

        {filtered.length === 0 ? (

          <div className="empty">
            No doctors found for this search.
          </div>

        ) : (

          <div className="grid-3">

            {filtered.map((doctor) => (

              <div
                className="card doctor-card"
                key={doctor.id}
              >

                <div className="doctor-avatar">
                  {doctor.emoji}
                </div>

                <h3>{doctor.name}</h3>

                <span className="tag">
                  {doctor.specialty}
                </span>

                <p className="muted">
                  {doctor.about}
                </p>

                <p className="muted">
                  ⭐ {doctor.rating} · {doctor.experience} experience
                </p>

                <h3>
                  ₹{doctor.fee}

                  <small className="muted">
                    {" "}/ consultation
                  </small>
                </h3>

                <Link
                  className="btn btn-primary full"
                  to={`/appointment/${doctor.id}`}
                >
                  Book Appointment
                </Link>

              </div>

            ))}

          </div>

        )}

      </div>

    </main>

  );

}