'use client';

import {useState} from "react";
import {Canvas} from "@react-three/fiber";
import {PresentationControls} from "@react-three/drei";
import {Botella, Barco} from "@/components/BarcoyBotella.jsx";
import ChatPrompt from "@/components/ChatPrompt.jsx";
import Haiku from "@/components/Haiku.jsx";
import MusicPlayer from "@/components/MusicPlayer.jsx";
import Start from "@/components/Start.jsx";

const App = () => {
	const [isStarted, setIsStarted] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [boatColor, setBoatColor] = useState();
	const [backgroundColor1, setBackgroundColor1] =
		 useState("rgb(148, 163, 184)");
	const [backgroundColor2, setBackgroundColor2] = useState("#fffce0");
	const [waterColor, setWaterColor] = useState();
	const [haiku, setHaiku] = useState([]);
	/*const [haikuLigne1, setHaikuLigne1] = useState();
	const [haikuLigne2, setHaikuLigne2] = useState();
	const [haikuLigne3, setHaikuLigne3] = useState();*/
	
	const handleStart = () => {
		setIsStarted(true);
	}
	
	const handleSendMessage = async (message) => {
		setIsLoading(true);
		setError(null);
		
		try {
			const response = await fetch("/api/gemini", {
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
			if (haiku_ligne_1 && haiku_ligne_2 && haiku_ligne_3) setHaiku([haiku_ligne_1, haiku_ligne_2, haiku_ligne_3]);
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
			 <Start onStart={handleStart} isVisible={isStarted}/>
			 <MusicPlayer play={isStarted}/>
			 <div className="container">
				 <Canvas
						camera={{position: [25, 5, -5], fov: 9}}
						gl={{localClippingEnabled: true}}
						className={"canvas"}
						style={{left: isStarted ? "10%" : "0%", top: isStarted ? "10%" : "0%", transition: "all 1s"}}
				 >
					 <ambientLight intensity={2}/>
					 <directionalLight
							position={[10, 20, 10]}
							intensity={3}
							color={boatColor}
							castShadow="true"
					 />
					 <directionalLight
							position={[-10, -20, -10]}
							intensity={3}
							color={waterColor}
							castShadow="true"
					 />
					 <PresentationControls snap={true} global={true} speed={0.5}>
						 <Botella color={waterColor}/>
					 </PresentationControls>
					 <Barco color={boatColor} isVisible={isStarted}/>
				 </Canvas>
				 <Haiku
						haiku={haiku}
				 />
				 
				 {/* Componente para enviar mensajes */}
				 <ChatPrompt onSend={handleSendMessage} isStarted={isStarted}/>
			 </div>
		 </div>
	);
};

export default App;
