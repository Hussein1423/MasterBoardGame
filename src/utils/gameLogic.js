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
    // If we reach index 0 (which corresponds to tile 1 after completing a full 30-tile circle)
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
    // 1. Highest score
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    // 2. Highest lap
    if (b.lap !== a.lap) {
      return b.lap - a.lap;
    }
    // 3. Highest position
    return b.position - a.position;
  });
}

/**
 * Draws a unique, non-repeating question from the pool across MCQ, SILHOUETTE, and DIRECT
 */
export function drawUniqueQuestion(answeredQuestionIds = []) {
  const rand = Math.random();
  const preferredKind =
    rand < 0.35 ? 'MCQ' : rand < 0.65 ? 'SILHOUETTE' : 'DIRECT';

  let pool =
    preferredKind === 'MCQ'
      ? MCQ_QUESTIONS
      : preferredKind === 'SILHOUETTE'
      ? SILHOUETTE_QUESTIONS
      : DIRECT_QUESTIONS;

  let available = pool.filter((q) => !answeredQuestionIds.includes(q.id));

  // If preferred pool exhausted, look across all question pools
  if (available.length === 0) {
    const allQuestions = [
      ...MCQ_QUESTIONS.map((q) => ({ kind: 'MCQ', data: q })),
      ...SILHOUETTE_QUESTIONS.map((q) => ({ kind: 'SILHOUETTE', data: q })),
      ...DIRECT_QUESTIONS.map((q) => ({ kind: 'DIRECT', data: q })),
    ];
    const allAvailable = allQuestions.filter((item) => !answeredQuestionIds.includes(item.data.id));

    if (allAvailable.length > 0) {
      const chosen = allAvailable[Math.floor(Math.random() * allAvailable.length)];
      return {
        kind: chosen.kind,
        data: chosen.data,
        resetPool: false,
      };
    }

    // If completely exhausted, reset pool
    const fallbackChosen = pool[Math.floor(Math.random() * pool.length)];
    return {
      kind: preferredKind,
      data: fallbackChosen,
      resetPool: true,
    };
  }

  const chosenData = available[Math.floor(Math.random() * available.length)];
  return {
    kind: preferredKind,
    data: chosenData,
    resetPool: false,
  };
}

/**
 * Draws a unique speed challenge from the pool
 */
export function drawUniqueChallenge(answeredChallengeIds = []) {
  let available = SPEED_CHALLENGES.filter((c) => !answeredChallengeIds.includes(c.id));
  let resetPool = false;

  if (available.length === 0) {
    available = SPEED_CHALLENGES;
    resetPool = true;
  }

  const chosen = available[Math.floor(Math.random() * available.length)];
  return {
    data: chosen,
    resetPool,
  };
}
