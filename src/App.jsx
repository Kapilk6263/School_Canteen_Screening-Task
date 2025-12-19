import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import Layout from './components/Layout';
import SnacksPage from './pages/SnacksPage';
import StudentsPage from './pages/StudentsPage';
import StudentDetailPage from './pages/StudentDetailPage';
import CreateStudentPage from './pages/CreateStudentPage';

function App() {
  return (
    <Router>
      <StoreProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<SnacksPage />} />
            <Route path="/students" element={<StudentsPage />} />
            <Route path="/students/new" element={<CreateStudentPage />} />
            <Route path="/students/:id" element={<StudentDetailPage />} />
          </Routes>
        </Layout>
      </StoreProvider>
    </Router>
  );
}

export default App;
