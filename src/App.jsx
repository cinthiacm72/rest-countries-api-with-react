import React, { useState } from "react";
import "./App.css";
import "./index.css";
import { Route, Routes, BrowserRouter, HashRouter } from "react-router-dom";
import Countries from "./components/Countries";
import Country from "./components/Country";
import Header from "./components/Header";

function App() {
  let initialTheme;
  if (localStorage) {
    initialTheme = localStorage.getItem("theme");
  }

  const [theme, setTheme] = useState(initialTheme);

  const handleDarkMode = () => {
    setTheme("dark");
    localStorage.setItem("theme", "dark");
  };

  const handleLightMode = () => {
    setTheme("light");
    localStorage.setItem("theme", "light");
  };

  return (
    <div className='container' data-theme={theme}>
      <Header
        handleLightMode={handleLightMode}
        handleDarkMode={handleDarkMode}
        theme={theme}
        setTheme={setTheme}
        initialTheme={initialTheme}
      />
      <main>
        <HashRouter>
          <Routes>
            <Route path='/' element={<Countries />}></Route>
            <Route path='/countries/:countryname' element={<Country />}></Route>
          </Routes>
        </HashRouter>
      </main>
    </div>
  );
}

export default App;
