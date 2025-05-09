import SigInForm from '../../components/SigInForm'
import LoginImage from '../../assets/loginPage.png'


const Login = ()=>{

    return (
        <>
        <div className='flex'> 
        <div className='hidden md:flex w-1/2 h-screen'>
            <img src={LoginImage} alt="Login Image"  className='w-full h-full object-center object-cover'/>
        </div >
      
            <SigInForm/>
      

        </div>
        </>
    )
}

export default Login