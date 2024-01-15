"use client"
import { useEffect, useState } from "react";
import TopNavigationBar from "./Components/TopNavigationBar";
import { supabase } from "./supabase/client";
import Button from "./Components/Button";
import Image from "./Components/Image";

export default function Home() {

	let homePhotoNumber;
	const [homePhoto, setHomePhoto] = useState();
  	async function fetchHomePhotos () {
    	try {
      		const { data, error } = await supabase.storage.from("cai-images").getPublicUrl("homePhotos/cai-home-img-1.jpg");
      		if (error) console.log(error);
			setHomePhoto(data.publicUrl);
    	} catch (err) {
      		console.log(err);
    	}
  	}
  	useEffect(() => {
    	fetchHomePhotos()
  	}, [])

	console.log(homePhoto)
	return (
		<div className="flex flex-col justify-center w-full mt-20">
		<TopNavigationBar />

		


		<div className="flex w-full h-96">
			{homePhoto && <img className="w-full object-cover" src={homePhoto} alt="home-photo" />}
		</div>

		<div className="flex sm:flex-row flex-col w-full bg-white px-6 py-9">
			<div className="flex flex-col sm:w-6/10 w-full">
				<div className="font-amatic font-bold text-sign-in-or-sign-up-title-desktop">Cursos de repostería</div>
				<div></div>
				<div>
					<Button additionalClassNamesForButton=" bg-var-3 hover:bg-var-3-hovered duration-200 cursor-pointer text-white text-button-desktop rounded-md font-amatic mr-5 " contentForButton="Iniciar Sesión" />
					<Button additionalClassNamesForButton=" bg-var-2 hover:bg-var-2-hovered duration-200 cursor-pointer text-white text-button-desktop rounded-md font-amatic " contentForButton="Registrarse" />
				</div>
			</div>
			<div className="flex sm:w-4/10 w-full p-4">
				<img className="w-full mx-auto object-cover" src="" alt="" />
			</div>

		</div>


		<div className="flex sm:flex-row flex-col w-full bg-var-4">
			
			<div className="flex sm:w-4/10 w-full">
				<img className="w-full mx-auto object-cover h-72" src="https://scontent.fntr5-1.fna.fbcdn.net/v/t39.30808-6/385872138_706349364849248_1363954291548222754_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=3635dc&_nc_eui2=AeGSJ76EEgn0QI_H248vPkzzRCbmkLFax5lEJuaQsVrHmZXVcyWHWQ0LcUoetBof3lA&_nc_ohc=RHAlsn_V58MAX_3jZm_&_nc_oc=AQkO7RBlGhf0ARH1ZiRNDQDfzQ-R80RGhqCg7EyKMWPfPmx392a07EiDoEAucBBuhu03--EJWUJ5wMVSCBvzQo8E&_nc_ht=scontent.fntr5-1.fna&oh=00_AfCnmUVNplXlVCILP3hFDsGU_6uLdJkH8UHTN7jWm_zofw&oe=65AA8F3B" alt="" />
			</div>

			<div className="flex flex-col sm:w-6/10 w-full px-6 py-9">
				<div className="font-amatic font-bold text-sign-in-or-sign-up-title-desktop">Hacer un pedido</div>
				<div></div>
			</div>

		</div>

		</div>
	)
}
