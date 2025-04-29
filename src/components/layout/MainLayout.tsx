import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

const MainLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar toggleSidebar={toggleSidebar} />
      
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />
        
        <main className="flex-1 pt-16 px-4 md:px-6 pb-12">
          <Outlet />
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default MainLayout;