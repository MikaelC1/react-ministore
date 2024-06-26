import { useEffect, useState } from "react"
import { getProducts } from "../api"
import { toast } from "sonner"
import { Link, useNavigate } from "react-router-dom"

export default function ProductsPage() {
    const [products, setProducts] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')

        if(!token) {
            toast.error('Debes iniciar sesion')
            navigate('/login')
            return
        }

        getProducts()
        .then((prods) => {
            setProducts(prods)
        })
        .catch((error) => {
            toast.error('Error al obtener los productos')
            console.error('[getProducts error]', error)
        })
    }, [])

    return (
        <main className="w-full p-4">
            <h1 className="text-4xl font-semibold text-center p-4">Productos</h1>
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 w-full place-items-center gap-10">
                {
                    products.map((product, index) => {
                        return (
                            <article key={`prod-${index}`} className="bg-white/50 hover:bg-white cursor-pointer overflow-hidden flex flex-col items-center hover:text-black p-4">
                                <img src={product.thumbnail} alt={product.title} />
                                <p>{product.title}</p>
                                <Link to={`/productos/${product.id}`} className="bg-sky-200 hover:bg-sky-400 w-full p-2 rounded text-center">
                                    Ver detalle
                                </Link>
                            </article>
                        )
                    })
                }
            </section>
        </main>
    )
}