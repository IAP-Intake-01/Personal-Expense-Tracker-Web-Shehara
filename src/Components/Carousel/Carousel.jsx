import React, { useEffect, useState } from 'react';
import Box from '@mui/joy/Box';
import AspectRatio from '@mui/joy/AspectRatio';
import './carousel.css';

const images = [
  "https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800",
  "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDR8fGJhcm5hc2xlfGVufDB8fHx8MTYyNjg1NTAyNw&ixlib=rb-1.2.1&q=80&w=800",
  "https://unsplash.com/photos/happy-young-man-smiling-and-feeling-excited-while-using-virtual-reality-glasses-and-a-remote-controller-to-play-a-video-game-S0DC2T-2PZ8",
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
