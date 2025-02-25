import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

export default function Haiku({ haiku, boatColor }) {
	const haikuRef = useRef([]);
	const tlRef = useRef(null);
	
	useEffect(() => {
		if (!haiku || haiku.length === 0) return;
		
		if (tlRef.current) {
			tlRef.current.kill();
		}
		
		const tl = gsap.timeline({
			defaults: { ease: "power2.out", duration: 0.5 },
		});
		
		haikuRef.current.forEach((p) => {
			if (!p) return;
			const letters = p.querySelectorAll("span");
			tl.fromTo(
				 letters,
				 { opacity: 0, y: 15, x: 10 },
				 { opacity: 1, y: 0, x: 0, stagger: 0.05 },
				 "+=0.1"
			);
		});
		
		tlRef.current = tl;
	}, [haiku]);
	
	return (
		 <div className="haiku" style={{ textAlign: "center" }}>
			 {haiku.map((line, index) => {
				 const letters = line.split("");
				 return (
						<p
							 key={index}
							 ref={(el) => (haikuRef.current[index] = el)} // On stocke chaque <p> dans haikuRef.current[index]
							 style={{
								 color: "white",
								 textShadow: "2px 2px 1px rgba(0,0,0,0.5)",
							 }}
						>
							{letters.map((letter, i) => (
								 <span key={i} style={{ display: "inline-block" }}>
                {letter === " " ? "\u00A0" : letter}
              </span>
							))}
						</p>
				 );
			 })}
		 </div>
	);
}
