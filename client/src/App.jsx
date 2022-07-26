import { Navbar, Service, Footer, Market, Create, Mine, Mylisted, Resell } from "../components"
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {

  return (
    <BrowserRouter>
      <div >
        <Navbar />

        <Routes>
          <Route path="/" element={<Market />} />
          <Route path="/market" element={<Market />} />
          <Route path="/create" element={<Create />} />
          <Route path="/mine" element={<Mine />} />
          <Route path="/mylisted" element={<Mylisted />} />
          <Route path="/resell" element={<Resell />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
