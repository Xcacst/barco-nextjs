import {useEffect, useRef, useState} from "react";

export default function MusicPlayer({play}) {
	const audioRef = useRef(null);
	const [isPlaying, setIsPlaying] = useState(false);
	
	const visibility = {
		opacity: play ? 1 : 0,
		pointerEvents: play ? "auto" : "none",
		transition: "opacity 0.5s",
	}
	
	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;
		setIsPlaying(true);
		audio.volume = 0.1;
		
		
		play ? audio.play() : audio.pause();
		
		const handlePlay = () => {
			setIsPlaying(true);
		}
		const handlePause = () => setIsPlaying(false);
		
		audio.addEventListener("play", handlePlay);
		audio.addEventListener("pause", handlePause);
		
		return () => {
			audio.removeEventListener("play", handlePlay);
			audio.removeEventListener("pause", handlePause);
		};
	}, [play]);
	
	const handlePlayPause = () => {
		const audio = audioRef.current;
		if (!audio) return;
		if (audio.paused) {
			audio.play();
			audio.volume = 0.1;
			setIsPlaying(true);
		} else {
			audio.pause();
			setIsPlaying(false);
		}
	};
	
	return (
		 <>
			 <div className={"playBtnContainer"} style={{...visibility}}>
				 <audio ref={audioRef} src="/echoesinabottle02.mp3" loop/>
				 <div className={isPlaying ? "playBtn play" : "playBtn pause"} onClick={handlePlayPause}>
					 {Array.from({length: 10}).map((_, i) => (
							<span key={i} style={{}}></span>
					 ))}
				 </div>
				 {/*<div className={"musicLinkContainer"}>
					 <a className={isPlaying ? "musicLink play" : "musicLink pause"}
					    href={"https://www.youtube.com/watch?v=qSNi0kYQH8Q"} target={"_blank"}>The Sixth
						 Station (Spirited Away) -
						 Joe
						 Hisaishi</a>
				 </div>*/}
			 </div>
		 </>
	);
}