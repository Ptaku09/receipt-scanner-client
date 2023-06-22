import React, { useEffect, useRef } from 'react';
import anime, { AnimeInstance } from 'animejs';

const LoadingScreen = () => {
  const animationRef = useRef<AnimeInstance>();

  useEffect(() => {
    animationRef.current = anime({
      targets: '.box',
      translateY: [
        { value: 0, duration: 500 },
        { value: 100, duration: 800 },
      ],
      rotate: {
        value: '1turn',
      },
      borderRadius: 50,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutQuad',
      delay: () => anime.random(0, 1000),
      elasticity: 200,
    });
  }, []);

  return (
    <div className="w-full h-52 flex items-start justify-center gap-5 [&>*]:w-10 [&>*]:h-10">
      <div className="box bg-pink-500" />
      <div className="box bg-pink-300" />
      <div className="box bg-purple-200" />
      <div className="box bg-violet-500" />
    </div>
  );
};

export default LoadingScreen;
