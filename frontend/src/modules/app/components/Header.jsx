import { Link } from "react-router-dom";
import logo from "../../../assets/filemind-logo.png";

const Header = () => {
    return(
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
                <Link className="navbar-brand fw-bold" to="/">
                <img 
                    src={logo}
                    alt="FileMind Logo"
                    height="36"
                    className="rounded me-2"
                />
                FileMind
                </Link>

                <div className="ms-auto d-flex gap-3">
                    <Link className="nav-link text-white" to="/upload">
                        Importar archivos
                    </Link>
                </div>
            </nav>
        </header>
    )
}

export default Header;