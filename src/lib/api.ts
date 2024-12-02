import { toast } from 'sonner';
import type { BlogPost } from '@/types';

const WEBHOOK_URL = 'https://9f6c-102-180-161-183.ngrok-free.app/webhook/';

export async function uploadPDF(file: File): Promise<BlogPost> {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to process PDF');
    }

    const data = await response.json();
    
    return {
      id: crypto.randomUUID(),
      title: data.title,
      content: data.content,
      createdAt: new Date().toISOString(),
    };
  } catch (error) {
    toast.error('Failed to process PDF. Please try again.');
    throw error;
  }
}