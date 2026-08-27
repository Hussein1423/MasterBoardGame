import {
  getNextPlayerIndex,
  isGameOver,
  drawUniqueQuestion,
  drawUniqueChallenge,
  BOARD_SIZE,
} from '../utils/gameLogic';

export const initialGameState = {
  screen: 'SETUP', // 'SETUP' | 'PLAYING' | 'VICTORY'
  targetLaps: 1,
  players: [
    {
      id: 1,
      name: 'اللاعب 1 (ناروتو)',
      avatarId: 'naruto',
      symbol: '🍥',
      color: '#FF6B00',
      position: 0,
      lap: 0,
      score: 0,
      inventory: {
        shields: 0,
        doublePoints: false,
        bonusTime: false,
        deflections: 0,
      },
      debuffs: {
        isFrozen: false,
        halfTime: false,
      },
      hasFinished: false,
    },
    {
      id: 2,
      name: 'اللاعب 2 (لوفي)',
      avatarId: 'luffy',
      symbol: '🍖',
      color: '#E53935',
      position: 0,
      lap: 0,
      score: 0,
      inventory: {
        shields: 0,
        doublePoints: false,
        bonusTime: false,
        deflections: 0,
      },
      debuffs: {
        isFrozen: false,
        halfTime: false,
      },
      hasFinished: false,
    },
    {
      id: 3,
      name: 'اللاعب 3 (إيرين)',
      avatarId: 'eren',
      symbol: '🗝️',
      color: '#00897B',
      position: 0,
      lap: 0,
      score: 0,
      inventory: {
        shields: 0,
        doublePoints: false,
        bonusTime: false,
        deflections: 0,
      },
      debuffs: {
        isFrozen: false,
        halfTime: false,
      },
      hasFinished: false,
    },
  ],
  activePlayerIndex: 0,
  isRolling: false,
  isMoving: false,
  lastRollValue: null,
  activeModal: null, // { type, tile, question, challenge, destinationIndex }
  usedQuestionIds: [],
  answeredQuestionIds: [],
  usedChallengeIds: [],
  answeredChallengeIds: [],
  turnLog: [],
  notification: null, // { text, type: 'info' | 'success' | 'warning' | 'error' }
};

