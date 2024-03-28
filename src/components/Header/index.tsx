import { useCallback, useEffect, useState } from "react";

import IconMoon from "../../assets/icon-moon.svg?react";
import IconSun from "../../assets/icon-sun.svg?react";

import "./index.scss";

const Header = () => {
  const [isLight, setIsLight] = useState(true);

  useEffect(() => {
    const root = document.querySelector(":root");

    if (root?.classList.contains("dark")) {
      setIsLight(false);
    } else setIsLight(true);
  }, []);

  const toggleTheme = useCallback(() => {
    const root = document.querySelector(":root");

    if (isLight) {
      root?.classList.add("dark");
      setIsLight(false);
    } else {
      root?.classList.remove("dark");
      setIsLight(true);
    }
  }, [isLight]);

  return (
    <header>
      <h1>Lista de tarefas</h1>

      <button type="button" className="icon" onClick={toggleTheme}>
        {isLight ? (
          <>
            <h6>Modo diurno</h6>
            <IconSun />
          </>
        ) : (
          <>
            <h6>Modo noturno</h6>
            <IconMoon />
          </>
        )}
      </button>
    </header>
  );
};

export default Header;
