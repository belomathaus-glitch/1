import React, { useRef, useEffect } from 'react';

interface RoletaItem {
  id: number;
  label: string;
  probability: number;
  type: string;
  value: number;
}

interface RoletaWheelProps {
  items: RoletaItem[];
  isSpinning: boolean;
  lastResult: string | null;
  wheelId: string;
}

const RoletaWheel: React.FC<RoletaWheelProps> = ({ items, isSpinning, lastResult, wheelId }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();
  const rotationRef = useRef<number>(0);
  const spinSpeedRef = useRef<number>(0);
  const targetRotationRef = useRef<number | null>(null);
  
  const colors = [
    '#663399', // imperial-purple-600
    '#8a4fbf', // imperial-purple-light
    '#4d2673', // imperial-purple-dark
    '#be185d', // pink-700
    '#db2777', // pink-600
    '#e11d48', // rose-600
    '#dc2626', // red-600
    '#ea580c', // orange-600
    '#d97706', // amber-600
    '#ca8a04', // yellow-600
    '#65a30d', // lime-600
    '#16a34a', // green-600
    '#0d9488', // teal-600
    '#0891b2', // cyan-600
    '#0284c7', // sky-600
    '#2563eb', // blue-600
  ];
  
  const drawWheel = (
    ctx: CanvasRenderingContext2D, 
    width: number, 
    height: number, 
    rotation: number
  ) => {
    ctx.clearRect(0, 0, width, height);
    
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 10;
    
    const segments = items.length;
    const arc = (2 * Math.PI) / segments;
    
    for (let i = 0; i < segments; i++) {
      const angle = rotation + i * arc;
      const color = colors[i % colors.length];
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, angle, angle + arc);
      ctx.closePath();
      
      ctx.fillStyle = color;
      ctx.fill();
      
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#1e1e2a';
      ctx.stroke();
      
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(angle + arc / 2);
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.font = 'bold 14px Arial';
      ctx.fillStyle = '#ffffff';
      
      ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;
      
      const textRadius = radius * 0.75;
      ctx.fillText(items[i].label, textRadius, 0);
      ctx.restore();
    }
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.lineWidth = 8;
    ctx.strokeStyle = 'rgba(102, 51, 153, 0.6)';
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, 20, 0, 2 * Math.PI);
    ctx.fillStyle = '#1e1e2a';
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'rgba(102, 51, 153, 0.8)';
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - radius - 10);
    ctx.lineTo(centerX - 10, centerY - radius + 10);
    ctx.lineTo(centerX + 10, centerY - radius + 10);
    ctx.closePath();
    ctx.fillStyle = '#663399';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'white';
    ctx.stroke();
  };
  
  const animate = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    if (isSpinning) {
      if (spinSpeedRef.current < 0.3) {
        spinSpeedRef.current += 0.01;
      }
    } else {
      if (spinSpeedRef.current > 0) {
        spinSpeedRef.current *= 0.98;
        
        if (spinSpeedRef.current < 0.001) {
          spinSpeedRef.current = 0;
          
          if (targetRotationRef.current !== null) {
            rotationRef.current = targetRotationRef.current;
            targetRotationRef.current = null;
          }
        }
      }
    }
    
    rotationRef.current += spinSpeedRef.current;
    rotationRef.current %= (2 * Math.PI);
    
    drawWheel(ctx, canvas.width, canvas.height, rotationRef.current);
    
    requestRef.current = requestAnimationFrame(animate);
  };
  
  useEffect(() => {
    if (!isSpinning && lastResult) {
      const resultIndex = items.findIndex(item => item.label === lastResult);
      if (resultIndex !== -1) {
        const segments = items.length;
        const arc = (2 * Math.PI) / segments;
        const targetRotation = (2 * Math.PI * 10) - (resultIndex * arc) + (Math.PI / segments);
        targetRotationRef.current = (rotationRef.current + targetRotation) % (2 * Math.PI);
      }
    }
  }, [isSpinning, lastResult, items]);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const handleResize = () => {
      const container = canvas.parentElement;
      if (!container) return;
      
      const size = Math.min(container.clientWidth, 400);
      canvas.width = size;
      canvas.height = size;
      
      if (ctx) {
        drawWheel(ctx, canvas.width, canvas.height, rotationRef.current);
      }
    };
    
    handleResize();
    
    window.addEventListener('resize', handleResize);
    
    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);
  
  return (
    <div className="relative aspect-square w-full max-w-md mx-auto">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full rounded-full shadow-lg"
        data-wheel-id={wheelId}
      />
      <div className="absolute inset-0 rounded-full border-4 border-imperial-purple-700/50 pointer-events-none"></div>
    </div>
  );
};

export default RoletaWheel;