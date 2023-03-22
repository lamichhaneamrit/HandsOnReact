import Navbar from "./Navbar";
import { Route, Routes } from "react-router-dom";
//import Anwesenheit from './Anwesenheit';
//import Allrecords from "./pages/Allrecords";
import AnwesenheitAjax from './AnwesenheitAjax';
//import AnwesenheitStatus from './AnwesenheitStatus';
import Datastored from "./pages/Datastored";
import AnwesenheitKommentar from './AnwesenheitKommentar';
import PascalDataGrid from "./pages/MainScripts/PascalDataGrid";
import Appointments from "./pages/outlook_termine/termine";
function App() {
  
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<>  <AnwesenheitAjax   /> <AnwesenheitKommentar /> </>} />
          <Route path="/MeinKonto" element={<PascalDataGrid />} />
        
          <Route path="/dataStored" element={< Datastored />} />

          <Route path="/termine" element={< Appointments />} />
        </Routes>
        </div>
        
    
    

    </>
  )
}

export default App
