import { useEffect, useState } from "react";
import CountryList from "./Components/CountryList";
import Header from "./Components/Header";
import RegionMenu from "./Components/RegionMenu";
import SearchInput from "./Components/SearchInput";
import ShowMessage from "./Components/showmessage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from "./pages/NoPage";
import Country from "./pages/Country";
import Layout from "./pages/Layout";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path=":country" element={<Country />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
