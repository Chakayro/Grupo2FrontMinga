import { useLocation } from 'react-router-dom';
import siteData from '../data/data.js';

function BgUp() {
    const location = useLocation();
    const pageId = location.pathname.substring(1) || "home";
    const currentPageData = siteData.pages.find(page => page.id === pageId);



    return (
        <>
            <img
                src={currentPageData.photo}
                alt={currentPageData.description || `Fondo para ${pageId}`}
                className=" h-full w-full object-cover "
            />

           
        </>
    );
}

export default BgUp;
