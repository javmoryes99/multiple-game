<script lang="ts">
    import { Tween } from 'svelte/motion';
    import { getNumberAndDivisors } from '$lib/functions/numberCalculation';

    const TOTAL_QUESTIONS = 5;
    const ROUND_DURATION = 7000; // ms
    const FAST_ANSWER_THRESHOLD = 2000; // ms

    type Result = 'correct' | 'incorrect' | 'timeout' | null;

    let questionIndex = $state(0);
    let current = $state(getNumberAndDivisors());
    let totalScore = $state(0);
    let answered = $state(false);
    let result = $state<Result>(null);
    let pointsEarned = $state(0);
    let finished = $state(false);

    const progress = new Tween(100, { duration: ROUND_DURATION, easing: (t) => t });

    function startRound() {
        answered = false;
        result = null;
        pointsEarned = 0;
        progress.set(100, { duration: 0 });
        progress.set(0);
    }

    startRound();

    $effect(() => {
        if (!answered && !finished && progress.current <= 0) {
            handleTimeout();
        }
    });

    function elapsedMs() {
        return ROUND_DURATION - (progress.current / 100) * ROUND_DURATION;
    }

    function calculatePoints(elapsed: number) {
        if (elapsed <= FAST_ANSWER_THRESHOLD) return 1000;
        if (elapsed >= ROUND_DURATION) return 0;
        const remainingWindow = ROUND_DURATION - FAST_ANSWER_THRESHOLD;
        const factor = 1 - (elapsed - FAST_ANSWER_THRESHOLD) / remainingWindow;
        return Math.round(Math.max(0, factor) * 1000);
    }

    function handleTimeout() {
        answered = true;
        result = 'timeout';
        pointsEarned = 0;
    }

    function handleAnswer(choice: number) {
        if (answered || finished) return;
        const elapsed = elapsedMs();
        answered = true;
        progress.set(progress.current, { duration: 0 }); // congela la barra

        if (current.number % choice === 0) {
            result = 'correct';
            pointsEarned = calculatePoints(elapsed);
        } else {
            result = 'incorrect';
            pointsEarned = 0;
        }
        totalScore += pointsEarned;
    }

    function nextQuestion() {
        if (questionIndex + 1 >= TOTAL_QUESTIONS) {
            finished = true;
            return;
        }
        questionIndex += 1;
        current = getNumberAndDivisors();
        startRound();
    }

    function restart() {
        questionIndex = 0;
        totalScore = 0;
        finished = false;
        current = getNumberAndDivisors();
        startRound();
    }

    const statusClass = $derived(
        progress.current <= 25
            ? 'progress-error'
            : progress.current <= 50
                ? 'progress-warning'
                : 'progress-success'
    );
</script>

<div class="hero min-h-screen bg-base-200">
    <div class="hero-content text-center">
        <div class="max-w-md">
            {#if !finished}
                <p class="text-sm opacity-70 mb-2">Pregunta {questionIndex + 1} de {TOTAL_QUESTIONS}</p>
                <h1 class="text-5xl font-bold">{current.number}</h1>
                <p class="py-6">¿Cuál es el divisor correcto del número?</p>

                <ul class="menu menu-vertical rounded-box bg-base-200 lg:menu-horizontal">
                    {#each current.choices as choice}
                        <li>
                            
                            <a class:pointer-events-none={answered}
                                class:opacity-50={answered}
                                onclick={() => handleAnswer(choice)}
                            >
                                {choice}
                            </a>
                        </li>
                    {/each}
                </ul>

                <div>
                    <progress class="progress w-56 {statusClass}" value={progress.current} max="100"></progress>
                </div>

                {#if answered}
                    <div class="mt-4">
                        {#if result === 'correct'}
                            <div class="alert alert-success">¡Correcto!</div>
                        {:else if result === 'incorrect'}
                            <div class="alert alert-error">Incorrecto!</div>
                        {:else if result === 'timeout'}
                            <div class="alert alert-warning">¡Se acabó el tiempo!</div>
                        {/if}

                        <button class="btn btn-primary mt-4" onclick={nextQuestion}>
                            {questionIndex + 1 >= TOTAL_QUESTIONS ? 'Ver resultado' : 'Siguiente pregunta'}
                        </button>
                    </div>
                {/if}

            {:else}
                <h1 class="text-4xl font-bold">¡Juego terminado!</h1>
                <p class="py-6 text-2xl">Tu puntuación final: {totalScore} / 5000</p>
                <button class="btn btn-primary" onclick={restart}>Jugar de nuevo</button>
            {/if}
        </div>
    </div>
</div>