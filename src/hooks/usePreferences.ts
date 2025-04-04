import { useState, useEffect } from 'react';

interface UserPreferences {
  theme: string;
  language: string;
  autoRefresh: boolean;
  notifications: boolean;
  category?: string;
}

const defaultPreferences: UserPreferences = {
  theme: 'light',
  language: 'en',
  autoRefresh: false,
  notifications: true
};

export function usePreferences() {
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    const saved = localStorage.getItem('userPreferences');
    return saved ? { ...defaultPreferences, ...JSON.parse(saved) } : defaultPreferences;
  });

  useEffect(() => {
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
  }, [preferences]);

  const updatePreferences = (newPreferences: Partial<UserPreferences>) => {
    setPreferences(prev => ({ ...prev, ...newPreferences }));
  };

  return { preferences, updatePreferences };
}