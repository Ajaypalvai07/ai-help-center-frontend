const screenshots = [
  {
    name: 'chat-interface',
    text: 'AI Chat Interface',
    color: '#1e40af'
  },
  {
    name: 'admin-dashboard',
    text: 'Admin Dashboard',
    color: '#4f46e5'
  },
  {
    name: 'analytics',
    text: 'Analytics Dashboard',
    color: '#7c3aed'
  },
  {
    name: 'category-view',
    text: 'Category Selection',
    color: '#9333ea'
  },
  {
    name: 'dark-mode',
    text: 'Dark Mode Interface',
    color: '#6366f1'
  },
  {
    name: 'mobile-responsive',
    text: 'Mobile Responsive',
    color: '#3b82f6'
  }
];

function generateSVG(text: string, color: string): string {
  return `
    <svg width="1200" height="675" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${color}99;stop-opacity:0.6" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)"/>
      <text 
        x="50%" 
        y="50%" 
        font-family="Arial" 
        font-size="48" 
        fill="white" 
        text-anchor="middle" 
        dominant-baseline="middle"
      >
        ${text}
      </text>
    </svg>
  `;
}

function saveSVG(svg: string, filename: string) {
  const fs = require('fs');
  const path = require('path');
  
  const outputPath = path.join(__dirname, '../../public/screenshots', filename);
  fs.writeFileSync(outputPath, svg);
}

// Generate and save all screenshots
screenshots.forEach((screenshot) => {
  const svg = generateSVG(screenshot.text, screenshot.color);
  saveSVG(svg, `${screenshot.name}.svg`);
  console.log(`Generated ${screenshot.name}.svg`);
}); 