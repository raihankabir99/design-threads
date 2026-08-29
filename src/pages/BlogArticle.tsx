import { useParams, Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { blogPosts } from "@/data/mock";

export default function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <SiteLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">Article not found</p>
            <Link to="/blog" className="text-sm text-gold hover:text-gold-light transition-colors">
              Back to blog
            </Link>
          </div>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      {/* Hero */}
      <div className="relative h-[40vh] lg:h-[50vh] overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      <article className="mx-auto max-w-2xl px-4 sm:px-6 py-10 lg:py-16 -mt-20 relative z-10">
        <Link to="/blog" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="h-3 w-3" />
          Back to Blog
        </Link>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-label text-gold">{post.category}</span>
          <span className="text-muted-foreground/40">·</span>
          <span className="text-xs text-muted-foreground">{post.readTime}</span>
        </div>

        <h1 className="text-display text-2xl lg:text-4xl mb-4">{post.title}</h1>

        <div className="flex items-center gap-3 mb-8 pb-8 border-b border-border/50">
          <div className="w-8 h-8 rounded-full bg-surface flex items-center justify-center text-xs font-medium">
            {post.author.charAt(0)}
          </div>
          <div>
            <p className="text-xs font-medium">{post.author}</p>
            <p className="text-[11px] text-muted-foreground">{post.date}</p>
          </div>
        </div>

        <div className="prose-custom space-y-4 text-sm text-muted-foreground leading-relaxed">
          <p>{post.excerpt}</p>
          <p>
            This is a placeholder for the full article content. In a production environment,
            this would contain rich editorial content with images, pull quotes, and detailed
            storytelling about our brand, designs, and creative process.
          </p>
          <p>
            Our commitment to quality extends beyond the products themselves. Every design
            undergoes a rigorous creative process, from initial concept to final production
            files. We work closely with our manufacturing partners to ensure each product
            meets our exacting standards.
          </p>
          <p>
            Whether it's the weight of our organic cotton, the vibrancy of our archival inks,
            or the precision of our die-cut stickers, every detail matters to us. Because
            when you choose MIDTHREAD, you're choosing more than a product — you're choosing
            a design philosophy.
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-border/50">
          {post.tags.map((tag) => (
            <span key={tag} className="text-[10px] uppercase tracking-wider text-muted-foreground bg-surface px-2.5 py-1 rounded-sm">
              {tag}
            </span>
          ))}
        </div>
      </article>
    </SiteLayout>
  );
}
