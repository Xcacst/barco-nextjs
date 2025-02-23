import React, {useState} from "react";

export default function Start({onStart, isVisible}) {
	const [isHovered, setIsHovered] = useState(false);
	
	const hoverStyle = isHovered ? {backgroundColor: "rgba(255,255,255,0.8)"} : {};
	
	return (
		 <div className="start-button" style={{
			 width: "150px",
			 height: "150px",
			 lineHeight: "150px",
			 fontSize: " 15px",
			 fontFamily: "Montserrat",
			 borderRadius: "100%",
			 backgroundColor: "rgba(255,255,255, 0.5)",
			 display: "flex",
			 flexDirection: "column",
			 alignItems: "center",
			 position: "absolute",
			 cursor: "pointer",
			 top: "50%",
			 left: "50%",
			 transform: "translate(-50%, -50%)",
			 zIndex: 1000,
			 opacity: isVisible ? 0 : 1,
			 pointerEvents: isVisible ? "none" : "auto",
			 transition: "all 0.2s",
			 ...hoverStyle,
		 }}
		      onClick={onStart} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
			 <span>Enter the bottle</span>
		 </div>
	);
}