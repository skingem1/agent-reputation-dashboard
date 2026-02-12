import { Review } from "@/lib/data/types";
import { timeAgo } from "@/lib/utils";
import { Star, BadgeCheck } from "lucide-react";

interface ReviewListProps {
  reviews: Review[];
}

export function ReviewList({ reviews }: ReviewListProps) {
  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 rounded-lg border p-4">
        <div className="text-3xl font-bold">{avgRating.toFixed(1)}</div>
        <div>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.round(avgRating)
                    ? "fill-yellow-500 text-yellow-500"
                    : "text-muted-foreground/30"
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            {reviews.length} review{reviews.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {reviews.map((review) => (
          <div key={review.id} className="rounded-lg border p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={review.authorAvatar}
                  alt={review.author}
                  className="h-6 w-6 rounded-full bg-muted"
                  width={24}
                  height={24}
                />
                <span className="text-sm font-medium">{review.author}</span>
                {review.isVerified && (
                  <BadgeCheck className="h-3.5 w-3.5 text-blue-500" />
                )}
              </div>
              <span className="text-xs text-muted-foreground">
                {timeAgo(review.timestamp)}
              </span>
            </div>
            <div className="mt-2 flex items-center gap-0.5">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < review.rating
                      ? "fill-yellow-500 text-yellow-500"
                      : "text-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {review.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