export function gameReducer(state, action) {
  switch (action.type) {
    case 'START_GAME': {
      const { players, targetLaps } = action.payload;
      return {
        ...state,
        screen: 'PLAYING',
        targetLaps,
        players: players.map((p, idx) => ({
          ...p,
          id: idx + 1,
          position: 0,
          lap: 0,
          score: 0,
          inventory: {
            shields: 0,
            doublePoints: false,
            bonusTime: false,
            deflections: 0,
          },
          debuffs: {
            isFrozen: false,
            halfTime: false,
          },
          hasFinished: false,
        })),
        activePlayerIndex: 0,
        isRolling: false,
        isMoving: false,
        lastRollValue: null,
        activeModal: null,
        usedQuestionIds: [],
        answeredQuestionIds: [],
        usedChallengeIds: [],
        answeredChallengeIds: [],
        turnLog: [`بدأت اللعبة! الهدف: إتمام ${targetLaps} دورة حول الخارطة.`],
        notification: {
          text: `انطلقت المنافسة! دور ${players[0].name}`,
          type: 'info',
        },
      };
    }

    case 'MARK_QUESTION_USED': {
      const qId = action.payload;
      const already = state.usedQuestionIds.includes(qId);
      return {
        ...state,
        usedQuestionIds: already ? state.usedQuestionIds : [...state.usedQuestionIds, qId],
        answeredQuestionIds: already ? state.answeredQuestionIds : [...state.answeredQuestionIds, qId],
      };
    }

    case 'SET_ROLLING': {
      return {
        ...state,
        isRolling: action.payload,
      };
    }

    case 'SET_ROLL_RESULT': {
      return {
        ...state,
        isRolling: false,
        lastRollValue: action.payload,
      };
    }

    case 'START_MOVING': {
      return {
        ...state,
        isMoving: true,
      };
    }

    case 'UPDATE_PLAYER_POSITION': {
      const { playerIndex, newPosition, newLap } = action.payload;
      const updatedPlayers = state.players.map((p, idx) => {
        if (idx === playerIndex) {
          const hasFinished = newLap >= state.targetLaps;
          return {
            ...p,
            position: newPosition,
            lap: newLap,
            hasFinished,
          };
        }
        return p;
      });

      return {
        ...state,
        players: updatedPlayers,
      };
    }

    case 'FINISH_MOVEMENT': {
      const { tileData, destinationIndex } = action.payload;
      const activePlayer = state.players[state.activePlayerIndex];

      // Check if all players completed the target laps
      if (isGameOver(state.players, state.targetLaps)) {
        return {
          ...state,
          isMoving: false,
          screen: 'VICTORY',
          activeModal: null,
          turnLog: [
            `🏆 أنهى جميع اللاعبين السباق! الانتقال إلى منصة التتويج!`,
            ...state.turnLog,
          ],
        };
      }

      // If landed on safe tile, turn ends immediately and passes to next eligible player
      if (tileData.type.type === 'SAFE') {
        let updatedPlayers = [...state.players];
        let nextIdx = (state.activePlayerIndex + 1) % state.players.length;
        let loopCheck = 0;
        let logAdditions = [];

        while (loopCheck < state.players.length) {
          const candidate = updatedPlayers[nextIdx];
          const isFinished = candidate.lap >= state.targetLaps || candidate.hasFinished;

          if (isFinished) {
            nextIdx = (nextIdx + 1) % state.players.length;
            loopCheck++;
            continue;
          }

          if (candidate.debuffs.isFrozen) {
            logAdditions.push(`❄️ تم تخطي دور ${candidate.name} بسبب تأثير التجميد.`);
            updatedPlayers = updatedPlayers.map((p, idx) => {
              if (idx === nextIdx) {
                return {
                  ...p,
                  debuffs: { ...p.debuffs, isFrozen: false },
                };
              }
              return p;
            });
            nextIdx = (nextIdx + 1) % state.players.length;
            loopCheck++;
            continue;
          }

          break;
        }

        if (isGameOver(updatedPlayers, state.targetLaps)) {
          return {
            ...state,
            players: updatedPlayers,
            isMoving: false,
            screen: 'VICTORY',
            activeModal: null,
            turnLog: ['🏆 اكتملت جميع الدورات! مرحباً بكم في منصة التتويج.', ...state.turnLog],
          };
        }

        const nextPlayer = updatedPlayers[nextIdx];

        return {
          ...state,
          players: updatedPlayers,
          isMoving: false,
          activePlayerIndex: nextIdx,
          activeModal: null,
          turnLog: [
            ...logAdditions,
            `${activePlayer.name} وصل إلى محطة راحة (${tileData.title}).`,
            ...state.turnLog,
          ],
          notification: {
            text: `${activePlayer.name} في منطقة آمنة. الدور الآن لـ ${nextPlayer.name}`,
            type: 'info',
          },
        };
      }

      // Pre-draw non-repeating question if QUIZ tile
      if (tileData.type.type === 'QUIZ') {
        const drawn = drawUniqueQuestion(state.usedQuestionIds);

        return {
          ...state,
          isMoving: false,
          usedQuestionIds: drawn.newUsedIds,
          answeredQuestionIds: drawn.newUsedIds,
          activeModal: {
            type: 'QUIZ',
            tile: tileData,
            question: { kind: drawn.kind, data: drawn.data },
            destinationIndex,
          },
        };
      }

      // Pre-draw non-repeating challenge if CHALLENGE tile
      if (tileData.type.type === 'CHALLENGE') {
        const drawn = drawUniqueChallenge(state.usedChallengeIds);

        return {
          ...state,
          isMoving: false,
          usedChallengeIds: drawn.newUsedChallengeIds,
          answeredChallengeIds: drawn.newUsedChallengeIds,
          activeModal: {
            type: 'CHALLENGE',
            tile: tileData,
            challenge: drawn.data,
            destinationIndex,
          },
        };
      }

      // Otherwise, open lucky/trap modal
      return {
        ...state,
        isMoving: false,
        activeModal: {
          type: tileData.type.type,
          tile: tileData,
          destinationIndex,
        },
      };
    }

    case 'CLOSE_MODAL': {
      return {
        ...state,
        activeModal: null,
      };
    }

    case 'ADD_POINTS': {
      const { playerIndex, points, reason } = action.payload;
      const updatedPlayers = state.players.map((p, idx) => {
        if (idx === playerIndex) {
          return {
            ...p,
            score: Math.max(0, Math.round(p.score + points)),
          };
        }
        return p;
      });

      return {
        ...state,
        players: updatedPlayers,
        turnLog: [
          `✨ ${state.players[playerIndex].name} حصل على +${points} نقطة (${reason}).`,
          ...state.turnLog,
        ],
      };
    }

    case 'DEDUCT_POINTS': {
      const { playerIndex, points, reason } = action.payload;
      const updatedPlayers = state.players.map((p, idx) => {
        if (idx === playerIndex) {
          return {
            ...p,
            score: Math.max(0, Math.round(p.score - points)),
          };
        }
        return p;
      });

      return {
        ...state,
        players: updatedPlayers,
        turnLog: [
          `⚠️ خسر ${state.players[playerIndex].name} -${points} نقطة (${reason}).`,
          ...state.turnLog,
        ],
      };
    }

    case 'APPLY_BUFF': {
      const { playerIndex, buff } = action.payload;
      const updatedPlayers = state.players.map((p, idx) => {
        if (idx === playerIndex) {
          const inv = { ...p.inventory };
          if (buff.type === 'SHIELD') inv.shields += 1;
          if (buff.type === 'DOUBLE_POINTS') inv.doublePoints = true;
          if (buff.type === 'BONUS_TIME') inv.bonusTime = true;
          if (buff.type === 'DEFLECTION') inv.deflections += 1;
          return { ...p, inventory: inv };
        }
        return p;
      });

      return {
        ...state,
        players: updatedPlayers,
        turnLog: [
          `🎁 حصل ${state.players[playerIndex].name} على ميزة: ${buff.name}!`,
          ...state.turnLog,
        ],
      };
    }

    case 'CONSUME_BUFF': {
      const { playerIndex, buffType } = action.payload;
      const updatedPlayers = state.players.map((p, idx) => {
        if (idx === playerIndex) {
          const inv = { ...p.inventory };
          if (buffType === 'SHIELD' && inv.shields > 0) inv.shields -= 1;
          if (buffType === 'DOUBLE_POINTS') inv.doublePoints = false;
          if (buffType === 'BONUS_TIME') inv.bonusTime = false;
          if (buffType === 'DEFLECTION' && inv.deflections > 0)
            inv.deflections -= 1;
          return { ...p, inventory: inv };
        }
        return p;
      });

      return {
        ...state,
        players: updatedPlayers,
      };
    }

    case 'SET_DEBUFF': {
      const { playerIndex, debuffType, value } = action.payload;
      const updatedPlayers = state.players.map((p, idx) => {
        if (idx === playerIndex) {
          return {
            ...p,
            debuffs: {
              ...p.debuffs,
              [debuffType]: value,
            },
          };
        }
        return p;
      });

      return {
        ...state,
        players: updatedPlayers,
      };
    }

    case 'NEXT_TURN': {
      let updatedPlayers = [...state.players];
      let nextIdx = (state.activePlayerIndex + 1) % state.players.length;
      let loopCheck = 0;
      let logAdditions = [];

      // Check if all players completed laps
      if (isGameOver(updatedPlayers, state.targetLaps)) {
        return {
          ...state,
          players: updatedPlayers,
          screen: 'VICTORY',
          activeModal: null,
          turnLog: [
            '🏆 اكتملت جميع الدورات لجميع اللاعبين! مرحباً بكم في منصة التتويج.',
            ...state.turnLog,
          ],
        };
      }

      // Loop to find next eligible player who is NOT finished and NOT frozen
      while (loopCheck < state.players.length) {
        const candidate = updatedPlayers[nextIdx];
        const isFinished = candidate.lap >= state.targetLaps || candidate.hasFinished;

        if (isFinished) {
          nextIdx = (nextIdx + 1) % state.players.length;
          loopCheck++;
          continue;
        }

        // Check if candidate is frozen
        if (candidate.debuffs.isFrozen) {
          logAdditions.push(`❄️ تم تخطي دور ${candidate.name} بسبب تأثير التجميد.`);
          // Unfreeze for the next round
          updatedPlayers = updatedPlayers.map((p, idx) => {
            if (idx === nextIdx) {
              return {
                ...p,
                debuffs: { ...p.debuffs, isFrozen: false },
              };
            }
            return p;
          });

          // Continue looking
          nextIdx = (nextIdx + 1) % state.players.length;
          loopCheck++;
          continue;
        }

        // Found an eligible active player!
        break;
      }

      // Check again if everyone ended up finished
      if (isGameOver(updatedPlayers, state.targetLaps)) {
        return {
          ...state,
          players: updatedPlayers,
          screen: 'VICTORY',
          activeModal: null,
          turnLog: [
            '🏆 اكتملت جميع الدورات لجميع اللاعبين! مرحباً بكم في منصة التتويج.',
            ...state.turnLog,
          ],
        };
      }

      const nextPlayer = updatedPlayers[nextIdx];

      return {
        ...state,
        players: updatedPlayers,
        activePlayerIndex: nextIdx,
        activeModal: null,
        turnLog: [...logAdditions, ...state.turnLog],
        notification: {
          text: `دور اللاعب: ${nextPlayer.name}`,
          type: 'info',
        },
      };
    }

    case 'SET_NOTIFICATION': {
      return {
        ...state,
        notification: action.payload,
      };
    }

    case 'RESET_GAME': {
      return {
        ...initialGameState,
        screen: 'SETUP',
      };
    }

    default:
      return state;
  }
}
