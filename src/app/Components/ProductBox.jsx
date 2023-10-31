import { supabase } from "@supabase/auth-ui-shared";
import Button from "./Button";
import { useEffect, useState } from "react";

export default function ProductBox ({ productDescription, productId, productName, productPrice }) {
    const [productInfo, setProductInfo] = useState ();
    const [productPhotoPath, setProductPhotoPath] = useState ();
    async function fetchProductInfo () {
        try {
            const { data, error } = await supabase.from("cai-products").select().eq("product_id", productId);
            setProductInfo(data[0]);
        } catch (err) {
            console.log (err)
        }
    }
    useEffect(() => {
        fetchProductInfo();
    }, [])

    async function fetchProductPhoto () {
        try {
            const { data, error } = await supabase.storage.from("cai-images").getPublicUrl("productPics/" + productInfo.product_photo_path);
            if (error) console.log (error);
            setProductPhotoPath(data.publicUrl);
        } catch (err) {
            console.log (err)
        }
    }
    useEffect(() => {
        if (productInfo) {
            fetchProductPhoto();
        }
    }, [])
    
    if (!productInfo) {
        return null;
    } else if (productInfo) {
        return (
            <div className="flex flex-col px-4 py-2 justify-center items-center bg-white rounded-sm h-fit ">
                <div className="flex w-full h-36">
                    {productPhotoPath && <img src={productPhotoPath} alt="" />}
                </div>
                <div className="flex flex-col w-full h-fit ">
                    <p className="text-center">{productName}</p>
                    <p className="text-center">{productDescription}</p>
                    <p className="text-left">{productPrice}</p>
                </div>
                <div className="flex flex-col w-full justify-center items-center h-fit ">
                    <Button />
                    <Button />
                </div>
            </div>
        )
    }
}