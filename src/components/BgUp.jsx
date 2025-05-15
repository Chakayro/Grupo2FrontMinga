import { useLocation } from 'react-router-dom';
import siteData from '../data/data.js';

function BgUp() {
    const location = useLocation();
    const pageId = location.pathname.substring(1) || "home";
    const currentPageData = siteData.pages.find(page => page.id === pageId);



    return (
        <div className="w-full h-2/12">
            <img
                src={currentPageData.photo}
                alt={currentPageData.description || `Fondo para ${pageId}`}
                className="absolute h-8/12 w-full object-cover"
            />
        </div>
    );
}

export default BgUp;
