import CreateAuthor from '../../components/AuthorForm'
import RegisImage from '../../assets/registerpage.png'


const Author = ()=>{

    return (
        <>
        <div className='flex'>
        <CreateAuthor/>
        <div className='hidden md:flex w-1/2 h-screen '>
            <img src={RegisImage} alt="Login Image"  className='w-full h-full object-center object-cover'/>
        </div>
        </div>
        </>
    )
}

export default Author