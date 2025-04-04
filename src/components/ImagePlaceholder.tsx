import { useEffect, useRef } from 'react';
import { generatePlaceholderCanvas } from '../scripts/generatePlaceholders';

interface ImagePlaceholderProps {
  width: number;
  height: number;
  pattern?: string;
  className?: string;
}

export default function ImagePlaceholder({ width, height, pattern = 'dots', className = '' }: ImagePlaceholderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      generatePlaceholderCanvas(canvasRef.current, { width, height, pattern });
    }
  }, [width, height, pattern]);

  return <canvas ref={canvasRef} width={width} height={height} className={className} />;
} 