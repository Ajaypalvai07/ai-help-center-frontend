import { useState, useRef } from 'react';
import { Mic, MicOff, Image } from 'lucide-react';
import { multimedia } from '../lib/api';

interface MultimediaInputProps {
  onUploadComplete: (url: string, type: 'image' | 'audio') => void;
  onError: (error: string) => void;
}

export default function MultimediaInput({ onUploadComplete, onError }: MultimediaInputProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          setAudioChunks(chunks => [...chunks, e.data]);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        handleVoiceUpload(audioBlob);
        setAudioChunks([]);
      };

      setMediaRecorder(recorder);
      recorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Failed to start recording:', error);
      onError('Failed to start recording. Please check your microphone permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      setIsRecording(false);
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
    }
  };

  const handleVoiceUpload = async (blob: Blob) => {
    try {
      const formData = new FormData();
      formData.append('file', blob, 'voice.wav');
      
      const response = await multimedia.uploadVoice(formData);
      if (response.data?.url) {
        onUploadComplete(response.data.url, 'audio');
      } else {
        throw new Error('No URL in response');
      }
    } catch (error) {
      console.error('Failed to process voice input:', error);
      onError('Failed to process voice input.');
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await multimedia.uploadImage(formData);
      if (response.data?.url) {
        onUploadComplete(response.data.url, 'image');
      } else {
        throw new Error('No URL in response');
      }
    } catch (error) {
      console.error('Failed to upload image:', error);
      onError('Failed to upload image.');
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`p-2 rounded-full transition-colors ${
          isRecording ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
      </button>

      <button
        onClick={() => fileInputRef.current?.click()}
        className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
      >
        <Image className="h-5 w-5" />
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  );
} 