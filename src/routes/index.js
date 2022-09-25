import React from "react";
import { Switch } from "react-router-dom";
import { generateModules } from "../util/generateModules";

const App = ({ match }) => {
  const token = JSON.parse(localStorage.getItem("token"));

  const rutas = generateModules(token, "ruta", match);
  return (
    <div className="gx-main-content-wrapper">
      {rutas ? <Switch>{rutas.map((item) => item)}</Switch> : null}
    </div>
  );
};

export default App;
