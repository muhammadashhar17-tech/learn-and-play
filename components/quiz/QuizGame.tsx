"use client";

import { useEffect, useReducer, useRef } from "react";
import type { CategoryId, Difficulty } from "@/data/quiz";
import { buildRound, DIFFICULTY_SETTINGS, pointsFor, starsFor, type RoundQuestion } from "@/lib/quiz";
import { newId, saveQuiz, type QuizRecord } from "@/lib/progress";
import { playSound } from "@/lib/sound";
import { QuizSetup } from "./QuizSetup";
import { QuizPlay } from "./QuizPlay";
import { QuizResults } from "./QuizResults";

export interface AnswerRecord {
  /** Option index picked, or null if time ran out. */
  picked: number | null;
  correct: boolean;
  points: number;
}

type State =
  | { phase: "setup"; category: CategoryId | null; difficulty: Difficulty }
  | {
      phase: "playing";
      category: CategoryId;
      difficulty: Difficulty;
      round: RoundQuestion[];
      index: number;
      answers: AnswerRecord[];
      secondsLeft: number;
      revealed: boolean;
    }
  | {
      phase: "results";
      category: CategoryId;
      difficulty: Difficulty;
      round: RoundQuestion[];
      answers: AnswerRecord[];
      record: QuizRecord;
    };

type Action =
  | { type: "select"; category?: CategoryId; difficulty?: Difficulty }
  | { type: "start"; round: RoundQuestion[] }
  | { type: "tick" }
  | { type: "answer"; picked: number }
  | { type: "next" }
  | { type: "finish"; record: QuizRecord }
  | { type: "restart"; round: RoundQuestion[] }
  | { type: "setup" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "select":
      if (state.phase !== "setup") return state;
      return {
        ...state,
        category: action.category ?? state.category,
        difficulty: action.difficulty ?? state.difficulty,
      };
    case "start":
    case "restart":
      if (state.phase === "playing" || !state.category) return state;
      return {
        phase: "playing",
        category: state.category,
        difficulty: state.difficulty,
        round: action.round,
        index: 0,
        answers: [],
        secondsLeft: DIFFICULTY_SETTINGS[state.difficulty].seconds,
        revealed: false,
      };
    case "tick": {
      if (state.phase !== "playing" || state.revealed) return state;
      const secondsLeft = state.secondsLeft - 1;
      if (secondsLeft > 0) return { ...state, secondsLeft };
      // Time is up: record an empty answer and reveal the correct one.
      return {
        ...state,
        secondsLeft: 0,
        revealed: true,
        answers: [...state.answers, { picked: null, correct: false, points: 0 }],
      };
    }
    case "answer": {
      if (state.phase !== "playing" || state.revealed) return state;
      const q = state.round[state.index];
      const correct = action.picked === q.answer;
      const points = correct ? pointsFor(state.difficulty, state.secondsLeft) : 0;
      return {
        ...state,
        revealed: true,
        answers: [...state.answers, { picked: action.picked, correct, points }],
      };
    }
    case "next":
      if (state.phase !== "playing" || !state.revealed) return state;
      return {
        ...state,
        index: state.index + 1,
        revealed: false,
        secondsLeft: DIFFICULTY_SETTINGS[state.difficulty].seconds,
      };
    case "finish":
      if (state.phase !== "playing") return state;
      return {
        phase: "results",
        category: state.category,
        difficulty: state.difficulty,
        round: state.round,
        answers: state.answers,
        record: action.record,
      };
    case "setup":
      return { phase: "setup", category: state.category, difficulty: state.difficulty };
  }
}

export function QuizGame() {
  const [state, dispatch] = useReducer(reducer, { phase: "setup", category: null, difficulty: "easy" });

  const ticking = state.phase === "playing" && !state.revealed;
  useEffect(() => {
    if (!ticking) return;
    const id = window.setInterval(() => dispatch({ type: "tick" }), 1000);
    return () => window.clearInterval(id);
  }, [ticking]);

  // Sound cues for the timer (last 5 seconds, and when time runs out).
  const secondsLeft = state.phase === "playing" ? state.secondsLeft : null;
  useEffect(() => {
    if (secondsLeft === null) return;
    if (secondsLeft === 0) playSound("wrong");
    else if (secondsLeft <= 5) playSound("tick");
  }, [secondsLeft]);

  // Bring the game area into view whenever the screen changes (not on first load).
  const topRef = useRef<HTMLDivElement>(null);
  const firstPhase = useRef(true);
  useEffect(() => {
    if (firstPhase.current) {
      firstPhase.current = false;
      return;
    }
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [state.phase]);

  return (
    <div ref={topRef} className="scroll-mt-20">
      {renderPhase()}
    </div>
  );

  function renderPhase() {
    if (state.phase === "setup") {
      return (
        <QuizSetup
          category={state.category}
          difficulty={state.difficulty}
          onSelect={(sel) => dispatch({ type: "select", ...sel })}
          onStart={() => {
            if (!state.category) return;
            playSound("click");
            dispatch({ type: "start", round: buildRound(state.category, state.difficulty) });
          }}
        />
      );
    }

    if (state.phase === "playing") {
      const isLast = state.index === state.round.length - 1;
      return (
        <QuizPlay
          category={state.category}
          difficulty={state.difficulty}
          question={state.round[state.index]}
          index={state.index}
          total={state.round.length}
          secondsLeft={state.secondsLeft}
          revealed={state.revealed}
          answer={state.revealed ? state.answers[state.index] : undefined}
          score={state.answers.reduce((n, a) => n + a.points, 0)}
          isLast={isLast}
          onAnswer={(picked) => {
            playSound(picked === state.round[state.index].answer ? "correct" : "wrong");
            dispatch({ type: "answer", picked });
          }}
          onNext={() => {
            if (!isLast) {
              dispatch({ type: "next" });
              return;
            }
            const correct = state.answers.filter((a) => a.correct).length;
            const record: QuizRecord = {
              id: newId(),
              category: state.category,
              difficulty: state.difficulty,
              correct,
              total: state.round.length,
              points: state.answers.reduce((n, a) => n + a.points, 0),
              stars: starsFor(correct, state.round.length),
              date: Date.now(),
            };
            saveQuiz(record);
            playSound(record.stars >= 2 ? "win" : "click");
            dispatch({ type: "finish", record });
          }}
          onQuit={() => dispatch({ type: "setup" })}
        />
      );
    }

    return (
      <QuizResults
        record={state.record}
        round={state.round}
        answers={state.answers}
        onPlayAgain={() => dispatch({ type: "restart", round: buildRound(state.category, state.difficulty) })}
        onChangeCategory={() => dispatch({ type: "setup" })}
      />
    );
  }
}
