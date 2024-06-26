import { Link } from "react-router-dom"

export default function HomePage() {
    return (
        <div>
            <h1 className="text-4xl font-bold text-center">Home Page</h1>
            <p className="text-center">This is the home page</p>
            <div>
                <Link to='/login'>Login</Link>
                <Link to='/productos'>Productos</Link>
                <Link to='/producto/123'>Producto123</Link>
            </div>
        </div>
    )
}