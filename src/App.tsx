import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { ChatPage } from './pages/ChatPage';
import { MoodTrackerPage } from './pages/MoodTrackerPage';
import { WellbeingPlanPage } from './pages/WellbeingPlanPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { EmergencyHelp } from './components/EmergencyHelp';
import { LoginPage } from './pages/auth/login';
import { SignupPage } from './pages/auth/signup';
import { useState } from "react";

function App() {
  const [socket, setsocket] = useState(null)
  return (
    
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Navbar />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/chat" element={<ChatPage
                                socket={socket}
                                setSocket={setsocket}
            />} />
            <Route path="/mood-tracker" element={<MoodTrackerPage />} />
            <Route path="/wellbeing-plan" element={<WellbeingPlanPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/signup" element={<SignupPage />} />
          </Routes>
        </main>

        <EmergencyHelp />
      </div>
    
  );
}

export default App;