import { writable, derived, get, type Readable } from 'svelte/store';
import { tweened } from 'svelte/motion';
import { getNumberAndDivisors, NumberAndDivisors } from '$lib/functions/numberCalculation';

const TOTAL_QUESTIONS = 5;
const ROUND_DURATION = 10000;
const FAST_ANSWER_THRESHOLD = 2000;

type Result = 'correct' | 'incorrect' | 'timeout' | null;

export class GuesserGame {
    readonly totalQuestions = TOTAL_QUESTIONS;

    questionIndex = writable(0);
    current = writable<NumberAndDivisors>(getNumberAndDivisors());
    totalScore = writable(0);
    answered = writable(false);
    result = writable<Result>(null);
    pointsEarned = writable(0);
    finished = writable(false);

    progress = tweened(100, { duration: ROUND_DURATION, easing: (t) => t });

    statusClass: Readable<string>;

    private unsubscribeProgress: () => void;

    constructor() {
        this.statusClass = derived(this.progress, ($p) =>
            $p <= 25 ? 'progress-error' : $p <= 50 ? 'progress-warning' : 'progress-success'
        );

        this.startRound();

        this.unsubscribeProgress = this.progress.subscribe((value) => {
            if (!get(this.answered) && !get(this.finished) && value <= 0) {
                this.handleTimeout();
            }
        });
    }

    destroy() {
        this.unsubscribeProgress();
    }

    private startRound() {
        this.answered.set(false);
        this.result.set(null);
        this.pointsEarned.set(0);
        this.progress.set(100, { duration: 0 });
        this.progress.set(0);
    }

    private elapsedMs() {
        return ROUND_DURATION - (get(this.progress) / 100) * ROUND_DURATION;
    }

    private calculatePoints(elapsed: number) {
        if (elapsed <= FAST_ANSWER_THRESHOLD) return 1000;
        if (elapsed >= ROUND_DURATION) return 0;
        const remainingWindow = ROUND_DURATION - FAST_ANSWER_THRESHOLD;
        const factor = 1 - (elapsed - FAST_ANSWER_THRESHOLD) / remainingWindow;
        return Math.round(Math.max(0, factor) * 1000);
    }

    private handleTimeout() {
        this.answered.set(true);
        this.result.set('timeout');
        this.pointsEarned.set(0);
    }

    handleAnswer(choice: number) {
        if (get(this.answered) || get(this.finished)) return;
        const elapsed = this.elapsedMs();
        this.answered.set(true);
        this.progress.set(get(this.progress), { duration: 0 }); // congela la barra

        const current = get(this.current);
        let points = 0;
        let result: Result;

        if (current.isCorrect(choice)) {
            result = 'correct';
            points = this.calculatePoints(elapsed);
        } else {
            result = 'incorrect';
        }

        this.result.set(result);
        this.pointsEarned.set(points);
        this.totalScore.update((s) => s + points);
    }

    nextQuestion() {
        const index = get(this.questionIndex);
        if (index + 1 >= TOTAL_QUESTIONS) {
            this.finished.set(true);
            return;
        }
        this.questionIndex.set(index + 1);
        this.current.set(getNumberAndDivisors());
        this.startRound();
    }

    restart() {
        this.questionIndex.set(0);
        this.totalScore.set(0);
        this.finished.set(false);
        this.current.set(getNumberAndDivisors());
        this.startRound();
    }
}