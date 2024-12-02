export function parseHTMLContent(content: string): string {
  // Replace newlines with proper paragraph tags
  const withParagraphs = content
    .split('\n\n')
    .map(para => para.trim())
    .filter(para => para)
    .map(para => `<p>${para}</p>`)
    .join('');

  // Convert markdown-style headers to HTML
  const withHeaders = withParagraphs.replace(
    /^(={2,})\s*(.*?)\s*=*$/gm,
    (_, level, text) => {
      const headerLevel = Math.min(level.length, 6);
      return `<h${headerLevel}>${text}</h${headerLevel}>`;
    }
  );

  return withHeaders;
}