import { Link } from "react-router-dom"

export default function HomePage() {
    return (
        <main className="w-full min-h-screen grid place-items-center">
            <div className="grid gap-2"> 
                <h1 className="text-4xl font-bold text-center">El Tianguis Libre</h1>
                <p className="text-center">Mas barato que Temu</p>
                <div className="flex flex-col items-center gap-4">
                    <Link to='/login' className="bg-sky-400 rounded w-32 text-center py-2 text-xl cursor-pointer hover:bg-sky-700" >Login</Link>
                    <Link to='/productos' className="bg-sky-400 rounded w-32 text-center py-2 text-xl cursor-pointer hover:bg-sky-700">Productos</Link>
                </div>

            </div>
        </main>
    )
}