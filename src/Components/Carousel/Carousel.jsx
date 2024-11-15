import React, { useEffect, useState } from 'react';
import Box from '@mui/joy/Box';
import AspectRatio from '@mui/joy/AspectRatio';
import './carousel.css';
import image1 from '../../assets/c.jpg'
import image2 from '../../assets/c1.jpg'


const images = [
  image1,image2
  
];

export default function MinMaxRatio() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <AspectRatio minHeight="100vh" maxHeight="100vh">
        <img
          src={images[currentImageIndex]}
          alt={`Carousel image ${currentImageIndex + 1}`}
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        />
      </AspectRatio>
    </Box>
  );
}
