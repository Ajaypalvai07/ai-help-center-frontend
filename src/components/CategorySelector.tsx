import { useEffect, useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { categories } from '../lib/api';
import type { Category } from '../types';

export default function CategorySelector() {
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCategories = async () => {
    try {
      const response = await categories.getAll();
      const categoriesWithDefaults = response.data.map((cat: Partial<Category>) => ({
        id: cat.id || '',
        name: cat.name || '',
        description: cat.description || '',
        icon: cat.icon || 'help-circle',
        order: cat.order || 0,
        is_active: cat.is_active ?? true
      }));
      setAllCategories(categoriesWithDefaults);
    } catch (err) {
      console.error('Error loading categories:', err);
      setError('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  if (loading) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography>Loading categories...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Select a Category
      </Typography>
      <Box sx={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: 3,
        '& > *': {
          flexBasis: {
            xs: '100%',
            sm: 'calc(50% - 12px)',
            md: 'calc(33.333% - 16px)'
          }
        }
      }}>
        {allCategories.map((category) => (
          <Paper
            key={category.id}
            sx={{
              p: 2,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)'
              }
            }}
          >
            <Typography variant="h6" gutterBottom>
              {category.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {category.description}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}