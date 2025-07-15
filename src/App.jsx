// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

// Import your components
import SideBar from "./components/SideBar";
import WelcomeScreen from "./components/welcomeScreen";
import MoodSelector from "./components/MoodSelector";
import ChatPage from "./components/ChatPage";
import ChatContainer from "./components/ChatContainer";


function App() {
  return (
    <Router>
      {/* Outer wrapper for the entire application, consistent with your images */}
      <div className="min-h-screen bg-[#fff0f5] flex items-center justify-center"> 
        <Routes>
          {/* Route for the Welcome Screen */}
          <Route
            path="/" // This is the route for your welcome screen
            element={
              <ChatContainer>
                <SideBarWithNavigation /> 
                <WelcomeScreen />
              </ChatContainer>
            }
          />

          {/* Route for Mood Selection Page */}
          <Route
            path="/mood"
            element={
              <ChatContainer>
                <SideBarWithNavigation />
                <MoodSelector />
              </ChatContainer>
            }
          />

          {/* Route for Chat Page */}
          <Route
            path="/chat"
            element={
              <ChatContainer>
                {/* This one was already correct */}
                <SideBarWithNavigation />
                <ChatPage />
              </ChatContainer>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

// Helper wrapper component to provide navigate to SideBar
const SideBarWithNavigation = () => {
    const navigate = useNavigate();
    return <SideBar onClose={() => navigate('/')} />; // 'X' button always goes back to welcome
};


export default App;