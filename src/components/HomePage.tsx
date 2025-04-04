import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  MessageSquare,
  Shield,
  Zap,
  ArrowRight,
  Heart,
  Brain,
  Clock,
  Github,
  Linkedin,
  Mail
} from 'lucide-react';
import Aurora from './ui/Aurora';

export default function HomePage() {
  const navigate = useNavigate();

  const projects = [
    {
      title: "AI Help Center",
      description: "An intelligent assistant powered by advanced AI, built from scratch by me.",
      tech: ["React", "TypeScript", "FastAPI", "MongoDB"],
      link: "https://github.com/Ajaypalvai07/ai-help-center"
    },
    {
      title: "Personal Portfolio",
      description: "My personal portfolio showcasing my projects and skills.",
      tech: ["React", "Next.js", "Tailwind CSS"],
      link: "https://ajaypalvai.vercel.app"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <Aurora />
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <MessageSquare className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                AI Help Center
              </span>
            </div>
            
            <div className="hidden sm:flex sm:items-center sm:space-x-4">
              <button
                onClick={() => navigate('/auth/login')}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/auth/signup')}
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative pt-16 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-20">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400"
            >
              Welcome to AI Help Center
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-3 max-w-md mx-auto text-base text-gray-600 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
            >
              A personal project built from scratch by Ajay Palvai. Not a template or copied code.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-6 overflow-hidden"
            >
              <div className="relative flex space-x-4 animate-marquee">
                <span className="text-blue-600 dark:text-blue-400">React</span>
                <span className="text-indigo-600 dark:text-indigo-400">TypeScript</span>
                <span className="text-purple-600 dark:text-purple-400">FastAPI</span>
                <span className="text-blue-600 dark:text-blue-400">MongoDB</span>
                <span className="text-indigo-600 dark:text-indigo-400">Tailwind CSS</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8 flex justify-center space-x-6"
            >
              <a
                href="https://github.com/Ajaypalvai07"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/ajay-palvai-384750210/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="mailto:palvaiajay4730@gmail.com"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
              >
                <Mail className="h-6 w-6" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          My Projects
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 transform transition-all duration-300 group-hover:scale-[1.02]">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 blur"></div>
                <div className="relative h-full bg-white dark:bg-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    View Project <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Features
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: <MessageSquare className="h-6 w-6" />,
              title: 'Smart Chat Interface',
              description: 'Engage with our AI assistant through a modern, intuitive chat interface.'
            },
            {
              icon: <Brain className="h-6 w-6" />,
              title: 'AI-Powered Solutions',
              description: 'Get intelligent responses and solutions powered by advanced AI.'
            },
            {
              icon: <Clock className="h-6 w-6" />,
              title: 'Quick Response Time',
              description: 'Experience fast and efficient problem resolution.'
            },
            {
              icon: <Shield className="h-6 w-6" />,
              title: 'Secure Platform',
              description: 'Your data is protected with enterprise-grade security.'
            },
            {
              icon: <Zap className="h-6 w-6" />,
              title: 'Real-time Updates',
              description: 'Get instant responses and live updates for your queries.'
            },
            {
              icon: <Heart className="h-6 w-6" />,
              title: 'User-Friendly',
              description: 'Intuitive interface designed for the best user experience.'
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 transform transition-all duration-300 group-hover:scale-[1.02]">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 blur"></div>
                <div className="relative h-full bg-white dark:bg-gray-800 rounded-xl p-6">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                    <div className="text-blue-600 dark:text-blue-400">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 