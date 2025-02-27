'use client'
import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Carousel = ({
    data,
}: {
    data: {
        image: string,
        product_name: string
    }[]
}) => {
    const [currentImg, setCurrentImg] = useState(0);
    const [fade, setFade] = useState(true);
    const [isClient, setIsClient] = useState(false); // Fix hydration issue

    useEffect(() => {
        setIsClient(true); // Ensures rendering happens only on the client
    }, []);

    useEffect(() => {
        if (!isClient) return;

        const interval = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setCurrentImg((prev) => (prev + 1) % data.length);
                setFade(true);
            }, 500); // Small delay before switching images
        }, 3000);

        return () => clearInterval(interval);
    }, [data.length, isClient, currentImg]);

    if (!isClient) return null; // Prevents hydration mismatch

    return (
        <div>
            {/* Image Slider */}
            <div className="relative flex aspect-[1/1] xl:w-[500px] lg:w-[320px] mt-[-44vh] overflow-hidden rounded-md xl:top-[-45px] md:top-[50px]">
                <div className="absolute flex w-full h-full transition-all duration-300">
                    {data.map((v, i) => (
                        <div 
                            key={i} 
                            className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${i === currentImg ? 'opacity-100' : 'opacity-0'}`}
                        >
                            <Image
                                className="pointer-events-none"
                                alt={`carousel-image-${i}`}
                                fill
                                src={v.image || '/images/Interactive_main/slide1.png'}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation & Text */}
            <div className="flex justify-between w-full lg:mt-[70px] xl:mt-[0px]">
                <button
                    disabled={currentImg === 0}
                    onClick={() => setCurrentImg((prev) => prev - 1)}
                    className={`px-4 py-2 font-normal flex items-center justify-center ${currentImg === 0 && 'opacity-50'}`}
                >
                    <ArrowBackIosNewIcon />
                    <Typography className="font-semibold" variant="h3" color="#283C28" sx={{
                        fontWeight: 400,
                        alignContent: 'flex-start',
                        fontFamily: 'var(--font-montserrat)',
                        fontSize: '15px'
                    }}>
                        P R E V
                    </Typography>
                </button>
                
                {/* Product Name */}
                <Box>
                    <Typography
                        className={`font-semibold transition-opacity duration-700 ease-in-out ${fade ? 'opacity-100' : 'opacity-0'}`}
                        variant="h3"
                        color="#283C28"
                        sx={{
                            fontWeight: 400,
                            alignContent: 'flex-start',
                            fontFamily: 'Chronicle Display',
                            fontSize: { xs: "10px", sm: "15px", md: "25px", lg: "40px" },
                        }}
                    >
                        {data[currentImg]?.product_name || 'Default Name'}
                    </Typography>
                </Box>

                <button
                    disabled={currentImg === data.length - 1}
                    onClick={() => setCurrentImg((prev) => prev + 1)}
                    className={`px-4 py-2 font-normal flex items-center justify-center ${currentImg === data.length - 1 && 'opacity-50'}`}
                >
                    <Typography className="font-semibold" variant="h3" color="#283C28" sx={{
                        fontWeight: 400,
                        alignContent: 'flex-start',
                        fontFamily: 'var(--font-montserrat)',
                        fontSize: '15px'
                    }}>
                        N E X T
                    </Typography>
                    <ArrowForwardIosIcon />
                </button>
            </div>
        </div>
    )
}

export default Carousel;
