import { useForm } from "react-hook-form"
import { login } from '../api'
import { toast } from 'sonner'
import { useNavigate } from "react-router-dom"
import clsx from "clsx"
import { useState } from "react"



export default function LoginPage(){
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)


    const{
        handleSubmit,
        register,
        formState: { errors },
        setError
    } = useForm()

    async function onSubmit(data){
        try{
            const token = await login(data.username, data.password)
            if(token){
                window.localStorage.setItem('token', token)
                toast.success('Bienvenido')
                navigate('/productos')

            } else {
                toast.error('Credenciales invalidas')
                setError('root.credentials', { type: "manual", message: "Credenciales invalidas" })
            }
        } catch(error) {
            toast.error('Error al iniciar sesion')
        }
        
    }

    function handleShowHidePassword(){
        setShowPassword(!showPassword)
    }

    return (
        <main className="flex flex-col gap-4 justify-center items-center w-full h-full min-h-dvh">
            <h1 className="text-4xl font-bold text-center">Login</h1>
            <form onSubmit={(handleSubmit(onSubmit))} className={clsx("border border-white/50 rounded p-5 flex flex-col gap-4 max-w-sm w-full", {
                "border-red-500": errors.root?.credentials
            })}>
                <input className="border border-white/50 rounded p-2 text-black" type="text" placeholder="Nombre de usuario" {...register('username', {
                    required: {value: true, message: "El nombre de usuario es requerido"}
                })}/>
                <input className="border border-white/50 rounded p-2 text-black" type={showPassword ? "text" : "password"} placeholder="Contarsena" {...register('password', {
                    required: {value: true, message: "La contrasena es requerida"}
                })}/>

                <span className="text-xs text-white/50 cursor-pointer hover:text-white" onClick={handleShowHidePassword} >{ showPassword ? ( "🙈 Hide"): ( "🙉 Show")} Password</span>

                <button className="bg-teal-400 p-4 text-black hover:bg-teal-300 rounded">Iniciar Sesion</button>
                {errors.root?.credentials && (<p className="text-center text-red-500">Credenciales invalidas</p>)}
            </form>
        </main>
    )
}