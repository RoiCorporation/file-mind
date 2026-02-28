import Header from "./Header"
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Footer from "./Footer";
import UploadFile from '../../upload/components/UploadFile'

const App = () => {
    return(
        <>
            <Header/>
            <main>
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