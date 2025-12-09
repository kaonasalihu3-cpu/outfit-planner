function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p>© {new Date().getFullYear()} glowup beauty. All rights reserved.</p>
        <p className="footer-sub">
          Cruelty-free · Vegan-friendly · Made with love 💗
        </p>
      </div>
    </footer>
  );
}

export default Footer;