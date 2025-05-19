import SigUpForm from '../../components/SigUpForm'
import RegisImage from '../../assets/registerpage.png'


const Register = ()=>{

    return (
        <>
        <div className='flex'>
        <SigUpForm/>
        <div className='hidden md:flex w-1/2 h-screen '>
            <img src={RegisImage} alt="Login Image"  className='w-full h-full object-center object-cover'/>
        </div>
        </div>
        </>
    )
}

export default Register