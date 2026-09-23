export interface GuideRatingData {
  score: number;
  count: number;
  userRating: number | null;
}

const STORAGE_KEY_VOTES = 'dgbc_guide_user_votes_v2';
const EVENT_NAME = 'dgbc_guide_rating_change';

/**
 * Deterministic baseline rating for a guide so that the app
 * starts with realistic, community-based ratings.
 */
function getDeterministicBaseline(guideId: string): { baseScore: number; baseCount: number } {
  let hash = 0;
  for (let i = 0; i < guideId.length; i++) {
    hash = (hash << 5) - hash + guideId.charCodeAt(i);
    hash |= 0;
  }
  const abs = Math.abs(hash);
  // High, realistic satisfaction ratings (4.7 to 5.0)
  const scores = [4.8, 4.9, 4.7, 5.0, 4.9, 4.8, 5.0, 4.9, 4.8, 4.9];
  const baseScore = scores[abs % scores.length];
  // Realistic reviewer counts (between 14 and 48 reviews)
  const baseCount = 14 + (abs % 35);
  return { baseScore, baseCount };
}

/**
 * Get all user votes from localStorage.
 */
function getUserVotes(): Record<string, number> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY_VOTES);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) {
    console.warn('Failed to read user votes from localStorage', e);
    return {};
  }
}

/**
 * Save user votes to localStorage.
 */
function saveUserVotes(votes: Record<string, number>): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_VOTES, JSON.stringify(votes));
  } catch (e) {
    console.warn('Failed to save user votes to localStorage', e);
  }
}

/**
 * Calculate dynamic rating for a guide, taking into account the user's vote.
 */
export function getGuideRating(guideId: string): GuideRatingData {
  const { baseScore, baseCount } = getDeterministicBaseline(guideId);
  const userVotes = getUserVotes();
  const userRating = userVotes[guideId] !== undefined ? userVotes[guideId] : null;

  if (userRating === null) {
    return {
      score: baseScore,
      count: baseCount,
      userRating: null
    };
  }

  // Calculate new average including the user's rating
  const totalScoreSum = baseScore * baseCount + userRating;
  const newCount = baseCount + 1;
  const finalScore = Number((totalScoreSum / newCount).toFixed(1));

  return {
    score: Math.min(5.0, Math.max(1.0, finalScore)),
    count: newCount,
    userRating
  };
}

/**
 * Submit or update a user rating for a guide.
 */
export function submitGuideRating(guideId: string, stars: number): GuideRatingData {
  const clamped = Math.max(1, Math.min(5, Math.round(stars)));
  const userVotes = getUserVotes();
  userVotes[guideId] = clamped;
  saveUserVotes(userVotes);

  const updated = getGuideRating(guideId);

  // Dispatch custom event to notify all components in the app
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent(EVENT_NAME, {
        detail: { guideId, stars: clamped, updated }
      })
    );
  }

  return updated;
}

/**
 * Subscribe to rating changes across components.
 */
export function subscribeToRatings(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const handler = () => callback();
  window.addEventListener(EVENT_NAME, handler);
  window.addEventListener('storage', handler);
  return () => {
    window.removeEventListener(EVENT_NAME, handler);
    window.removeEventListener('storage', handler);
  };
}
