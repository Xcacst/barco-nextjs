// components/ChatContainer.jsx
import React, { useState } from "react";
import ChatPrompt from "./ChatPrompt";

function ChatContainer() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para enviar el mensaje a la API Route de Next.js
  const handleSendMessage = async (message) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: message }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error en la respuesta de la API");
      }

      const data = await response.json();

      // Actualizar el estado con el nuevo mensaje y la respuesta del bot
      setMessages((prev) => [...prev, { user: message, bot: data.response }]);
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Renderizar la lista de mensajes */}
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            <strong>Tú:</strong> {msg.user} <br />
            <strong>Bot:</strong> {msg.bot}
          </li>
        ))}
      </ul>

      {/* Mostrar mensaje de carga */}
      {isLoading && <p>Generando respuesta...</p>}

      {/* Mostrar mensaje de error */}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {/* Componente para enviar mensajes */}
      <ChatPrompt onSend={handleSendMessage} />
    </div>
  );
}

export default ChatContainer;
