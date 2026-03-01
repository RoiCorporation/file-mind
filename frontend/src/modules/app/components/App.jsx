import Header from "./Header"
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Footer from "./Footer";
import UploadFile from '../../upload/components/UploadFile'
import { API_BASE } from "../../../lib/api";


const App = () => {
    return(
        <>
            <Header/>
            <main style={{ minHeight: "calc(100vh - 60px)" }}>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/upload" element={<UploadFile/>}/>
                </Routes>
            </main>
            <Footer/>
        </>
    );
}

export default App;