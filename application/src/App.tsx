import React, { useEffect } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import "./App.css"
import Home from "./pages/Home"
import QuestionsPage from "./pages/QuestionsPage"
import ResultsPage from "./pages/Results"

function App() {

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL || ""}>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/questions" element={<QuestionsPage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
