import { useBlogStore } from '@/hooks/use-blogs';
import { BlogCard } from '@/components/blog-card';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus, FileText } from 'lucide-react';

export function RecentPage() {
  const blogs = useBlogStore((state) => state.blogs);

  return (
    <div className="min-h-screen relative">
      <div className="hero-gradient absolute inset-0" />
      <div className="relative">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 space-y-4 md:space-y-0">
            <div>
              <h1 className="text-4xl font-bold text-gradient mb-2">
                Recent Conversions
              </h1>
              <p className="text-muted-foreground">
                Your previously converted PDF documents
              </p>
            </div>
            <Link to="/">
              <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                <Plus className="mr-2 h-4 w-4" />
                New Conversion
              </Button>
            </Link>
          </div>
          
          {blogs.length === 0 ? (
            <div className="text-center py-24 glass-card rounded-lg">
              <FileText className="w-16 h-16 mx-auto mb-6 text-muted-foreground" />
              <p className="text-xl text-muted-foreground mb-6">No conversions yet</p>
              <Link to="/">
                <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                  Convert Your First PDF
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}