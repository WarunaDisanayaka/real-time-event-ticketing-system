import React from 'react';
import { Carousel } from 'antd';

const carouselContent = [
    {
        id: 1,
        text: "My Purchased History",
        background: "url('https://via.placeholder.com/1920x500')",
        // description: "Discover amazing features and services tailored for you."
    },
];

const PurchaseHeader = () => {
    const onChange = (currentSlide) => {
        console.log(currentSlide);
    };

    return (
        <Carousel afterChange={onChange} autoplay>
            {carouselContent.map((slide) => (
                <div key={slide.id} style={{ ...contentStyle, backgroundImage: slide.background, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <div style={{ background: 'rgba(18 89 243)', padding: '60px', color: '#fff', height: '100%' }}>
                        <h2 style={{ fontSize: '32px', fontWeight: 'bold' }}>{slide.text}</h2>
                        <p style={{ fontSize: '18px', marginTop: '10px' }}>{slide.description}</p>
                    </div>
                </div>
            ))}
        </Carousel>
    );
};

const contentStyle = {
    margin: 0,
    height: '400px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
};

export default PurchaseHeader;
