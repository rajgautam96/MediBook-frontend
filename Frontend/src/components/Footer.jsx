export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="logo" style={{ color: "white" }}>
          MediBook.
        </div>

        <p>
          Making healthcare access simpler. Find doctors and manage
          appointments with ease.
        </p>

        <p>
          © {new Date().getFullYear()} MediBook. All rights reserved.
        </p>
      </div>
    </footer>
  );
}