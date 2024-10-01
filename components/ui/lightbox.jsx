import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';


export default function Lightboxcomponent({open,onclose,slides}){
    return (
        <Lightbox
            showImageThumbnails={true}
            showImageCount={true}
            isOpen={open}
            onClose={onclose}
            images={slides}
            backdropClosesModal={true}
        />
    )
 
}