'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Upload } from 'lucide-react';
import { Button, Input } from '@/components/ui';

interface UploadFormProps {
  onSuccess?: () => void;
}

const FILE_SIZE_LIMIT = 10485760; // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export default function UploadForm({ onSuccess }: UploadFormProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const onSubmit = async (data: any) => {
    const file = data.photo[0];
    const guestName = data.guestName || 'Anonymous';

    if (!file) {
      setError('Please select a photo');
      return;
    }

    if (file.size > FILE_SIZE_LIMIT) {
      setError('File size must be less than 10MB');
      return;
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Only JPEG, PNG, and WebP images are allowed');
      return;
    }

    setUploading(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData();
      formData.append('photo', file);
      formData.append('guestName', guestName);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Upload failed');
      }

      setSuccess('Photo uploaded successfully!');
      reset();
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto space-y-6"
      aria-label="Upload wedding photo form"
    >
      <Input
        label="Your Name (Optional)"
        type="text"
        {...register('guestName')}
        placeholder="Share your name with your photo"
        helperText="Your name will be displayed with your photo in the gallery"
      />

      <div>
        <label htmlFor="photo-input" className="block text-sm font-semibold text-gray-700 mb-2">
          Select Photo
        </label>
        <p id="photo-requirements" className="text-xs text-gray-500 mb-2">
          Accepted formats: JPEG, PNG, WebP. Maximum file size: 10MB.
        </p>
        <div className="relative">
          <input
            id="photo-input"
            type="file"
            {...register('photo', { required: 'Photo is required' })}
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            aria-describedby="photo-requirements"
          />
          <label
            htmlFor="photo-input"
            className="flex items-center justify-center gap-2 px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 transition focus-within:ring-2 focus-within:ring-primary-500"
          >
            <Upload className="w-5 h-5 text-gray-400" aria-hidden="true" />
            <span className="text-gray-600">Click to upload or drag & drop</span>
          </label>
        </div>
        {errors.photo && (
          <p
            className="text-sm text-red-600 mt-2"
            role="alert"
          >
            {errors.photo.message as string}
          </p>
        )}
      </div>

      {error && (
        <div
          className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
          role="alert"
          aria-live="assertive"
        >
          {error}
        </div>
      )}

      {success && (
        <div
          className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm"
          role="status"
          aria-live="polite"
        >
          {success}
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        size="md"
        isLoading={uploading}
        className="w-full"
        aria-label={uploading ? 'Uploading photo...' : 'Upload photo'}
      >
        <Upload className="w-4 h-4" aria-hidden="true" />
        {uploading ? 'Uploading...' : 'Upload Photo'}
      </Button>
    </form>
  );
}
