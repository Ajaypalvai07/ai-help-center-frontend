import { createCanvas, CanvasRenderingContext2D as NodeCanvasContext } from 'canvas';
import { writeFileSync } from 'fs';
import { join } from 'path';

const WIDTH = 800;
const HEIGHT = 600;

type BrowserCanvasContext = CanvasRenderingContext2D;
type CanvasContext = BrowserCanvasContext | NodeCanvasContext;

interface PlaceholderConfig {
  title: string;
  primaryColor: string;
  secondaryColor: string;
  pattern: 'circles' | 'grid' | 'waves' | 'dots' | 'neural' | 'hexagons';
}

const configs: PlaceholderConfig[] = [
  {
    title: 'AI Chat Interface',
    primaryColor: '#4F46E5',
    secondaryColor: '#818CF8',
    pattern: 'circles'
  },
  {
    title: 'Smart Analytics',
    primaryColor: '#10B981',
    secondaryColor: '#34D399',
    pattern: 'grid'
  },
  {
    title: 'Neural Networks',
    primaryColor: '#F59E0B',
    secondaryColor: '#FBBF24',
    pattern: 'neural'
  },
  {
    title: 'Data Processing',
    primaryColor: '#EC4899',
    secondaryColor: '#F472B6',
    pattern: 'dots'
  },
  {
    title: 'Machine Learning',
    primaryColor: '#8B5CF6',
    secondaryColor: '#A78BFA',
    pattern: 'waves'
  },
  {
    title: 'AI Integration',
    primaryColor: '#3B82F6',
    secondaryColor: '#60A5FA',
    pattern: 'hexagons'
  }
];

function drawPattern(ctx: CanvasContext, pattern: string, color: string) {
  switch (pattern) {
    case 'circles':
      for (let i = 0; i < 10; i++) {
        const x = Math.random() * WIDTH;
        const y = Math.random() * HEIGHT;
        const radius = Math.random() * 50 + 20;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = color + '40'; // 25% opacity
        ctx.fill();
      }
      break;

    case 'grid':
      const gridSize = 40;
      for (let x = 0; x < WIDTH; x += gridSize) {
        for (let y = 0; y < HEIGHT; y += gridSize) {
          ctx.strokeStyle = color + '40';
          ctx.strokeRect(x, y, gridSize, gridSize);
        }
      }
      break;

    case 'waves':
      ctx.beginPath();
      for (let x = 0; x < WIDTH; x += 10) {
        const y = HEIGHT / 2 + Math.sin(x * 0.02) * 100;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();
      break;

    case 'dots':
      for (let i = 0; i < 200; i++) {
        const x = Math.random() * WIDTH;
        const y = Math.random() * HEIGHT;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = color + '80';
        ctx.fill();
      }
      break;

    case 'neural':
      const nodes: [number, number][] = [];
      for (let i = 0; i < 20; i++) {
        nodes.push([Math.random() * WIDTH, Math.random() * HEIGHT]);
      }
      
      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const distance = Math.hypot(nodes[j][0] - nodes[i][0], nodes[j][1] - nodes[i][1]);
          if (distance < 200) {
            ctx.beginPath();
            ctx.moveTo(nodes[i][0], nodes[i][1]);
            ctx.lineTo(nodes[j][0], nodes[j][1]);
            ctx.strokeStyle = color + '40';
            ctx.stroke();
          }
        }
      }
      
      // Draw nodes
      nodes.forEach(([x, y]) => {
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      });
      break;

    case 'hexagons':
      const size = 40;
      const h = size * Math.sqrt(3);
      for (let row = 0; row < HEIGHT / h; row++) {
        for (let col = 0; col < WIDTH / (size * 1.5); col++) {
          const x = col * size * 1.5;
          const y = row * h + (col % 2) * h/2;
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = i * Math.PI / 3;
            const px = x + size * Math.cos(angle);
            const py = y + size * Math.sin(angle);
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.strokeStyle = color + '40';
          ctx.stroke();
        }
      }
      break;
  }
}

function generatePlaceholder(config: PlaceholderConfig, index: number) {
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext('2d') as NodeCanvasContext;

  // Create gradient background
  const gradient = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
  gradient.addColorStop(0, config.primaryColor + '20');   // 12% opacity
  gradient.addColorStop(1, config.secondaryColor + '20'); // 12% opacity
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Draw pattern
  drawPattern(ctx, config.pattern, config.primaryColor);

  // Add title
  ctx.font = 'bold 40px Arial';
  ctx.fillStyle = config.primaryColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(config.title, WIDTH/2, HEIGHT/2);

  // Save the image
  const buffer = canvas.toBuffer('image/png');
  writeFileSync(join(__dirname, '../../public/showcase', `showcase-${index + 1}.png`), buffer);
}

// Generate all placeholders
configs.forEach((config, index) => {
  generatePlaceholder(config, index);
  console.log(`Generated showcase-${index + 1}.png`);
});

export function generatePlaceholderCanvas(canvas: HTMLCanvasElement, config: { width: number; height: number; pattern: string }) {
  const ctx = canvas.getContext('2d') as BrowserCanvasContext;
  if (!ctx) return;

  // Clear canvas
  ctx.clearRect(0, 0, config.width, config.height);

  // Set background
  ctx.fillStyle = '#f3f4f6';
  ctx.fillRect(0, 0, config.width, config.height);

  // Draw pattern based on type
  switch (config.pattern) {
    case 'dots':
      drawDots(ctx, config.width, config.height);
      break;
    case 'lines':
      drawLines(ctx, config.width, config.height);
      break;
    default:
      drawDots(ctx, config.width, config.height);
  }
}

function drawDots(ctx: CanvasContext, width: number, height: number) {
  ctx.fillStyle = '#e5e7eb';
  const spacing = 20;
  
  for (let x = spacing; x < width; x += spacing) {
    for (let y = spacing; y < height; y += spacing) {
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function drawLines(ctx: CanvasContext, width: number, height: number) {
  ctx.strokeStyle = '#e5e7eb';
  ctx.lineWidth = 1;
  const spacing = 15;

  for (let x = spacing; x < width; x += spacing) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  for (let y = spacing; y < height; y += spacing) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
} 