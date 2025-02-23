import React, { useState } from "react";

function ChatPrompt({ onSend, isStarted }) {
  const [message, setMessage] = useState("");
  const visibility = {
    opacity: isStarted ? 1 : 0,
    pointerEvents: isStarted ? "auto" : "none",
  }

  const handleSend = () => {
    if (message.trim() === "") return;

    const prompt = `Pour le prompt suivant, réponds dans ce format : {"boatColor": "", "waterColor": "", "backgroundColor1": "", "backgroundColor1": "", "haiku_ligne_1": "", "haiku_ligne_2": "", "haiku_ligne_3": ""}. Tu dois obligatoirement entrer des couleurs hex code pour boatColor, waterColor, backgroundColor1 et backgroundColor2 et enfin générer un haiku sur le thème de la mer, la nostalgie, la navigation, le bateau, et obligatoirement en rapport au prompt pour haiku ligne 1, 2 et 3. Les couleurs pour backgroundColor1 et backgroundColor2 doivent créer un dégradé harmonieux, éviter le blanc pur et le noir pur, et contraster avec boatColor et waterColor. Aucun commentaire, aucun console.log, aucune ligne en plus, juste les valeurs, aucun caractère spécial, aucune infos. Ne met rien pour annoncer la réponse, évite les '\`\`\`' au début et à la fin. Je ne veux rien avant, rien après. Le prompt: ${message}`;

    onSend(prompt);
    setMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div
      style={{
        ...visibility,
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: "1rem",
        display: "flex",
        gap: "0.5rem",
        justifyContent: "center",
        transition: "opacity 0.5s",
      }}
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="What are you thinking about?"
        style={{
          flex: 1,
          padding: "0.5rem",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
      <button
        onClick={handleSend}
        style={{
          padding: "0.5rem 1rem",
          borderRadius: "4px",
          border: "none",
          backgroundColor: "#010b13",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        Send
      </button>
    </div>
  );
}

export default ChatPrompt;
