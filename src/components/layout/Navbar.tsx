import React, { useState, useEffect } from 'react';
import { Menu, X, Home, Info, Image, Grid, Phone, Camera } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../common/Button';

const Navbar: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: 'Trang chủ', path: '/', type: 'page', icon: <Home size={24} /> },
    { name: 'Giới thiệu', path: '/about', type: 'page', icon: <Info size={24} /> },
    { name: 'Bộ sưu tập', path: '/gallery', type: 'page', icon: <Image size={24} /> },
    { name: 'Kho Frame', path: '/frames', type: 'page', icon: <Grid size={24} /> },
    { name: 'Liên hệ', path: '/contact', type: 'page', icon: <Phone size={24} /> },
  ];

  const handleNavigation = (link: { name: string, path: string, type: string, id?: string }) => {
    if (window.innerWidth < 768) {
        setSidebarOpen(false);
    }
    if (link.type === 'page') {
      navigate(link.path);
      window.scrollTo(0, 0);
    } else if (link.type === 'scroll' && link.id) {
      if (location.pathname === '/') {
        const element = document.getElementById(link.id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate(`/#${link.id}`);
      }
    }
  };

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  const handleBooking = () => {
     if (window.innerWidth < 768) setSidebarOpen(false);
     if (location.pathname === '/') {
        const element = document.getElementById('photobooth');
        if (element) {
           element.scrollIntoView({ behavior: 'smooth' });
        }
     } else {
        navigate('/#photobooth');
     }
  }

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 h-screen bg-white/95 backdrop-blur-md shadow-2xl z-50 transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) border-r border-slate-100 flex flex-col w-80 ${
          isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full shadow-none'
        }`}
      >
        <div className="p-6 flex items-center justify-between border-b border-slate-50">
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={handleLogoClick}
          >
             <div className="w-10 h-10 rounded-xl overflow-hidden shadow-md">
               <img src="/logo.jpeg" alt="Logo" className="w-full h-full object-cover" />
             </div>
             <span className="font-bold text-xl text-slate-800 tracking-tight">Palette</span>
          </div>

          <button 
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-red-500 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 flex flex-col gap-2 p-4 overflow-y-auto">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavigation(link)}
              className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group text-left ${
                location.pathname === link.path 
                  ? 'bg-brand-50 text-brand-600 shadow-sm' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-brand-500'
              }`}
            >
              <div className={`${location.pathname === link.path ? 'text-brand-600' : 'text-slate-400 group-hover:text-brand-500'}`}>
                {link.icon}
              </div>
              
              <span className="font-medium text-lg">
                {link.name}
              </span>
              
              {location.pathname === link.path && (
                 <div className="ml-auto w-2 h-2 rounded-full bg-brand-500" />
              )}
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-slate-100 mt-auto">
            <Button 
              onClick={handleBooking} 
              fullWidth={true}
              className="flex items-center justify-center gap-2"
            >
               <Camera size={20} />
               <span>Chụp Thử Ngay</span>
            </Button>
        </div>
      </nav>

      <button 
        onClick={() => setSidebarOpen(true)}
        className={`fixed top-6 left-6 z-40 p-3 bg-white/90 backdrop-blur-md shadow-lg rounded-full text-slate-700 hover:text-brand-600 hover:scale-110 transition-all duration-300 group border border-slate-100 ${isSidebarOpen ? 'opacity-0 scale-0 pointer-events-none' : 'opacity-100 scale-100'}`}
        title="Mở Menu"
      >
        <Menu size={28} />
      </button>

      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300 ${
            isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setSidebarOpen(false)}
      />
    </>

  );
};

export default Navbar;