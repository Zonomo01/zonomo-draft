"use client";

import { useState } from "react";
import { Bot, MessageCircle, X } from "lucide-react";

const AIButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAIClick = () => {
    // For now, just toggle a simple state or implement your AI chat functionality
    setIsOpen(!isOpen);
    // You can implement AI chat modal, redirect to AI service, or any other functionality here
    console.log("AI Assistant clicked");
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleAIClick}
          className="group relative bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-emerald-500/25"
          title="AI Assistant"
        >
          <Bot className="w-6 h-6" />

          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            AI Assistant
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        </button>
      </div>

      {/* Simple AI Chat Modal (you can replace this with your preferred AI implementation) */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-96 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-semibold">AI Assistant</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="flex items-start gap-3 mb-4">
                <Bot className="w-6 h-6 text-emerald-600 mt-1" />
                <div className="bg-gray-100 rounded-lg p-3 flex-1">
                  <p className="text-sm">
                    Hello! I&apos;m your AI assistant. How can I help you today?
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIButton;
