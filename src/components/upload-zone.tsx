import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileType } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { uploadPDF } from '@/lib/api';
import { useBlogStore } from '@/hooks/use-blogs';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export function UploadZone() {
  const navigate = useNavigate();
  const addBlog = useBlogStore((state) => state.addBlog);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const toastId = toast.loading('Processing PDF...');
    
    try {
      const file = acceptedFiles[0];
      if (!file) return;

      const blog = await uploadPDF(file);
      addBlog(blog);
      
      toast.dismiss(toastId);
      toast.success('PDF converted successfully!');
      navigate(`/article/${blog.id}`);
    } catch (error) {
      toast.dismiss(toastId);
      toast.error('Failed to process PDF. Please try again.');
      console.error('Upload failed:', error);
    }
  }, [addBlog, navigate]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        'glass-card p-12 text-center cursor-pointer transition-all duration-300',
        isDragActive 
          ? 'scale-102 ring-2 ring-primary'
          : 'hover:bg-white/5'
      )}
    >
      <input {...getInputProps()} />
      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <FileType className="w-48 h-48" />
        </div>
        <div className="relative z-10">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
            <Upload className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-2xl font-bold mb-3 text-gradient">Drop your PDF here</h3>
          <p className="text-muted-foreground mb-8">
            or click to select a file
          </p>
          <Button 
            className="bg-primary hover:bg-primary/90 transition-colors"
          >
            Select PDF
          </Button>
        </div>
      </div>
    </div>
  );
}