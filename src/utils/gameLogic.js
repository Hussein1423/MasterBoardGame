import {
  MCQ_QUESTIONS,
  SILHOUETTE_QUESTIONS,
  DIRECT_QUESTIONS,
  SPEED_CHALLENGES,
} from '../data/questionsData';

export const BOARD_SIZE = 30;

/**
 * Calculates step-by-step tile path and lap updates for a roll
 */
export function calculateMovement(currentPosition, steps, currentLap, targetLaps) {
  const path = [];
  let pos = currentPosition;
  let lap = currentLap;
  let lapCompletedInMove = false;

  for (let i = 1; i <= steps; i++) {
    pos = (pos + 1) % BOARD_SIZE;
    path.push(pos);
    if (pos === 0) {
      lap += 1;
      lapCompletedInMove = true;
    }
  }

  const hasFinished = lap >= targetLaps;

  return {
    path,
    finalPosition: pos,
    newLap: lap,
    lapCompletedInMove,
    hasFinished,
  };
}

/**
 * Bulletproof Turn Progression lookup skipping finished and unfreezing frozen players
 * Returns -1 if all players have completed their laps
 */
export function getNextActivePlayerIndex(players, currentIndex, totalLaps) {
  let nextIndex = (currentIndex + 1) % players.length;
  let checkedCount = 0;

  while (checkedCount < players.length) {
    const candidate = players[nextIndex];
    const hasFinished = candidate.lap >= totalLaps || candidate.hasFinished;

    // Skip players who already finished the game
    if (hasFinished) {
      nextIndex = (nextIndex + 1) % players.length;
      checkedCount++;
      continue;
    }

    // Handle frozen players who haven't finished yet
    if (candidate.debuffs?.isFrozen || candidate.isFrozen) {
      // Unfreeze the player for their upcoming round, but skip their current turn
      if (candidate.debuffs) candidate.debuffs.isFrozen = false;
      candidate.isFrozen = false;
      nextIndex = (nextIndex + 1) % players.length;
      checkedCount++;
      continue;
    }

    // Found a valid active player
    return nextIndex;
  }

  // If all players are finished or no valid player found -> Game Ends
  return -1;
}

export function getNextPlayerIndex(players, currentIndex, targetLaps) {
  return getNextActivePlayerIndex(players, currentIndex, targetLaps);
}

/**
 * Checks if all players have completed the required laps
 */
export function isGameOver(players, targetLaps) {
  return players.every((p) => p.lap >= targetLaps || p.hasFinished);
}

/**
 * Sorts players for victory podium
 */
export function getRankings(players) {
  return [...players].sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    if (b.lap !== a.lap) {
      return b.lap - a.lap;
    }
    return b.position - a.position;
  });
}

/**
 * Draws a unique, non-repeating question from the entire match-wide question pool
 */
export function drawUniqueQuestion(usedQuestionIds = []) {
  const allQuestions = [
    ...MCQ_QUESTIONS.map((q) => ({ kind: 'MCQ', data: q })),
    ...SILHOUETTE_QUESTIONS.map((q) => ({ kind: 'SILHOUETTE', data: q })),
    ...DIRECT_QUESTIONS.map((q) => ({ kind: 'DIRECT', data: q })),
  ];

  // 1. Try to find unused questions across all categories in the entire match
  const unusedQuestions = allQuestions.filter(
    (item) => !usedQuestionIds.includes(item.data.id)
  );

  if (unusedQuestions.length > 0) {
    const selected =
      unusedQuestions[Math.floor(Math.random() * unusedQuestions.length)];
    return {
      kind: selected.kind,
      data: selected.data,
      newUsedIds: [...usedQuestionIds, selected.data.id],
    };
  }

  // 2. Absolute Fallback: If EVERY question in the match has been answered, pick random without clearing usedQuestionIds
  const fallback =
    allQuestions[Math.floor(Math.random() * allQuestions.length)];
  return {
    kind: fallback.kind,
    data: fallback.data,
    newUsedIds: usedQuestionIds,
  };
}

/**
 * Draws a unique speed challenge from the match-wide challenge pool
 */
export function drawUniqueChallenge(usedChallengeIds = []) {
  const unusedChallenges = SPEED_CHALLENGES.filter(
    (c) => !usedChallengeIds.includes(c.id)
  );

  if (unusedChallenges.length > 0) {
    const selected =
      unusedChallenges[Math.floor(Math.random() * unusedChallenges.length)];
    return {
      data: selected,
      newUsedChallengeIds: [...usedChallengeIds, selected.id],
    };
  }

  const fallback =
    SPEED_CHALLENGES[Math.floor(Math.random() * SPEED_CHALLENGES.length)];
  return {
    data: fallback,
    newUsedChallengeIds: usedChallengeIds,
  };
}
