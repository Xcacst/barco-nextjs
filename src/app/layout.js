import {Geist, Geist_Mono, Poiret_One, Montserrat} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const poiretOne = Poiret_One({
	variable: "--font-poiret-one",
	weight: "400",
	subsets: ["latin"],
});

const montserrat = Montserrat({
	variable: "--font-montserrat",
	weight: "100",
	subsets: ["latin"],
});

export const metadata = {
	title: "Echos dans la bouteille",
	description: "A 3D Generative Art project by Xcaret Castillo Sanchez",
};

export default function RootLayout({children}) {
	return (
		 <html lang="en">
		 <body className={montserrat.variable}>
		 {children}
		 </body>
		 </html>
	);
}
