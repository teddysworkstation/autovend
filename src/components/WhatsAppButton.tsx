import { MessageCircle, X } from "lucide-react";
import { useState } from "react";

const WHATSAPP_NUMBER = "19025168578";
const WHATSAPP_MESSAGE = "Hi! I'd like to chat about your vending machines. Are you available to help? Thanks!";

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(WHATSAPP_MESSAGE);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {isOpen && (
        <div className="mb-4 bg-white rounded-2xl shadow-lg border border-gray-200 p-4 w-80 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-semibold text-gray-800">Chat with us on WhatsApp</h3>
              <p className="text-xs text-green-600 font-medium mt-1">🟢 Active 24/7</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            💬 Live chat support available 24/7! Ask about pricing, placement, returns, and more. We typically respond within minutes.
          </p>
          <button
            onClick={() => {
              handleWhatsAppClick();
              setIsOpen(false);
            }}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            Open Live Chat
          </button>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-200 hover:scale-110 flex items-center justify-center relative"
        title="💬 Live Chat Support 24/7 - Click to Start"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
      </button>
    </div>
  );
}
