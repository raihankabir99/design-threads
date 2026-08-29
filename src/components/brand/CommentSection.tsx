import { useState } from "react";
import { MessageCircle, Send, User } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

interface Comment {
  id: string;
  author: string;
  text: string;
  date: string;
}

const mockComments: Comment[] = [
  {
    id: "c1",
    author: "Alex M.",
    text: "This design is incredible. The level of detail is next level — already ordered it on a hoodie.",
    date: "2 days ago",
  },
  {
    id: "c2",
    author: "Jordan K.",
    text: "Perfect for a tee. The dark tones work beautifully on the black cotton.",
    date: "5 days ago",
  },
  {
    id: "c3",
    author: "Sam R.",
    text: "Just received mine. The print quality is outstanding. Really premium feel.",
    date: "1 week ago",
  },
];

interface CommentSectionProps {
  designName: string;
}

export function CommentSection({ designName }: CommentSectionProps) {
  const { isAuthenticated } = useAuth();
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: `c${Date.now()}`,
      author: "You",
      text: newComment.trim(),
      date: "Just now",
    };

    setComments([comment, ...comments]);
    setNewComment("");
  };

  return (
    <div className="border-t border-border/50 pt-10 lg:pt-14">
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle className="h-4 w-4 text-muted-foreground" />
        <h3 className="font-display text-lg font-medium tracking-tight">
          Messages
        </h3>
        <span className="text-xs text-muted-foreground">({comments.length})</span>
      </div>

      {/* Comment form */}
      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-full bg-surface flex items-center justify-center shrink-0">
              <User className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={`Share your thoughts on ${designName}...`}
                className="w-full h-20 px-3 py-2 bg-surface border border-border rounded-sm text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 transition-colors resize-none"
              />
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  disabled={!newComment.trim()}
                  className="inline-flex items-center gap-1.5 h-9 px-4 bg-foreground text-background text-xs font-medium tracking-wide rounded-sm hover:bg-foreground/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Send className="h-3 w-3" />
                  Post
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="mb-8 p-4 bg-surface rounded-sm border border-border/50 text-center">
          <p className="text-xs text-muted-foreground">
            <a href="/auth" className="text-gold hover:text-gold-light transition-colors font-medium">
              Sign in
            </a>{" "}
            to leave a message or comment.
          </p>
        </div>
      )}

      {/* Comments list */}
      <div className="space-y-5">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-surface flex items-center justify-center shrink-0">
              <span className="text-[10px] font-medium text-muted-foreground">
                {comment.author.charAt(0)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium">{comment.author}</span>
                <span className="text-[10px] text-muted-foreground">·</span>
                <span className="text-[10px] text-muted-foreground">{comment.date}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {comment.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
