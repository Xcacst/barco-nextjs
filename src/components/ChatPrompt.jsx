import React, {useState} from "react";

function ChatPrompt({onSend, isStarted}) {
	const [message, setMessage] = useState("");
	const visibility = {
		opacity: isStarted ? 1 : 0,
		pointerEvents: isStarted ? "auto" : "none",
	}
	
	const handleSend = (e) => {
		e.preventDefault();
		if (message.trim() === "") return;
		
		const prompt = `Pour le prompt suivant, réponds dans ce format : {"boatColor": "", "waterColor": "", "backgroundColor1": "", "backgroundColor2": "", "haiku_ligne_1": "", "haiku_ligne_2": "", "haiku_ligne_3": ""}. Tu dois obligatoirement entrer des couleurs hex code pour boatColor, waterColor, backgroundColor1 et backgroundColor2; puis générer un haiku sur le thème de la mer, la nostalgie, la navigation, les navires et obligatoirement en rapport au prompt pour haiku ligne 1, 2 et 3. BackgroundColor1 et BackgroundColor2 doivent être agréables ensemble pour un dégradé de l'un vers l'autre. BoatColor et WaterColor doivent contraster avec BackgroundColor1 et BackgroundColor2 pour être visibles. Aucun commentaire, aucun console.log, aucune ligne en plus, juste les valeurs, aucun caractère spécial, aucune infos. Ne met rien pour annoncer la réponse, évite les '\`\`\`' au début et à la fin. Je ne veux rien avant, rien après. Le prompt: ${message}`;
		
		onSend(prompt);
		setMessage("");
	};
	
	return (
		 <form
				onSubmit={handleSend}
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
					placeholder="How are you feeling?"
					style={{
						flex: 1,
						padding: "0.5rem",
						borderRadius: "4px",
						border: "1px solid #ccc",
					}}
			 />
			 <button
					type="submit"
					style={{
						padding: "0.5rem 1rem",
						borderRadius: "4px",
						border: "none",
						backgroundColor: "#010b13",
						color: "#fff",
						cursor: "pointer",
					}}
			 >
				 Feel
			 </button>
		 </form>
	);
}

export default ChatPrompt;
