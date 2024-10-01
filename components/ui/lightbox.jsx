import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';


export default function Lightboxcomponent({open,onClose,src}){
    return (
        <Lightbox
        open={open}
        close={onClose}
        slides={[{ src: src }]} // Wrap the single image in an array
        thumbnails={true}
        showSlideCount={true} // Hide slide count since there's only one image
        />
    )
 
}