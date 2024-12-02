import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBlogStore } from '@/hooks/use-blogs';
import { format } from 'date-fns';
import { parseHTMLContent } from '@/lib/html-parser';

export function ArticlePage() {
  const { id } = useParams<{ id: string }>();
  const blog = useBlogStore((state) => state.getBlog(id!));

  if (!blog) {
    return (
      <div className="min-h-screen relative flex items-center justify-center">
        <div className="hero-gradient absolute inset-0" />
        <div className="relative text-center">
          <h1 className="text-3xl font-bold mb-6 text-gradient">Article not found</h1>
          <Link to="/">
            <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const parsedContent = parseHTMLContent(blog.content);

  return (
    <div className="min-h-screen relative">
      <div className="hero-gradient absolute inset-0" />
      <div className="relative">
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-12">
            <Link to="/recent" className="text-muted-foreground hover:text-primary transition-colors">
              <Button variant="ghost" className="group">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to Recent
              </Button>
            </Link>
            <Button variant="outline" className="glass-card">
              <Share2 className="mr-2 h-4 w-4" />
              Share Article
            </Button>
          </div>
          <article className="prose prose-invert prose-lg max-w-4xl mx-auto glass-card p-8 rounded-lg">
            <h1 className="text-4xl font-bold mb-4 text-gradient !mt-0">
              {blog.title}
            </h1>
            <time className="text-sm text-muted-foreground block mb-8">
              {format(new Date(blog.createdAt), 'MMMM d, yyyy')}
            </time>
            <div 
              className="text-foreground/90"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          </article>
        </div>
      </div>
    </div>
  );
}