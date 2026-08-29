import { useParams, Link } from "react-router";
import { ArrowLeft, ArrowRight, Clock, User, Share2 } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { blogPosts, designs, formatPrice } from "@/data/mock";
import { cn } from "@/lib/utils";

export default function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <SiteLayout>
        <div className="min-h-[60vh] flex items-center justify-center px-4">
          <div className="text-center">
            <p className="font-display text-xl font-medium mb-2">Article not found</p>
            <p className="text-sm text-muted-foreground mb-6">The story you're looking for doesn't exist.</p>
            <Link to="/blog" className="text-sm font-medium text-foreground hover:text-gold transition-colors underline underline-offset-2">
              Back to Journal
            </Link>
          </div>
        </div>
      </SiteLayout>
    );
  }

  const relatedPosts = blogPosts.filter((p) => p.id !== post.id && (p.category === post.category || p.tags.some((t) => post.tags.includes(t)))).slice(0, 3);
  const relatedDesigns = designs.slice(0, 4);

  // Mock full article content paragraphs
  const contentParagraphs = [
    post.excerpt,
    "Every great design starts with a moment of inspiration — a sketch on a napkin, a pattern spotted on a Berlin street, the way light falls through a window in a Copenhagen café. At FAYANITY, we believe that these moments of visual clarity deserve to be worn, shared, and lived in.",
    "Our design process is intentionally unhurried. We don't chase trends or seasonal cycles. Instead, we create pieces that feel timeless from the moment they're conceived — artwork that translates naturally from screen to fabric, from concept to garment.",
    "The relationship between a design and the product it lives on is something we take seriously. A graphic that works beautifully on a t-shirt might need rethinking for a hoodie. A pattern that sings on a tote bag might feel different on a mug. Each translation is a new creative challenge.",
  ];

  const pullQuote = "When you choose FAYANITY, you're choosing more than a garment — you're choosing a design philosophy.";

  return (
    <SiteLayout>
      {/* Hero Image */}
      <div className="relative h-[35vh] lg:h-[50vh] overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      <article className="mx-auto max-w-2xl px-4 sm:px-6 py-10 lg:py-16 -mt-16 relative z-10">
        {/* Back link */}
        <Link to="/blog" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="h-3 w-3" /> Back to Journal
        </Link>

        {/* Article Header */}
        <header className="mb-10 pb-8 border-b border-border/50">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] font-semibold tracking-wider uppercase text-gold">{post.category}</span>
            <span className="text-muted-foreground/40">·</span>
            <span className="text-[10px] text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
          </div>

          <h1 className="font-display text-3xl lg:text-5xl font-medium tracking-tight leading-[1.15] mb-4">
            {post.title}
          </h1>

          <p className="text-base lg:text-lg text-muted-foreground leading-relaxed mb-6">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-surface flex items-center justify-center text-xs font-medium">
                {post.author.charAt(0)}
              </div>
              <div>
                <p className="text-xs font-medium">{post.author}</p>
                <p className="text-[11px] text-muted-foreground">{new Date(post.date).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}</p>
              </div>
            </div>
            <button className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors" aria-label="Share">
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </header>

        {/* Article Content */}
        <div className="prose-custom space-y-6 text-[15px] text-muted-foreground leading-[1.8]">
          {contentParagraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}

          {/* Pull Quote */}
          <blockquote className="my-10 py-8 border-l-2 border-gold pl-6 lg:pl-8">
            <p className="font-display text-xl lg:text-2xl font-medium text-foreground leading-relaxed italic">
              "{pullQuote}"
            </p>
          </blockquote>

          {/* Inline Image */}
          <div className="my-10 -mx-4 sm:mx-0">
            <div className="aspect-[16/9] rounded-sm overflow-hidden bg-surface">
              <img src={designs[0]?.heroImage || post.image} alt="" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <p className="text-[11px] text-muted-foreground/60 mt-2 text-center italic">Original FAYANITY design artwork</p>
          </div>


        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-border/50">
          {post.tags.map((tag) => (
            <span key={tag} className="text-[10px] uppercase tracking-wider text-muted-foreground bg-surface px-3 py-1.5 rounded-sm">
              {tag}
            </span>
          ))}
        </div>
      </article>

      {/* Shop the Story */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-16 lg:py-20 border-t border-border/50">
        <p className="text-[11px] uppercase tracking-[0.2em] text-gold mb-2 text-center">Shop the Story</p>
        <h2 className="font-display text-xl lg:text-2xl font-medium tracking-tight mb-8 text-center">Wear the Inspiration</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-4xl mx-auto">
          {relatedDesigns.map((d) => (
            <Link key={d.id} to={`/designs/${d.slug}`} className="group block">
              <div className="aspect-[3/4] rounded-sm overflow-hidden bg-surface mb-3">
                <img src={d.heroImage} alt={d.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
              </div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">{d.products.length} products</p>
              <h3 className="text-sm font-medium group-hover:text-gold transition-colors">{d.name}</h3>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/designs" className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-gold transition-colors">
            Shop All Designs <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-16 lg:py-20 border-t border-border/50">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gold mb-2 text-center">Keep Reading</p>
          <h2 className="font-display text-xl lg:text-2xl font-medium tracking-tight mb-8 text-center">You May Also Like</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {relatedPosts.map((rp) => (
              <Link key={rp.id} to={`/blog/${rp.slug}`} className="group block">
                <div className="aspect-[16/10] rounded-sm overflow-hidden bg-surface mb-4">
                  <img src={rp.image} alt={rp.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-semibold tracking-wider uppercase text-gold">{rp.category}</span>
                  <span className="text-[10px] text-muted-foreground">{rp.readTime}</span>
                </div>
                <h3 className="text-sm font-medium group-hover:text-gold transition-colors leading-snug">{rp.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Newsletter */}
      <div className="border-t border-border/50">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="max-w-xl mx-auto text-center">
            <p className="text-[11px] uppercase tracking-[0.2em] text-gold mb-3">Stay in the Loop</p>
            <h2 className="font-display text-2xl font-medium tracking-tight mb-3">Join the Journal</h2>
            <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
              New designs, stories, and selected inspiration — delivered occasionally.
            </p>
            <form className="flex gap-2 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Your email address" className="flex-1 h-11 px-4 bg-surface border border-border rounded-sm text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground/40 transition-colors" />
              <button type="submit" className="h-11 px-6 bg-foreground text-background text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-foreground/90 transition-colors shrink-0 min-h-[44px]">Join</button>
            </form>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
