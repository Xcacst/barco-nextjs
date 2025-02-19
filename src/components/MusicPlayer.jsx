import {useRef, useState} from "react";

export default function MusicPlayer() {
	const audioRef = useRef(null);
	const [isPlaying, setIsPlaying] = useState(false);
	
	const handlePlayPause = () => {
		const audio = audioRef.current;
		if (!audio) return;
		if (audio.paused) {
			audio.play();
			setIsPlaying(true);
		} else {
			audio.pause();
			setIsPlaying(false);
		}
	};
	
	return (
		 <>
			 <div className={"playBtnContainer"}>
				 <audio ref={audioRef} src="/The Sixth Station (Spirited Away).mp3"/>
				 <div className={isPlaying ? "playBtn play" : "playBtn pause"} onClick={handlePlayPause}>
					 {Array.from({length: 10}).map((_, i) => (
							<span key={i} style={{}}></span>
					 ))}
				 </div>
				 <div className={"musicLinkContainer"}>
					 <a className={isPlaying ? "musicLink play" : "musicLink pause"} href={"https://www.youtube.com/watch?v=qSNi0kYQH8Q"} target={"_blank"}>The Sixth
						 Station (Spirited Away) -
						 Joe
						 Hisaishi</a>
				 </div>
			 </div>
		 </>
	);
}