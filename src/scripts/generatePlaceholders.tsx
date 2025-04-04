import React from 'react';
import { createRoot } from 'react-dom/client';
import ImagePlaceholder from '../components/ImagePlaceholder';

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

function App() {
  return (
    <div style={{ padding: '20px', display: 'grid', gap: '20px' }}>
      {screenshots.map((screenshot) => (
        <div key={screenshot.name}>
          <h2>{screenshot.name}</h2>
          <ImagePlaceholder
            width={1200}
            height={675}
            text={screenshot.text}
            bgColor={screenshot.color}
          />
        </div>
      ))}
    </div>
  );
}

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
} 