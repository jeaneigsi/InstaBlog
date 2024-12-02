import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useBlogStore } from '@/hooks/use-blogs';
import { Link } from 'react-router-dom';

export function BlogSlider() {
  const blogs = useBlogStore((state) => state.blogs);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (blogs.length > 1) {
        setCurrentIndex((current) => (current + 1) % blogs.length);
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [blogs.length]);

  if (blogs.length === 0) {
    return null;
  }

  const nextSlide = () => {
    setCurrentIndex((current) => (current + 1) % blogs.length);
  };

  const prevSlide = () => {
    setCurrentIndex((current) => (current - 1 + blogs.length) % blogs.length);
  };

  return (
    <div className="relative w-full overflow-hidden rounded-lg">
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {blogs.map((blog) => (
          <Card
            key={blog.id}
            className="w-full flex-shrink-0 bg-gradient-to-br from-primary/5 to-primary/10"
          >
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">{blog.title}</h2>
              <p className="text-muted-foreground line-clamp-3 mb-4">
                {blog.content}
              </p>
              <Link to={`/article/${blog.id}`}>
                <Button>Read More</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      {blogs.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2"
            onClick={nextSlide}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  );
}