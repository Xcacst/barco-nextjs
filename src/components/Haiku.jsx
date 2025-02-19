import {useEffect, useRef} from "react";
import {gsap} from "gsap";
import {TextPlugin} from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

export default function Haiku(props) {
	const haikuRef = useRef([]);
	
	useEffect(() => {
		if (!props.haiku || props.haiku.length === 0) return;
		
		const tl = gsap.timeline({
			defaults: {ease: "power2.out", duration: 0.5},
		});
		
		props.haiku.forEach((text, index) => {
			const p = haikuRef.current[index];
			const letters = text.split("");
			p.innerHTML = "";
			letters.forEach((letter) => {
				const span = document.createElement("span");
				span.textContent = letter === " " ? "\u00A0" : letter;
				span.style.display = "inline-block";
				p.appendChild(span);
			});
			
			tl.fromTo(
				 p.querySelectorAll("span"),
				 {opacity: 0, y: 15, x: 10},
				 {opacity: 1, y: 0, x: 0, stagger: 0.05},
				 `+=0.1`
			);
		});
	}, [props.haiku]);
	
	return (
		 <div className={"haiku"}>
			 {
				 props.haiku.map((line, index) => (
						<p
							 key={index}
							 ref={(el) => (haikuRef.current[index] = el)}
							 data-text={line}
							 style={{color: "white", textShadow: `2px 2px 1px rgba(0,0,0,0.5)`}}
						></p>
				 ))
			 }
		 </div>
	);
}
