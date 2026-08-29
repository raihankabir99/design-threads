import { useState } from "react";
import { Link } from "react-router";
import { ArrowRight, ArrowUpRight, Search, Clock } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { blogPosts, designs } from "@/data/mock";
import { cn } from "@/lib/utils";

const categories = ["All", "Design", "Style", "Product Guide", "Care Guide", "Gift Guide", "Brand"];

const giftGuides = [
  { title: "For Him", desc: "Bold designs, premium comfort.", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=400&fit=crop", slug: "him" },
  { title: "For Her", desc: "Artistic expression, everyday wear.", image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&h=400&fit=crop", slug: "her" },
  { title: "For Design Lovers", desc: "Original artwork, thoughtfully crafted.", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=400&fit=crop", slug: "design-lovers" },
  { title: "For Minimalists", desc: "Clean, quiet, intentional design.", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop", slug: "minimalists" },
];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch = !searchQuery || post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts[0];
  const trendingPosts = blogPosts.slice(1, 6);
  const designStories = blogPosts.filter((p) => p.category === "Design");
  const productGuides = blogPosts.filter((p) => p.category === "Product Guide" || p.category === "Care Guide");
  const latestPosts = filteredPosts.slice(activeCategory === "All" ? 0 : 0);

  return (
    <SiteLayout>
      {/* Hero */}
      <div className="relative bg-background border-b border-border/50">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-[11px] uppercase tracking-[0.2em] text-gold mb-4">Journal</p>
            <h1 className="font-display text-4xl lg:text-6xl font-medium tracking-tight leading-[1.1] mb-4">
              Stories, ideas<br className="hidden sm:block" /> and inspiration.
            </h1>
            <p className="text-base lg:text-lg text-muted-foreground max-w-xl leading-relaxed">
              Design philosophy, styling guides, and the stories behind the artwork that defines FAYANITY.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Featured Article */}
        <Link to={`/blog/${featuredPost.slug}`} className="group block mb-16 lg:mb-24">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
            <div className="aspect-[16/10] lg:aspect-[4/3] rounded-sm overflow-hidden bg-surface">
              <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-semibold tracking-wider uppercase text-gold">{featuredPost.category}</span>
                <span className="text-muted-foreground/40">·</span>
                <span className="text-[10px] text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" /> {featuredPost.readTime}</span>
              </div>
              <h2 className="font-display text-2xl lg:text-4xl font-medium tracking-tight mb-4 group-hover:text-gold transition-colors leading-tight">
                {featuredPost.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-lg">
                {featuredPost.excerpt}
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground group-hover:text-gold transition-colors">
                Read Story <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </Link>

        {/* Category Navigation + Search */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 lg:mb-14">
          <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1 -mx-1 px-1 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 py-2 text-xs font-medium rounded-sm border transition-all whitespace-nowrap min-h-[36px]",
                  activeCategory === cat
                    ? "bg-foreground text-background border-foreground"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stories..."
              className="w-full h-9 pl-9 pr-3 bg-surface border border-border rounded-sm text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground/40 transition-colors"
            />
          </div>
        </div>

        {/* Trending Now */}
        <div className="mb-16 lg:mb-24">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gold mb-2">Trending Now</p>
          <h2 className="font-display text-xl lg:text-2xl font-medium tracking-tight mb-8">Most Read</h2>
          <div className="space-y-0 divide-y divide-border/50">
            {trendingPosts.map((post, i) => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="group flex items-center gap-4 sm:gap-6 py-5 hover:bg-surface/30 transition-colors px-2 -mx-2 rounded-sm">
                <span className="font-display text-2xl lg:text-3xl font-light text-muted-foreground/30 w-8 shrink-0 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-semibold tracking-wider uppercase text-gold">{post.category}</span>
                    <span className="text-[10px] text-muted-foreground">{post.readTime}</span>
                  </div>
                  <h3 className="text-sm font-medium group-hover:text-gold transition-colors truncate">{post.title}</h3>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
              </Link>
            ))}
          </div>
        </div>

        {/* Latest Stories Grid */}
        <div className="mb-16 lg:mb-24">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gold mb-2">Latest</p>
          <h2 className="font-display text-xl lg:text-2xl font-medium tracking-tight mb-8">Stories</h2>
          {latestPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-sm text-muted-foreground mb-2">No stories found.</p>
              <button onClick={() => { setActiveCategory("All"); setSearchQuery(""); }} className="text-xs text-gold hover:text-gold/80 transition-colors underline underline-offset-2">
                Show all stories
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {latestPosts.map((post) => (
                <Link key={post.id} to={`/blog/${post.slug}`} className="group block">
                  <div className="aspect-[16/10] rounded-sm overflow-hidden bg-surface mb-4">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-semibold tracking-wider uppercase text-gold">{post.category}</span>
                    <span className="text-muted-foreground/40">·</span>
                    <span className="text-[10px] text-muted-foreground">{post.readTime}</span>
                  </div>
                  <h3 className="text-base font-medium group-hover:text-gold transition-colors mb-2 leading-snug">{post.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{post.excerpt}</p>
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground group-hover:text-gold transition-colors mt-3">
                    Read More <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Design Stories */}
        {designStories.length > 0 && (
          <div className="mb-16 lg:mb-24">
            <p className="text-[11px] uppercase tracking-[0.2em] text-gold mb-2">Creativity</p>
            <h2 className="font-display text-xl lg:text-2xl font-medium tracking-tight mb-8">Design Stories</h2>
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
              {designStories.slice(0, 2).map((post) => (
                <Link key={post.id} to={`/blog/${post.slug}`} className="group block">
                  <div className="aspect-[16/9] rounded-sm overflow-hidden bg-surface mb-4">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-semibold tracking-wider uppercase text-gold">{post.category}</span>
                    <span className="text-[10px] text-muted-foreground">{post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-medium group-hover:text-gold transition-colors mb-2">{post.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{post.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Product Guides */}
        {productGuides.length > 0 && (
          <div className="mb-16 lg:mb-24">
            <p className="text-[11px] uppercase tracking-[0.2em] text-gold mb-2">Essentials</p>
            <h2 className="font-display text-xl lg:text-2xl font-medium tracking-tight mb-8">Product Guides</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {productGuides.map((post) => (
                <Link key={post.id} to={`/blog/${post.slug}`} className="group flex gap-4 p-4 border border-border/50 rounded-sm hover:bg-surface/30 transition-colors">
                  <div className="w-16 h-20 rounded-sm bg-surface overflow-hidden shrink-0">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-semibold tracking-wider uppercase text-gold">{post.category}</span>
                    <h3 className="text-sm font-medium group-hover:text-gold transition-colors mt-1 line-clamp-2 leading-snug">{post.title}</h3>
                    <span className="text-[10px] text-muted-foreground mt-1 block">{post.readTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Gift Guide */}
        <div className="mb-16 lg:mb-24">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gold mb-2">Seasonal</p>
          <h2 className="font-display text-xl lg:text-2xl font-medium tracking-tight mb-8">Gift Guide</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {giftGuides.map((guide) => (
              <Link key={guide.slug} to={`/blog?category=Gift+Guide`} className="group block">
                <div className="aspect-[4/5] rounded-sm overflow-hidden bg-surface mb-3 relative">
                  <img src={guide.image} alt={guide.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-base font-medium text-white mb-0.5">{guide.title}</h3>
                    <p className="text-[11px] text-white/70">{guide.desc}</p>
                  </div>
                </div>
                <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors flex items-center gap-1">
                  Explore Gifts <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-border/50 pt-16 lg:pt-24">
          <div className="max-w-xl mx-auto text-center">
            <p className="text-[11px] uppercase tracking-[0.2em] text-gold mb-3">Stay in the Loop</p>
            <h2 className="font-display text-2xl lg:text-3xl font-medium tracking-tight mb-3">Join the Journal</h2>
            <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
              New designs, stories, and selected inspiration — delivered occasionally.
            </p>
            <form className="flex gap-2 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 h-11 px-4 bg-surface border border-border rounded-sm text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground/40 transition-colors"
              />
              <button type="submit" className="h-11 px-6 bg-foreground text-background text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-foreground/90 transition-colors shrink-0 min-h-[44px]">
                Join
              </button>
            </form>
            <p className="text-[10px] text-muted-foreground/50 mt-4">
              By subscribing, you agree to receive updates from FAYANITY.
            </p>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
