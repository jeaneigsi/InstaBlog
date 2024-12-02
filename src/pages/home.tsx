import { UploadZone } from '@/components/upload-zone';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileText, Sparkles } from 'lucide-react';
import { useBlogStore } from '@/hooks/use-blogs';
import { BlogSlider } from '@/components/blog-slider';

export function HomePage() {
  const blogCount = useBlogStore((state) => state.blogs.length);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="hero-gradient absolute inset-0" />
      <div className="relative">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-8">
              <Sparkles className="w-4 h-4 mr-2" />
              <span>Transform PDFs into Beautiful Blog Posts</span>
            </div>
            <h1 className="text-6xl font-bold mb-6 text-gradient leading-tight">
              PDF to Blog Converter
            </h1>
            <p className="text-xl text-muted-foreground mb-12">
              Transform your PDFs into beautifully formatted blog posts with just a few clicks.
              Our AI-powered converter maintains your content's structure while enhancing its presentation.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto mb-16">
            <div className="gradient-border glow">
              <UploadZone />
            </div>
          </div>

          {blogCount > 0 && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gradient">Recent Conversions</h2>
                <Link to="/recent">
                  <Button variant="outline" className="group glass-card">
                    <FileText className="mr-2 h-4 w-4 group-hover:text-primary" />
                    View All ({blogCount})
                  </Button>
                </Link>
              </div>
              <BlogSlider />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}