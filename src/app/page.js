"use client"
import { useEffect, useState } from "react";
import TopNavigationBar from "./Components/TopNavigationBar";
import { supabase } from "./supabase/client";
import Button from "./Components/Button";

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
				<div></div>
				<div></div>
				<div>
					<Button contentForButton="Iniciar Sesión" />
					<Button contentForButton="Registrarse" />
				</div>
			</div>
			<div className="flex sm:w-4/10 w-full">
				<img src="" alt="" />
			</div>

		</div>
		</div>
	)
}
