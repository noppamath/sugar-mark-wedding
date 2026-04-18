'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Upload, Loader } from 'lucide-react';

interface UploadFormProps {
  onSuccess?: () => void;
}

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

    if (file.size > 10485760) {
      setError('File size must be less than 10MB');
      return;
    }

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
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
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Name (Optional)
        </label>
        <input
          type="text"
          {...register('guestName')}
          placeholder="Share your name with your photo"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Photo
        </label>
        <div className="relative">
          <input
            type="file"
            {...register('photo', { required: 'Photo is required' })}
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            id="photo-input"
          />
          <label
            htmlFor="photo-input"
            className="flex items-center justify-center gap-2 px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-cyan-500 transition"
          >
            <Upload className="w-5 h-5 text-gray-400" />
            <span className="text-gray-600">Click to upload or drag & drop</span>
          </label>
        </div>
        {errors.photo && (
          <p className="text-sm text-red-500 mt-2">{errors.photo.message as string}</p>
        )}
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
          {success}
        </div>
      )}

      <button
        type="submit"
        disabled={uploading}
        className="w-full bg-cyan-500 text-white py-2 rounded-lg hover:bg-cyan-600 transition disabled:bg-gray-400 flex items-center justify-center gap-2"
      >
        {uploading ? (
          <>
            <Loader className="w-4 h-4 animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <Upload className="w-4 h-4" />
            Upload Photo
          </>
        )}
      </button>
    </form>
  );
}
