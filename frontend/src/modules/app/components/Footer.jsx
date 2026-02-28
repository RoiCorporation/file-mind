const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-auto">
      <div className="container">
        <small>© {new Date().getFullYear()} FileMind </small>
      </div>
    </footer>
  );
};

export default Footer;