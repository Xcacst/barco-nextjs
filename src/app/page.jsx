'use client';

import {useState} from "react";
import {Canvas} from "@react-three/fiber";
import {TransformControls} from "@react-three/drei";
import {Botella, Barco} from "@/components/BarcoyBotella.jsx";
import ChatPrompt from "@/components/ChatPrompt.jsx";
import Haiku from "@/components/Haiku.jsx";
import MusicPlayer from "@/components/MusicPlayer.jsx";

const App = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [boatColor, setBoatColor] = useState();
	const [backgroundColor1, setBackgroundColor1] =
		 useState("rgb(148, 163, 184)");
	const [backgroundColor2, setBackgroundColor2] = useState("#fffce0");
	const [waterColor, setWaterColor] = useState();
	const [haikuLigne1, setHaikuLigne1] = useState();
	const [haikuLigne2, setHaikuLigne2] = useState();
	const [haikuLigne3, setHaikuLigne3] = useState();
	
	const handleSendMessage = async (message) => {
		setIsLoading(true);
		setError(null);
		
		try {
			const response = await fetch("http://localhost:3000/api/gemini", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({prompt: message}),
			});
			
			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || "Error en la respuesta de la API");
			}
			
			const data = await response.json();
			
			const rawResponse = data.response;
			
			const cleanedResponse = rawResponse.trim().replace(/,\s*}/g, "}");
			
			const parsedResponse = JSON.parse(cleanedResponse);
			
			console.log("Respuesta:", parsedResponse);
			
			const {
				boatColor,
				waterColor,
				backgroundColor1,
				backgroundColor2,
				haiku_ligne_1,
				haiku_ligne_2,
				haiku_ligne_3,
			} = parsedResponse;
			
			if (backgroundColor1) setBackgroundColor1(backgroundColor1);
			if (backgroundColor2) setBackgroundColor2(backgroundColor2);
			if (boatColor) setBoatColor(boatColor);
			if (waterColor) setWaterColor(waterColor);
			if (haiku_ligne_1) setHaikuLigne1(haiku_ligne_1);
			if (haiku_ligne_2) setHaikuLigne2(haiku_ligne_2);
			if (haiku_ligne_3) setHaikuLigne3(haiku_ligne_3);
		} catch (error) {
			console.error("Error al enviar el mensaje:", error);
			setError(error.message);
		} finally {
			setIsLoading(false);
		}
	};
	
	return (
		 <div
				style={{
					background: `linear-gradient(to bottom, ${backgroundColor1} 50%, ${backgroundColor2} 100% )`,
					width: "100svw",
					height: "100svh",
					position: "relative",
					overflow: "hidden",
				}}
		 >
			 <MusicPlayer/>
			 <div className="container">
				 <Canvas
						camera={{position: [25, 5, -5], fov: 9}}
						gl={{localClippingEnabled: true}}
						style={{left: "10%", top: "10%"}}
				 >
					 <ambientLight intensity={2}/>
					 <directionalLight
							position={[10, 20, 10]}
							intensity={3}
							color="#ffd27f"
							castShadow="true"
					 />
					 <directionalLight
							position={[-10, -20, -10]}
							intensity={3}
							color="#ffd27f"
							castShadow="true"
					 />
					 <TransformControls mode={"rotate"}>
						 <Botella color={waterColor}/>
					 </TransformControls>
					 <Barco color={boatColor}/>
				 </Canvas>
				 <Haiku
						haiku={[haikuLigne1, haikuLigne2, haikuLigne3].filter(
							 (line) => line && line.trim() !== ""
						)}
						boatColor={boatColor}
						waterColor={waterColor}
				 />
				 
				 {/* Mostrar mensaje de carga */}
				 {isLoading && <p>Generando respuesta...</p>}
				 
				 {/* Mostrar mensaje de error */}
				 {error && <p style={{color: "red"}}>Error: {error}</p>}
				 
				 {/* Componente para enviar mensajes */}
				 <ChatPrompt onSend={handleSendMessage}/>
			 </div>
		 </div>
	);
};

export default App;
