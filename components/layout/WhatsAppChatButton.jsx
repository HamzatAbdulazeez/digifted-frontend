"use client";
import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";

const WhatsAppFloat = () => {
  const [isHovered, setIsHovered] = useState(false);
  const phoneNumber = "+2349052464819"; 
  const message = "Hello! I'm interested in learning more about your services.";
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <>
      {/* Floating WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Tooltip */}
        <div
          className={`absolute left-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg transition-all duration-300 ${
            isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 pointer-events-none"
          }`}
        >
          Chat with us on WhatsApp
          <div className="absolute left-0 top-1/2 -translate-y-1/2 translate-x-full border-8 border-transparent border-l-gray-900"></div>
        </div>

        {/* Main Button */}
        <div className="relative">
          {/* Pulse Animation */}
          <div className="absolute inset-0 bg-[#053276] rounded-full animate-ping opacity-75"></div>
          
          {/* Button */}
          <div className="relative bg-[#053276] hover:bg-red-600 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110">
            <MessageCircle size={32} className="fill-current" />
          </div>

          {/* Notification Badge (optional) */}
          <div className="absolute -top-1 -left-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-white">
            1
          </div>
        </div>
      </a>

      {/* Mobile-friendly version - slightly smaller */}
      <style>{`
        @media (max-width: 640px) {
          .group {
            bottom: 1rem;
            left: 1rem;
          }
        }
      `}</style>
    </>
  );
};

// Alternative: Chat Widget Style (uncomment to use instead)
const WhatsAppChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = "2349052464819"; // Format: country code + number (no + or spaces)
  const message = "Hello! I'd like to get in touch.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Chat Box */}
      {isOpen && (
        <div className="absolute bottom-20 left-0 w-80 bg-white rounded-xl shadow-2xl mb-4 overflow-hidden animate-in slide-in-from-bottom">
          {/* Header */}
          <div className="bg-red-600 text-white p-4 flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <MessageCircle size={24} className="text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Chat with us</h3>
              <p className="text-xs text-green-100">Typically replies instantly</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-green-700 rounded-full p-1 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-gray-50">
            <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
              <p className="text-sm text-gray-700 mb-3">
                👋 Hi there! Have any questions? We're here to help!
              </p>
              <p className="text-xs text-gray-500">
                Click below to start chatting on WhatsApp
              </p>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-[#053276] hover:bg-red-600 text-white text-center py-3 rounded-lg font-semibold transition-colors"
            >
              Start Chat
            </a>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#053276] hover:bg-red-600 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 relative"
      >
        {isOpen ? (
          <X size={32} />
        ) : (
          <>
            <MessageCircle size={32} className="fill-current" />
            <div className="absolute -top-1 -left-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-white animate-pulse">
              1
            </div>
          </>
        )}
      </button>
    </div>
  );
};

export default WhatsAppFloat;