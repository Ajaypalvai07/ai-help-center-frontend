import { Card, CardContent, Typography, Chip } from '@mui/material';
import type { Message } from '../types';

interface SolutionCardProps {
  message: Message;
}

export default function SolutionCard({ message }: SolutionCardProps) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {message.content}
        </Typography>
        {message.category && (
          <Chip
            label={message.category}
            color="primary"
            size="small"
            sx={{ mr: 1 }}
          />
        )}
        {message.confidence && (
          <Chip
            label={`Confidence: ${Math.round(message.confidence * 100)}%`}
            color="secondary"
            size="small"
          />
        )}
      </CardContent>
    </Card>
  );
}