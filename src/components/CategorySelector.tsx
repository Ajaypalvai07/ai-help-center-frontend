import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { categories } from '../lib/api';
import { useAppStore } from '../store/useStore';
import type { Category } from '../types';
import { MessageSquare, Code, Box, User, Loader2 } from 'lucide-react';
import { Button, Typography } from '@mui/material';

const categoryIcons: Record<string, React.ReactNode> = {
  'General': <MessageSquare className="w-6 h-6" />,
  'Technical': <Code className="w-6 h-6" />,
  'Product': <Box className="w-6 h-6" />,
  'Account': <User className="w-6 h-6" />
};

const categoryColors: Record<string, { bg: string, hover: string, text: string }> = {
  'General': { 
    bg: 'bg-gradient-to-br from-blue-500 to-blue-600',
    hover: 'hover:from-blue-600 hover:to-blue-700',
    text: 'text-blue-100'
  },
  'Technical': { 
    bg: 'bg-gradient-to-br from-purple-500 to-purple-600',
    hover: 'hover:from-purple-600 hover:to-purple-700',
    text: 'text-purple-100'
  },
  'Product': { 
    bg: 'bg-gradient-to-br from-green-500 to-green-600',
    hover: 'hover:from-green-600 hover:to-green-700',
    text: 'text-green-100'
  },
  'Account': { 
    bg: 'bg-gradient-to-br from-orange-500 to-orange-600',
    hover: 'hover:from-orange-600 hover:to-orange-700',
    text: 'text-orange-100'
  }
};

export default function CategorySelector() {
  const [categoriesList, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useAppStore();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await categories.getAll();
      setCategories(response.data);
    } catch (err) {
      setError('Failed to load categories');
      console.error('Error loading categories:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-8 bg-red-50 rounded-lg">
        <p className="font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome, {user?.name || 'Guest'}
        </h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Select a category to start chatting with our AI assistant
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
        {categoriesList.map((category) => {
          const colorScheme = categoryColors[category.name] || categoryColors['General'];
          const icon = categoryIcons[category.name];

          return (
            <Button
              key={category.id}
              variant="outlined"
              onClick={() => navigate(`/chat/${category.id}`)}
              sx={{ p: 2, height: '100%', textAlign: 'left', ...colorScheme }}
            >
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  {category.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {category.description}
                </Typography>
              </Box>
            </Button>
          );
        })}
      </div>
    </div>
  );
}