import {
  getNextActivePlayerIndex,
  isGameOver,
  drawUniqueQuestion,
  drawUniqueChallenge,
  BOARD_SIZE,
} from "../utils/gameLogic";

export const initialGameState = {
  screen: "SETUP", // 'SETUP' | 'PLAYING' | 'VICTORY'
  targetLaps: 1,
  players: [
    {
      id: 1,
      name: "اللاعب 1 (ناروتو)",
      avatarId: "naruto",
      symbol: "🍥",
      color: "#FF6B00",
      position: 0,
      lap: 0,
      score: 0,
      inventory: {
        shields: 0,
        doublePoints: false,
        bonusTime: false,
        deflections: 0,
        freeHints: 0,
        rerolls: 0,
        highDice: false,
      },
      debuffs: {
        isFrozen: false,
        halfTime: false,
        timeDrain: 0,
        skipNextQuestion: false,
      },
      hasFinished: false,
    },
    {
      id: 2,
      name: "اللاعب 2 (لوفي)",
      avatarId: "luffy",
      symbol: "🍖",
      color: "#E53935",
      position: 0,
      lap: 0,
      score: 0,
      inventory: {
        shields: 0,
        doublePoints: false,
        bonusTime: false,
        deflections: 0,
        freeHints: 0,
        rerolls: 0,
        highDice: false,
      },
      debuffs: {
        isFrozen: false,
        halfTime: false,
        timeDrain: 0,
        skipNextQuestion: false,
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
    case "START_GAME": {
      const { players, targetLaps } = action.payload;
      return {
        ...state,
        screen: "PLAYING",
        targetLaps,
        players: players.slice(0, 2).map((p, idx) => ({
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
            freeHints: 0,
            rerolls: 0,
            highDice: false,
          },
          debuffs: {
            isFrozen: false,
            halfTime: false,
            timeDrain: 0,
            skipNextQuestion: false,
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
        turnLog: [
          `بدأت المواجهة 1v1! الهدف: إتمام ${targetLaps} دورة حول الخارطة.`,
        ],
        notification: {
          text: `انطلقت المواجهة! دور ${players[0].name}`,
          type: "info",
        },
      };
    }

    case "MARK_QUESTION_USED": {
      const qId = action.payload;
      const already = state.usedQuestionIds.includes(qId);
      return {
        ...state,
        usedQuestionIds: already
          ? state.usedQuestionIds
          : [...state.usedQuestionIds, qId],
        answeredQuestionIds: already
          ? state.answeredQuestionIds
          : [...state.answeredQuestionIds, qId],
      };
    }

    case "SET_ROLLING": {
      return {
        ...state,
        isRolling: action.payload,
      };
    }

    case "SET_ROLL_RESULT": {
      return {
        ...state,
        isRolling: false,
        lastRollValue: action.payload,
      };
    }

    case "START_MOVING": {
      return {
        ...state,
        isMoving: true,
      };
    }

    case "UPDATE_PLAYER_POSITION": {
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

    case "FINISH_MOVEMENT": {
      const { tileData, destinationIndex } = action.payload;
      const activePlayer = state.players[state.activePlayerIndex];

      // Check if both players completed target laps
      if (isGameOver(state.players, state.targetLaps)) {
        return {
          ...state,
          isMoving: false,
          screen: "VICTORY",
          activeModal: null,
          turnLog: [
            `🏆 أنهى البطلان السباق! الانتقال إلى منصة التتويج!`,
            ...state.turnLog,
          ],
        };
      }

      // If landed on safe tile, turn ends immediately and passes to opponent
      if (tileData.type.type === "SAFE") {
        let updatedPlayers = [...state.players];
        let logAdditions = [];

        // Check for unfreezing during search
        for (let i = 0; i < updatedPlayers.length; i++) {
          const checkIdx =
            (state.activePlayerIndex + 1 + i) % updatedPlayers.length;
          const candidate = updatedPlayers[checkIdx];
          if (
            !candidate.hasFinished &&
            candidate.lap < state.targetLaps &&
            candidate.debuffs?.isFrozen
          ) {
            logAdditions.push(
              `❄️ تم تخطي دور ${candidate.name} بسبب تأثير التجميد.`,
            );
          }
        }

        const nextIdx = getNextActivePlayerIndex(
          updatedPlayers,
          state.activePlayerIndex,
          state.targetLaps,
        );

        if (nextIdx === -1 || isGameOver(updatedPlayers, state.targetLaps)) {
          return {
            ...state,
            players: updatedPlayers,
            isMoving: false,
            screen: "VICTORY",
            activeModal: null,
            turnLog: [
              "🏆 اكتملت جميع الدورات! مرحباً بكم في منصة التتويج.",
              ...state.turnLog,
            ],
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
            type: "info",
          },
        };
      }

      // Check if player has skipNextQuestion debuff (ضباب النسيان)
      if (
        activePlayer.debuffs?.skipNextQuestion &&
        (tileData.type.type === "QUIZ" || tileData.type.type === "CHALLENGE")
      ) {
        let updatedPlayers = state.players.map((p, idx) =>
          idx === state.activePlayerIndex
            ? { ...p, debuffs: { ...p.debuffs, skipNextQuestion: false } }
            : p,
        );

        const nextIdx = getNextActivePlayerIndex(
          updatedPlayers,
          state.activePlayerIndex,
          state.targetLaps,
        );

        if (nextIdx === -1 || isGameOver(updatedPlayers, state.targetLaps)) {
          return {
            ...state,
            players: updatedPlayers,
            isMoving: false,
            screen: "VICTORY",
            activeModal: null,
            turnLog: [
              "🏆 اكتملت جميع الدورات! مرحباً بكم في منصة التتويج.",
              ...state.turnLog,
            ],
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
            `🌫️ تأثير "ضباب النسيان" تخطى سؤال/تحدي الخانة ${tileData.number} تماماً!`,
            ...state.turnLog,
          ],
          notification: {
            text: `🌫️ تم تخطي السؤال بسبب ضباب النسيان! الدور الآن لـ ${nextPlayer.name}`,
            type: "info",
          },
        };
      }

      // Pre-draw non-repeating question if QUIZ tile
      if (tileData.type.type === "QUIZ") {
        const drawn = drawUniqueQuestion(state.usedQuestionIds);

        return {
          ...state,
          isMoving: false,
          usedQuestionIds: drawn.newUsedIds,
          answeredQuestionIds: drawn.newUsedIds,
          activeModal: {
            type: "QUIZ",
            tile: tileData,
            question: { kind: drawn.kind, data: drawn.data },
            destinationIndex,
          },
        };
      }

      // Pre-draw non-repeating challenge if CHALLENGE tile
      if (tileData.type.type === "CHALLENGE") {
        const drawn = drawUniqueChallenge(state.usedChallengeIds);

        return {
          ...state,
          isMoving: false,
          usedChallengeIds: drawn.newUsedChallengeIds,
          answeredChallengeIds: drawn.newUsedChallengeIds,
          activeModal: {
            type: "CHALLENGE",
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

    case "CLOSE_MODAL": {
      return {
        ...state,
        activeModal: null,
      };
    }

    case "ADD_POINTS": {
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

    case "DEDUCT_POINTS": {
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

    case "UPDATE_PLAYER_SCORE": {
      const { playerId, newPoints } = action.payload;
      const finalPoints = Math.max(0, Math.round(Number(newPoints) || 0));
      const targetPlayer = state.players.find((p) => p.id === playerId);
      const updatedPlayers = state.players.map((p) =>
        p.id === playerId
          ? { ...p, score: finalPoints, points: finalPoints }
          : p,
      );

      return {
        ...state,
        players: updatedPlayers,
        turnLog: [
          `⚖️ تم تعديل نقاط ${targetPlayer?.name || "اللاعب"} إلى ${finalPoints} نقطة بواسطة الحكم.`,
          ...state.turnLog,
        ],
        notification: {
          text: `⚖️ تم تعديل نقاط ${targetPlayer?.name || "اللاعب"} إلى ${finalPoints} نقطة بواسطة الحكم.`,
          type: "info",
        },
      };
    }

    case "APPLY_BUFF": {
      const { playerIndex, buff } = action.payload;
      const updatedPlayers = state.players.map((p, idx) => {
        if (idx === playerIndex) {
          const inv = { ...p.inventory };
          if (buff.type === "SHIELD") inv.shields += 1;
          if (buff.type === "DOUBLE_POINTS") inv.doublePoints = true;
          if (buff.type === "BONUS_TIME") inv.bonusTime = true;
          if (buff.type === "DEFLECTION") inv.deflections += 1;
          if (buff.type === "FREE_HINT")
            inv.freeHints = (inv.freeHints || 0) + 1;
          if (buff.type === "REROLL") inv.rerolls = (inv.rerolls || 0) + 1;
          if (buff.type === "HIGH_DICE") inv.highDice = true;
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

    case "CONSUME_BUFF": {
      const { playerIndex, buffType } = action.payload;
      const updatedPlayers = state.players.map((p, idx) => {
        if (idx === playerIndex) {
          const inv = { ...p.inventory };
          if (buffType === "SHIELD" && inv.shields > 0) inv.shields -= 1;
          if (buffType === "DOUBLE_POINTS") inv.doublePoints = false;
          if (buffType === "BONUS_TIME") inv.bonusTime = false;
          if (buffType === "DEFLECTION" && inv.deflections > 0)
            inv.deflections -= 1;
          if (buffType === "FREE_HINT" && inv.freeHints > 0) inv.freeHints -= 1;
          if (buffType === "REROLL" && inv.rerolls > 0) inv.rerolls -= 1;
          if (buffType === "HIGH_DICE") inv.highDice = false;
          return { ...p, inventory: inv };
        }
        return p;
      });

      return {
        ...state,
        players: updatedPlayers,
      };
    }

    case "SET_DEBUFF": {
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

    case "NEXT_TURN": {
      let updatedPlayers = [...state.players];
      let logAdditions = [];

      // Clean up transient turn modifiers for the player whose turn just ended
      updatedPlayers = updatedPlayers.map((p, idx) => {
        if (idx === state.activePlayerIndex) {
          return {
            ...p,
            inventory: {
              ...p.inventory,
              highDice: false,
            },
            debuffs: {
              ...p.debuffs,
              timeDrain: 0,
              halfTime: false,
            },
          };
        }
        return p;
      });

      // Check for unfreezing during search
      for (let i = 0; i < updatedPlayers.length; i++) {
        const checkIdx =
          (state.activePlayerIndex + 1 + i) % updatedPlayers.length;
        const candidate = updatedPlayers[checkIdx];
        if (
          !candidate.hasFinished &&
          candidate.lap < state.targetLaps &&
          candidate.debuffs?.isFrozen
        ) {
          logAdditions.push(
            `❄️ تم تخطي دور ${candidate.name} بسبب تأثير التجميد.`,
          );
        }
      }

      const nextIdx = getNextActivePlayerIndex(
        updatedPlayers,
        state.activePlayerIndex,
        state.targetLaps,
      );

      // Check if all players completed laps or no valid player found
      if (nextIdx === -1 || isGameOver(updatedPlayers, state.targetLaps)) {
        return {
          ...state,
          players: updatedPlayers,
          isMoving: false,
          isRolling: false,
          screen: "VICTORY",
          activeModal: null,
          turnLog: [
            "🏆 اكتملت جميع الدورات! مرحباً بكم في منصة التتويج.",
            ...state.turnLog,
          ],
        };
      }

      const nextPlayer = updatedPlayers[nextIdx];

      return {
        ...state,
        players: updatedPlayers,
        isMoving: false,
        isRolling: false,
        activePlayerIndex: nextIdx,
        activeModal: null,
        turnLog: [...logAdditions, ...state.turnLog],
        notification: {
          text: `دور اللاعب: ${nextPlayer.name}`,
          type: "info",
        },
      };
    }

    case "SET_NOTIFICATION": {
      return {
        ...state,
        notification: action.payload,
      };
    }

    case "RESET_GAME": {
      return {
        ...initialGameState,
        screen: "SETUP",
      };
    }

    default:
      return state;
  }
}
