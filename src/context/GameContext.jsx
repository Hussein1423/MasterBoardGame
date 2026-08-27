import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from 'react';
import { gameReducer, initialGameState } from './gameReducer';
import { TILES_DATA } from '../data/tilesData';
import { calculateMovement, BOARD_SIZE, isGameOver } from '../utils/gameLogic';
import { soundEffects } from '../utils/soundEffects';

const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);

  const startGame = useCallback((players, targetLaps) => {
    soundEffects.playSuccess();
    dispatch({
      type: 'START_GAME',
      payload: { players, targetLaps },
    });
  }, []);

  const executeMovementPath = useCallback(
    async (path, finalLap, targetLaps, playerIndex) => {
      dispatch({ type: 'START_MOVING' });

      for (let i = 0; i < path.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 300));
        const currentPos = path[i];
        soundEffects.playStep();

        const stepLap =
          currentPos === 0
            ? state.players[playerIndex].lap + 1
            : state.players[playerIndex].lap;

        dispatch({
          type: 'UPDATE_PLAYER_POSITION',
          payload: {
            playerIndex,
            newPosition: currentPos,
            newLap: i === path.length - 1 ? finalLap : stepLap,
          },
        });
      }

      await new Promise((resolve) => setTimeout(resolve, 250));

      const destinationTile = TILES_DATA[path[path.length - 1]];
      dispatch({
        type: 'FINISH_MOVEMENT',
        payload: {
          tileData: destinationTile,
          destinationIndex: path[path.length - 1],
        },
      });
    },
    [state.players]
  );

  const rollDice = useCallback(() => {
    if (state.isRolling || state.isMoving || state.activeModal) return;

    const activePlayer = state.players[state.activePlayerIndex];
    if (activePlayer.lap >= state.targetLaps || activePlayer.hasFinished) return;

    dispatch({ type: 'SET_ROLLING', payload: true });
    soundEffects.playRoll();

    // 1.5 second reel animation
    setTimeout(() => {
      const rollValue = Math.floor(Math.random() * 6) + 1;
      dispatch({ type: 'SET_ROLL_RESULT', payload: rollValue });

      const { path, newLap } = calculateMovement(
        activePlayer.position,
        rollValue,
        activePlayer.lap,
        state.targetLaps
      );

      executeMovementPath(
        path,
        newLap,
        state.targetLaps,
        state.activePlayerIndex
      );
    }, 1500);
  }, [
    state.isRolling,
    state.isMoving,
    state.activeModal,
    state.players,
    state.activePlayerIndex,
    state.targetLaps,
    executeMovementPath,
  ]);

  const advanceStepsDirectly = useCallback(
    (steps) => {
      const activePlayer = state.players[state.activePlayerIndex];
      const { path, newLap } = calculateMovement(
        activePlayer.position,
        steps,
        activePlayer.lap,
        state.targetLaps
      );
      executeMovementPath(
        path,
        newLap,
        state.targetLaps,
        state.activePlayerIndex
      );
    },
    [
      state.players,
      state.activePlayerIndex,
      state.targetLaps,
      executeMovementPath,
    ]
  );

  const moveBackStepsDirectly = useCallback(
    (steps) => {
      const activePlayer = state.players[state.activePlayerIndex];
      let newPos = (activePlayer.position - steps + BOARD_SIZE) % BOARD_SIZE;
      soundEffects.playTrap();
      dispatch({
        type: 'UPDATE_PLAYER_POSITION',
        payload: {
          playerIndex: state.activePlayerIndex,
          newPosition: newPos,
          newLap: activePlayer.lap,
        },
      });
      dispatch({ type: 'NEXT_TURN' });
    },
    [state.players, state.activePlayerIndex]
  );

  const resolveQuiz = useCallback(
    (points, isCorrect, reason, targetPlayerIdx = null) => {
      const pIdx =
        targetPlayerIdx !== null ? targetPlayerIdx : state.activePlayerIndex;
      const player = state.players[pIdx];

      if (isCorrect) {
        soundEffects.playSuccess();
        let finalPoints = points;
        if (player.inventory.doublePoints) {
          finalPoints = points * 2;
          dispatch({
            type: 'CONSUME_BUFF',
            payload: { playerIndex: pIdx, buffType: 'DOUBLE_POINTS' },
          });
        }
        dispatch({
          type: 'ADD_POINTS',
          payload: {
            playerIndex: pIdx,
            points: Math.round(finalPoints),
            reason: reason || 'إجابة صحيحة',
          },
        });
      } else {
        soundEffects.playFail();
      }

      // Consume bonus time & clear half time debuff if active
      if (player.inventory.bonusTime) {
        dispatch({
          type: 'CONSUME_BUFF',
          payload: { playerIndex: pIdx, buffType: 'BONUS_TIME' },
        });
      }
      if (player.debuffs.halfTime) {
        dispatch({
          type: 'SET_DEBUFF',
          payload: { playerIndex: pIdx, debuffType: 'halfTime', value: false },
        });
      }

      dispatch({ type: 'NEXT_TURN' });
    },
    [state.players, state.activePlayerIndex]
  );

  const resolveChallenge = useCallback(
    (points, isPassed, reason) => {
      if (isPassed) {
        soundEffects.playSuccess();
        dispatch({
          type: 'ADD_POINTS',
          payload: {
            playerIndex: state.activePlayerIndex,
            points: Math.round(points),
            reason: reason || 'اجتياز التحدي بنجاح',
          },
        });
      } else {
        soundEffects.playFail();
      }
      dispatch({ type: 'NEXT_TURN' });
    },
    [state.activePlayerIndex]
  );

  const resolveLucky = useCallback(
    (buff) => {
      soundEffects.playLucky();
      dispatch({ type: 'CLOSE_MODAL' });

      if (buff.type === 'ADVANCE') {
        advanceStepsDirectly(buff.tiles);
      } else if (buff.type === 'DIRECT_POINTS') {
        dispatch({
          type: 'ADD_POINTS',
          payload: {
            playerIndex: state.activePlayerIndex,
            points: buff.points,
            reason: buff.name,
          },
        });
        dispatch({ type: 'NEXT_TURN' });
      } else {
        dispatch({
          type: 'APPLY_BUFF',
          payload: {
            playerIndex: state.activePlayerIndex,
            buff,
          },
        });
        dispatch({ type: 'NEXT_TURN' });
      }
    },
    [state.activePlayerIndex, advanceStepsDirectly]
  );

  const resolveTrap = useCallback(
    (trap) => {
      const activePlayer = state.players[state.activePlayerIndex];

      // Check for Shield
      if (activePlayer.inventory.shields > 0) {
        soundEffects.playShieldBlock();
        dispatch({
          type: 'CONSUME_BUFF',
          payload: { playerIndex: state.activePlayerIndex, buffType: 'SHIELD' },
        });
        dispatch({
          type: 'SET_NOTIFICATION',
          payload: {
            text: `🛡️ درع السوسانو حمى ${activePlayer.name} من الفخ (${trap.name})!`,
            type: 'success',
          },
        });
        dispatch({ type: 'NEXT_TURN' });
        return { blockedByShield: true };
      }

      soundEffects.playTrap();
      dispatch({ type: 'CLOSE_MODAL' });

      if (trap.type === 'DEDUCT_POINTS') {
        dispatch({
          type: 'DEDUCT_POINTS',
          payload: {
            playerIndex: state.activePlayerIndex,
            points: trap.points,
            reason: trap.name,
          },
        });
        dispatch({ type: 'NEXT_TURN' });
      } else if (trap.type === 'MOVE_BACK') {
        moveBackStepsDirectly(trap.tiles);
      } else if (trap.type === 'FREEZE') {
        dispatch({
          type: 'SET_DEBUFF',
          payload: {
            playerIndex: state.activePlayerIndex,
            debuffType: 'isFrozen',
            value: true,
          },
        });
        dispatch({ type: 'NEXT_TURN' });
      } else if (trap.type === 'HALF_TIME') {
        dispatch({
          type: 'SET_DEBUFF',
          payload: {
            playerIndex: state.activePlayerIndex,
            debuffType: 'halfTime',
            value: true,
          },
        });
        dispatch({ type: 'NEXT_TURN' });
      }

      return { blockedByShield: false };
    },
    [state.players, state.activePlayerIndex, moveBackStepsDirectly]
  );

  const deflectQuestion = useCallback(
    (targetPlayerIdx) => {
      dispatch({
        type: 'CONSUME_BUFF',
        payload: {
          playerIndex: state.activePlayerIndex,
          buffType: 'DEFLECTION',
        },
      });
    },
    [state.activePlayerIndex]
  );

  const resetGame = useCallback(() => {
    dispatch({ type: 'RESET_GAME' });
  }, []);

  const value = {
    state,
    dispatch,
    startGame,
    rollDice,
    resolveQuiz,
    resolveChallenge,
    resolveLucky,
    resolveTrap,
    deflectQuestion,
    resetGame,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
