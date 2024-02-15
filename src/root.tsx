import "./root.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import CommonFeatures from "./CommonFeatures";

function Root() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<CommonFeatures direction="ltr" />} />
        </Routes>
      </main>
    </Router>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
