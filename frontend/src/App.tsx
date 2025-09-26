import { Route, Routes } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <Routes>
        {/* <Route index element={<Home />} />
        <Route path="about" element={<About />} /> */}

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* <Route path="concerts">
          <Route index element={<ConcertsHome />} />
          <Route path=":city" element={<City />} />
          <Route path="trending" element={<Trending />} />
        </Route> */}
      </Routes>
    </>
  );
}

export default App;
