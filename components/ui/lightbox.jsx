// components/Lightbox.js
import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import Image from 'next/image';

const images = [
  '/ass/logo.png',
  '/ass/logo.png',
  // Add more images as needed
];

const LightboxComponent = ({image}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  return (
    <div>
      <div className="gallery">
        {images.map((src, index) => (
          <div key={index} onClick={() => { setPhotoIndex(index); setIsOpen(true); }}>
            <img src={src} alt={`Photo ${index + 1}`} width={300} height={200} />
          </div>
        ))}
      </div>

      {isOpen && (
        <Lightbox
          mainSrc={image}
          nextSrc={image}
          onCloseRequest={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default LightboxComponent;
