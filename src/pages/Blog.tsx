import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { blogPosts } from "@/data/mock";

export default function Blog() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="mb-10 lg:mb-14 max-w-2xl">
          <p className="text-label text-gold mb-3">Journal</p>
          <h1 className="text-display text-3xl lg:text-5xl">Blog</h1>
          <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
            Stories about design, quality, and the philosophy behind our products.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {blogPosts.map((post, i) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="group block"
            >
              <div className="aspect-[16/10] rounded-sm overflow-hidden bg-surface mb-4">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-medium tracking-wider uppercase text-gold">{post.category}</span>
                <span className="text-muted-foreground/40">·</span>
                <span className="text-[10px] text-muted-foreground">{post.readTime}</span>
              </div>
              <h3 className="text-base font-medium group-hover:text-gold transition-colors mb-2">
                {post.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                {post.excerpt}
              </p>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground group-hover:text-gold transition-colors mt-3">
                Read More
                <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
