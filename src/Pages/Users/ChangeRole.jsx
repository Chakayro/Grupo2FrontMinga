import AuthorCompany from '../../components/AuthorCompany'
import AuthorCompanyImage from '../../assets/changerole.png'


const ChangeRol = ()=>{
    return (
        <>
        <div className='flex'> 
        <AuthorCompany/>
        <div className='relative hidden md:flex w-1/2 h-screen  md:justify-center'>
        <div className='absolute top-20 lef-4 text-white w-[60%] text-left '>
        <p className='mb-10  font-bold'> Minga.com is the best place to find manga reviews. We have been super impress by the quality of aplications.</p>
        <span className='font-light'>----- ignacio Borraz</span>
        </div>
            <img src={AuthorCompanyImage} alt="Login Image"  className='w-full h-full object-center object-cover'/>
        </div >
        </div>
        </>
    )
}
export default ChangeRol