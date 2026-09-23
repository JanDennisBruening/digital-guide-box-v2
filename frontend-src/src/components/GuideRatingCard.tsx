import React, { useState, useEffect } from 'react';
import { Star, CheckCircle2, Sparkles } from 'lucide-react';
import { getGuideRating, submitGuideRating, subscribeToRatings, GuideRatingData } from '../utils/guideRatings';

interface GuideRatingCardProps {
  guideId: string;
  guideTitle: string;
}

export const GuideRatingCard: React.FC<GuideRatingCardProps> = ({ guideId, guideTitle }) => {
  const [ratingData, setRatingData] = useState<GuideRatingData>(() => getGuideRating(guideId));
  const [hoverStars, setHoverStars] = useState<number | null>(null);
  const [justSubmitted, setJustSubmitted] = useState<boolean>(false);

  useEffect(() => {
    setRatingData(getGuideRating(guideId));
    setJustSubmitted(false);
    return subscribeToRatings(() => {
      setRatingData(getGuideRating(guideId));
    });
  }, [guideId]);

  const handleRate = (stars: number) => {
    const updated = submitGuideRating(guideId, stars);
    setRatingData(updated);
    setJustSubmitted(true);
  };

  const currentDisplayStars = hoverStars ?? ratingData.userRating ?? 0;

  return (
    <div className="guide-rating-card my-6 p-4 sm:p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 shadow-2xs transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: Heading and feedback prompt */}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700 flex-shrink-0">
              <Star className="w-4 h-4 fill-amber-400 text-amber-500" aria-hidden="true" />
            </span>
            <h4 className="text-sm sm:text-base font-bold text-slate-900 m-0">
              War diese Anleitung hilfreich?
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 m-0">
            {ratingData.userRating !== null ? (
              <span className="text-emerald-700 font-medium inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Danke für dein Feedback! Du hast {ratingData.userRating} von 5 Sternen vergeben.
              </span>
            ) : (
              'Deine Bewertung hilft Jan Dennis, diese Anleitung verständlich und aktuell zu halten.'
            )}
          </p>
        </div>

        {/* Right: Interactive 5 Stars & Aggregate */}
        <div className="flex flex-col items-start sm:items-end gap-1.5 flex-shrink-0">
          <div
            className="flex items-center gap-1"
            role="group"
            aria-label={`Bewertung für ${guideTitle}`}
            onMouseLeave={() => setHoverStars(null)}
          >
            {[1, 2, 3, 4, 5].map((starIndex) => {
              const isFilled = starIndex <= currentDisplayStars;
              const isUserRated = ratingData.userRating !== null && starIndex <= ratingData.userRating;

              return (
                <button
                  key={starIndex}
                  type="button"
                  onClick={() => handleRate(starIndex)}
                  onMouseEnter={() => setHoverStars(starIndex)}
                  className="p-1 rounded-md hover:bg-amber-100/60 transition-transform active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400"
                  aria-label={`${starIndex} von 5 Sternen bewerten`}
                  title={`${starIndex} Stern${starIndex > 1 ? 'e' : ''} vergeben`}
                >
                  <Star
                    className={`w-6 h-6 transition-colors ${
                      isFilled
                        ? 'fill-amber-400 text-amber-500 drop-shadow-xs'
                        : 'fill-transparent text-slate-300 hover:text-amber-300'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-500">
            <span className="font-bold text-slate-800">★ {ratingData.score.toFixed(1)}</span>
            <span>von 5</span>
            <span className="text-slate-300">·</span>
            <span>{ratingData.count} {ratingData.count === 1 ? 'Bewertung' : 'Bewertungen'}</span>
          </div>

          {ratingData.userRating !== null && (
            <div className="text-[11px] text-amber-800/85 font-medium -mt-0.5">
              (Deine Stimme gezählt)
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
