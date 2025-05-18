import CreateCompany from '../../components/Company'
import RegisImage from '../../assets/registerpage.png'


const Company = ()=>{

    return (
        <>
        <div className='flex'>
        <CreateCompany/>
        <div className='hidden md:flex w-1/2 h-screen '>
            <img src={RegisImage} alt="Login Image"  className='w-full h-full object-center object-cover'/>
        </div>
        </div>
        </>
    )
}

export default Company