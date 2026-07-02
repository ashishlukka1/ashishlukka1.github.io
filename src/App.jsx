import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// === Original Portfolio Components ===
import Navbar from "./components/Original/Navbar/Navbar";
import TechStack from "./components/Original/TechStack/TechStack";
import HomeOriginal from "./components/Original/Home/Home";
import Footer from "./components/Original/Footer/Footer";
import Work from "./components/Original/Work/Work";
import About from "./components/Original/About/About";
import ClickSpark from "../ReactBits/ClickSpark/ClickSpark";

// === Bento Components ===
import { GridBackgroundDemo } from "./components/Bento/GridBackgroundDemo";
import BentoHome from "./components/Bento/Home";

// === Typography Components ===
import Home from "./components/typography/Home/Home";
import NewNavbar from "./components/typography/Navbar/Navbar"; // your new navbar
import TypoFooter from "./components/typography/Footer/Footer"; // your new footer
import Library from "./components/typography/Library/Library";
import Olive from "./components/typography/Olive/Olive";
import Draft from "./components/typography/Draft/Draft";
import Seminar from "./components/typography/Seminar/Seminar";
import TypoWork from "./components/typography/Work/Work";
import Lumora from "./components/typography/Lumora/Lumora";
import TypoAbout from "./components/typography/About/About";
import ScrollToTop from "./components/typography/ScrollToTop";
import CleanPortfolio from "./components/clean/CleanPortfolio";
import CodingProfiles from "./components/clean/CodingProfiles";

// === Loading Spinner ===
function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="w-12 h-12 animate-spin">
        <svg
          className="w-full h-full"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="#ffffff"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="#ffffff"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 
               5.291A7.962 7.962 0 014 12H0c0 
               3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    </div>
  );
}

// === Layouts ===

// Typography Layout (/)
function TypographyLayout({ children }) {
  return (
    <div className="">
      <NewNavbar />

      {children}
      <TypoFooter />
    </div>
  );
}

// Original Layout (/og)
function OriginalLayout({ children, isLoading }) {
  return (
    <ClickSpark
      sparkColor="#fff"
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <div style={{ position: "relative", minHeight: "100vh" }}>
        {isLoading && <LoadingOverlay />}
        <Navbar />
        <main className="content">{children}</main>
        <Footer />
      </div>
    </ClickSpark>
  );
}

// Bento Layout (/bento)
function BentoLayout({ children }) {
  return (
    <div className="font-nunito">
      <GridBackgroundDemo />
      <main className="position-relative z-1 text-white">{children}</main>
    </div>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(false);
  window.setAppLoading = setIsLoading;

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Clean Portfolio — main */}
        <Route path="/" element={<CleanPortfolio />} />
        <Route path="/profiles" element={<CodingProfiles />} />

        {/* Typography Portfolio */}
        <Route
          path="/design"
          element={
            <TypographyLayout>
              <Home setLoading={setIsLoading} />
            </TypographyLayout>
          }
        />
        <Route
          path="/design/digital-academic-library"
          element={
            <TypographyLayout>
              <Library setLoading={setIsLoading} />
            </TypographyLayout>
          }
        />
        <Route
          path="/design/olive-crypto-systems"
          element={
            <TypographyLayout>
              <Olive setLoading={setIsLoading} />
            </TypographyLayout>
          }
        />
        <Route
          path="/design/draft-blogapp"
          element={
            <TypographyLayout>
              <Draft setLoading={setIsLoading} />
            </TypographyLayout>
          }
        />
        <Route
          path="/design/campus-hall-scheduler"
          element={
            <TypographyLayout>
              <Seminar setLoading={setIsLoading} />
            </TypographyLayout>
          }
        />
        <Route
          path="/design/lumora"
          element={
            <TypographyLayout>
              <Lumora setLoading={setIsLoading} />
            </TypographyLayout>
          }
        />
        <Route
          path="/design/work"
          element={
            <TypographyLayout>
              <TypoWork setLoading={setIsLoading} />
            </TypographyLayout>
          }
        />
        <Route
          path="/design/about"
          element={
            <TypographyLayout>
              <TypoAbout setLoading={setIsLoading} />
            </TypographyLayout>
          }
        />

        {/* Original Portfolio */}
        <Route
          path="/og"
          element={
            <OriginalLayout isLoading={isLoading}>
              <HomeOriginal setLoading={setIsLoading} />
            </OriginalLayout>
          }
        />
        <Route
          path="/og/work"
          element={
            <OriginalLayout isLoading={isLoading}>
              <Work setLoading={setIsLoading} />
            </OriginalLayout>
          }
        />
        <Route
          path="/og/about"
          element={
            <OriginalLayout isLoading={isLoading}>
              <About setLoading={setIsLoading} />
            </OriginalLayout>
          }
        />
        <Route
          path="/og/tech-stack"
          element={
            <OriginalLayout isLoading={isLoading}>
              <TechStack setLoading={setIsLoading} />
            </OriginalLayout>
          }
        />

        {/* Bento Portfolio */}
        <Route
          path="/bento"
          element={
            <BentoLayout>
              <BentoHome />
            </BentoLayout>
          }
        />

        {/* Redirect unknown paths */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default function WrappedApp() {
  return (
    <Router>
      <App />
      <Analytics />
    </Router>
  );
}
