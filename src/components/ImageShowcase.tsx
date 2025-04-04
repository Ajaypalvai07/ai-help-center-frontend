import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const images = [
  {
    url: '/screenshots/chatinterfacescreenshot.png',
    alt: 'AI Chat Interface',
    title: 'Smart Chat Interface'
  },
  {
    url: '/screenshots/admin-dashboardscreeenshot.png',
    alt: 'Admin Dashboard',
    title: 'Powerful Admin Dashboard'
  },
  {
    url: '/screenshots/categoriesscreenshot.png',
    alt: 'Category Selection',
    title: 'Organized Categories'
  },
  {
    url: '/screenshots/analyticsdashboardscreenshot.png',
    alt: 'Analytics Dashboard',
    title: 'Real-time Analytics'
  },
  {
    url: '/screenshots/dark-mode.svg',
    alt: 'Dark Mode Interface',
    title: 'Beautiful Dark Mode'
  },
  {
    url: '/screenshots/mobile-responsive.svg',
    alt: 'Mobile Responsive Design',
    title: 'Fully Responsive'
  }
];

export default function ImageShowcase() {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageSet, setCurrentImageSet] = useState(0);

  // Auto-scroll effect
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentImageSet((prev) => (prev + 1) % (images.length - 2));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  return (
    <div className="w-full overflow-hidden py-12">
      <div 
        className="relative max-w-[1200px] mx-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl" />
        
        {/* Images Container */}
        <motion.div
          className="flex gap-6 px-4"
          animate={{
            x: `-${currentImageSet * 33.33}%`
          }}
          transition={{
            duration: 0.7,
            ease: "easeInOut"
          }}
        >
          {images.map((image, index) => (
            <motion.div
              key={image.url}
              className="relative flex-shrink-0 w-[600px] rounded-xl overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Image */}
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-gray-800/50 backdrop-blur-sm">
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Image Title */}
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white text-lg font-semibold">{image.title}</h3>
                </div>
              </div>
              
              {/* Glass Effect Border */}
              <div className="absolute inset-0 rounded-xl border border-white/10 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: images.length - 2 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageSet(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentImageSet === index
                  ? 'bg-blue-500 w-4'
                  : 'bg-gray-400/50 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 