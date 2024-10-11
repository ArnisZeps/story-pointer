import { useRef, useEffect } from "react";

const useCanvas = () => {
  const particlesOnScreen = 200;
  const ref = useRef(null);
  let particleArray: any = [];
  const createParticles = () => {
    for (let i = 0; i < particlesOnScreen; i++) {
    const size = Math.floor(Math.random() * 27);
    const symbols = [1, 2, 3, 5, 8, 13]
      particleArray.push({
        x: Math.floor(Math.random() * window.innerWidth),
        y: Math.floor(Math.random() * window.innerHeight),
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        red: Math.floor(Math.random() * 255),
        green: Math.floor(Math.random() * 255),
        blue: Math.floor(Math.random() * 255),
        size,
        maxSize: 55,
        alpha: 1
      });
    }
  };

  const resizeParticles = () => {
    for (let i = 0; i < particlesOnScreen; i++) {
      particleArray[i].size += 0.2
      particleArray[i].alpha -= 0.01
      if(particleArray[i].size >= particleArray[i].maxSize){
        const size = Math.floor(Math.random() * 27);
        particleArray[i].alpha = 1;
        particleArray[i].size = size;
        particleArray[i].maxSize = 55;
        particleArray[i].x = Math.floor(Math.random() * window.innerWidth);
        particleArray[i].y = Math.floor(Math.random() * window.innerHeight);
      }
    }
  }

  const draw = (context: any, count: any) => {
    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight;
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    for (const particle of particleArray) {
      context.font = `${particle.size}px Barlow`;
      context.fillStyle = `rgba( ${particle.red},  ${particle.green},  ${particle.blue}, ${particle.alpha})`;
      context.fillText(particle.symbol, particle.x, particle.y);
    }
  };

  useEffect(() => {
    createParticles();
    const canvas = ref.current as unknown as HTMLCanvasElement;
    const context = canvas?.getContext("2d");
    let count = 0;
    let animationId: any;

    const renderer = () => {
      count++;
      draw(context, count);
      resizeParticles()
      animationId = window.requestAnimationFrame(renderer);
    };
    renderer();
    return () => {
      window.cancelAnimationFrame(animationId);
    };
  }, []);

  return ref;
};

export default useCanvas;
