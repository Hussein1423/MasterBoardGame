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
 * Determines the next active player index, strictly skipping finished and frozen players
 */
export function getNextPlayerIndex(players, currentIndex, targetLaps) {
  let nextIdx = (currentIndex + 1) % players.length;
  let loopCheck = 0;

  while (loopCheck < players.length) {
    const candidate = players[nextIdx];
    const isFinished = candidate.lap >= targetLaps || candidate.hasFinished;
    if (!isFinished) {
      return nextIdx;
    }
    nextIdx = (nextIdx + 1) % players.length;
    loopCheck++;
  }

  return (currentIndex + 1) % players.length;
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
