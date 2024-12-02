import { format } from 'date-fns';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { BlogPost } from '@/types';

interface BlogCardProps {
  blog: BlogPost;
}

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <Card className="group relative overflow-hidden glass-card border-0">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <CardContent className="p-6 relative">
        <h3 className="text-2xl font-bold mb-3 text-gradient">{blog.title}</h3>
        <time className="text-sm text-muted-foreground block mb-4">
          {format(new Date(blog.createdAt), 'MMMM d, yyyy')}
        </time>
        <div className="text-muted-foreground line-clamp-3 mb-4 group-hover:text-foreground transition-colors">
          {blog.content.replace(/<[^>]*>/g, '')}
        </div>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0">
        <Link to={`/article/${blog.id}`} className="w-full">
          <Button 
            className="w-full group bg-primary hover:bg-primary/90 transition-colors"
          >
            Read More
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}