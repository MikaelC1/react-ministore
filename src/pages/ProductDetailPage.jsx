import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getProduct } from "../api"
import { toast } from "sonner"

export default function ProductDetailPage(){

    const navigate = useNavigate()
    const { id } = useParams()
    const [product, setProduct]   = useState({})

    useEffect(() => {
        const token = localStorage.getItem('token')

        if(!token) {
            toast.error('Debes iniciar sesion')
            navigate('/login')
            return
        }

        getProduct(id)
            .then((prod) => {
                setProduct(prod)
            })
            .catch((error) => {
                toast.error('Error al obtener el producto', error)
            })

    }, [id])

    return (
        <main className="w-full min-h-screen grid place-items-center">
            <section className="w-full h-full grid place-items-center">
                <article className="flex flex-col w-96 p-4 bg-white/50 gap-2 rounded-xl">
                    <img src={product.thumbnail} alt={product.title} className="border-b-2 w-full rounded-sm"/>
                    <h1 className="text-2xl">{product.title}</h1>
                    <div className="flex justify-between text-center">
                        <span className="text-xl">${product.price}</span>
                        <p className="text-lg">⭐ <span>{product.rating}</span></p>
                    </div>
                    <div className="">
                        <span className="text-xl">Description:</span>
                        <p className="text-sm">{product.description}</p>
                    </div>
                    
                    <button className="bg-red-400 rounded w-[50%] text-center place-self-center p-2">Compra Ahora</button>
                </article>
            </section>
        </main>
    )
}