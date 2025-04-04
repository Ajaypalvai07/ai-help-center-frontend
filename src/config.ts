export const config = {
  mongoUri: import.meta.env.VITE_MONGODB_URI || 'mongodb://localhost:27017',
  dbName: import.meta.env.VITE_DB_NAME || 'ai_help_center',
  jwtSecret: import.meta.env.VITE_JWT_SECRET || 'your-secret-key',
  jwtExpiresIn: '24h',
  apiUrl: (import.meta.env.VITE_API_URL || 'http://localhost:8000') + '/api/v1',
  huggingFaceApiKey: import.meta.env.VITE_HUGGINGFACE_API_KEY,
  huggingFaceModel: import.meta.env.VITE_HUGGINGFACE_MODEL || 'google/flan-t5-base',
  sentryDsn: import.meta.env.VITE_SENTRY_DSN,
  appName: import.meta.env.VITE_APP_NAME || 'AI Help Center',
  appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',
  appEnv: import.meta.env.MODE,
};

export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Debug environment variables in development only
if (import.meta.env.DEV) {
  console.log('Environment Variables Status:');
  console.log('----------------------------');
  console.log('MongoDB URI:', import.meta.env.VITE_MONGODB_URI ? '✓ Set' : '✗ Not set');
  console.log('Database Name:', import.meta.env.VITE_DB_NAME ? '✓ Set' : '✗ Not set');
  console.log('JWT Secret:', import.meta.env.VITE_JWT_SECRET ? '✓ Set' : '✗ Not set');
  console.log('API URL:', config.apiUrl ? '✓ Set' : '✗ Not set');
  console.log('Hugging Face API Key:', config.huggingFaceApiKey ? '✓ Set' : '✗ Not set');
  console.log('Hugging Face Model:', config.huggingFaceModel);
  console.log('Environment:', config.appEnv);
  console.log('----------------------------');
}