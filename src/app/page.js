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

	  const [caiLogo, setCaiLogo] = useState();
	  async function fetchLogo () {
		  try {
			  const { data, error } = await supabase.storage.from("cai-images").getPublicUrl("generalPics/cai bakery logo with shadows.png");
			  if (error) console.log (error);
			  setCaiLogo(data.publicUrl);
		  } catch (err) {
			  console.log (err);
		  }
	  }
	  useEffect(() => {
		  fetchLogo();
	  }, [])

	  console.log(caiLogo)

	console.log(homePhoto)
	return (
		<div className="flex flex-col justify-center w-full mt-20 bg">
		<TopNavigationBar />

		


		<div className="flex w-full h-64 relative">
			{homePhoto && <img className="w-full object-cover" src={homePhoto} alt="home-photo" />}
			<div className="absolute flex w-full mx-auto justify-center items-center">
				{caiLogo && <img className="sm:w-3/10 mt-14" src={caiLogo} alt="cai-logo" />}
			</div>
			
		</div>

		<div className="flex sm:flex-row flex-col w-full bg-white px-6 py-9 shadow-lg">
			<div className="flex flex-col sm:w-6/10 w-full pr-6">
				<div className="font-amatic font-bold text-page-title-desktop -mt-4">Cursos de repostería</div>
				<div className="mb-5 mt-2 w-full">Breve explicación sobre los cursos de repostería aquí.</div>
				<div>
					<Button additionalClassNamesForButton=" px-7 shadow-md bg-var-3 hover:bg-var-3-hovered duration-200 cursor-pointer text-white text-button-desktop rounded-md font-amatic font-bold mr-5 " contentForButton="Iniciar Sesión" />
					<Button additionalClassNamesForButton=" px-7 shadow-md bg-var-2 hover:bg-var-2-hovered duration-200 cursor-pointer text-white text-button-desktop rounded-md font-amatic font-bold " contentForButton="Registrarse" />
				</div>
			</div>
			<div className="flex sm:w-4/10 w-full">
				<img className="w-full mx-auto object-cover" src="" alt="" />
			</div>

		</div>


		<div className="flex sm:flex-row flex-col w-full bg-var-4 shadow-lg mb-10 z-">
			
			<div className="flex sm:w-4/10 w-full">
				<img className="w-full mx-auto object-cover h-72" src="https://scontent.fntr5-1.fna.fbcdn.net/v/t39.30808-6/385872138_706349364849248_1363954291548222754_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=3635dc&_nc_eui2=AeGSJ76EEgn0QI_H248vPkzzRCbmkLFax5lEJuaQsVrHmZXVcyWHWQ0LcUoetBof3lA&_nc_ohc=RHAlsn_V58MAX_3jZm_&_nc_oc=AQkO7RBlGhf0ARH1ZiRNDQDfzQ-R80RGhqCg7EyKMWPfPmx392a07EiDoEAucBBuhu03--EJWUJ5wMVSCBvzQo8E&_nc_ht=scontent.fntr5-1.fna&oh=00_AfCnmUVNplXlVCILP3hFDsGU_6uLdJkH8UHTN7jWm_zofw&oe=65AA8F3B" alt="" />
			</div>

			<div className="flex flex-col sm:w-6/10 w-full px-6 py-9">
				<div className="font-amatic font-bold text-page-title-desktop -mt-4">Hacer un pedido</div>
				<div className="mb-5 mt-2 w-full">Breve explicación sobre los pedidos.</div>
				<div>
					<Button additionalClassNamesForButton=" px-7 shadow-md bg-var-2 hover:bg-var-2-hovered duration-200 cursor-pointer text-white text-button-desktop rounded-md font-amatic font-bold mr-5 " contentForButton="Ver productos" />
				</div>
			</div>

		</div>

		</div>
	)
}
