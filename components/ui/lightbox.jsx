import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';


export default function Lightboxcomponent({open,close,src}){

    return (
        <Lightbox
        open={open}
        close={close}
        slides={[{ src: src }]} // Wrap the single image in an array
        thumbnails={true}
        showSlideCount={false} // Hide slide count since there's only one image
        />
    )
 
}