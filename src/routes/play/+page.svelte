<script lang="ts">
    import CheckCircleOutlineIcon from '@iconify-svelte/material-symbols/check-circle-outline';
    import ErrorOutlineRoundedIcon from '@iconify-svelte/material-symbols/error-outline-rounded';
    import XCircleOutlineIcon from '@iconify-svelte/material-symbols/x-circle-outline';
    import { onDestroy } from 'svelte';
    import { GuesserGame } from '$lib/functions/guesserGame';

    const game = new GuesserGame();
    onDestroy(() => game.destroy());

    const {
        questionIndex,
        current,
        totalScore,
        answered,
        result,
        progress,
        statusClass,
        finished,
        totalQuestions
    } = game;
</script>

<div class="hero min-h-screen bg-linear-to-br from-base-200 via-base-100 to-base-300">
    <div class="hero-content text-center w-full">
        <div class="w-full max-w-lg">
            {#if !$finished}
                <div class="card bg-base-100 shadow-2xl border border-base-300/50 backdrop-blur-sm">
                    <div class="card-body items-center">

                        <div class="w-full mb-2">
                            <div class="badge badge-primary badge-lg font-semibold">
                                Pregunta {$questionIndex + 1} / {totalQuestions}
                            </div>
                        </div>

                        <progress
                            class="progress {$statusClass} w-full h-3 rounded-full"
                            value={$progress}
                            max="100"
                        ></progress>

                        {#if $answered}
                            <div class="w-full mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                {#if $result === 'correct'}
                                    <div role="alert" class="alert alert-success shadow-lg justify-center">
                                        <CheckCircleOutlineIcon class="h-6 w-6" />
                                        <span class="font-semibold text-lg">¡Correcto!</span>
                                    </div>
                                {:else if $result === 'incorrect'}
                                    <div role="alert" class="alert alert-error shadow-lg justify-center">
                                        <XCircleOutlineIcon class="h-6 w-6" />
                                        <span class="font-semibold text-lg">Incorrecto</span>
                                    </div>
                                {:else if $result === 'timeout'}
                                    <div role="alert" class="alert alert-warning shadow-lg justify-center">
                                        <ErrorOutlineRoundedIcon class="h-6 w-6" />
                                        <span class="font-semibold text-lg">¡Se acabó el tiempo!</span>
                                    </div>
                                {/if}
                            </div>
                        {/if}

                        <div class="my-8">
                            <h1 class="text-7xl font-black text-primary drop-shadow-sm">
                                {$current.number}
                            </h1>
                            <p class="py-4 text-base-content/70 text-lg">
                                ¿Cuál es el divisor correcto del número?
                            </p>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
                            {#each $current.choices as choice}
                                <button
                                    type="button"
                                    class="btn btn-lg h-16 text-xl font-bold shadow-md transition-all duration-200
                                           {$answered
                                               ? ($current.isCorrect(choice) && $result !== 'correct'
                                                   ? 'btn-success text-success-content opacity-100'
                                                   : 'btn-disabled opacity-40')
                                               : 'btn-outline btn-primary hover:scale-105 hover:shadow-lg'}"
                                    disabled={$answered}
                                    onclick={() => game.handleAnswer(choice)}
                                >
                                    {choice}
                                </button>
                            {/each}
                        </div>

                        {#if $answered}
                            <button class="btn btn-primary btn-block mt-6 shadow-md" onclick={() => game.nextQuestion()}>
                                {$questionIndex + 1 >= totalQuestions ? 'Ver resultado' : 'Siguiente pregunta'}
                            </button>
                        {/if}

                    </div>
                </div>

            {:else}
                <div class="card bg-base-100 shadow-2xl border border-base-300/50">
                    <div class="card-body items-center py-12">
                        <div class="text-6xl mb-4">🎉</div>
                        <h1 class="text-4xl font-black text-primary">
                            ¡Juego terminado!
                        </h1>
                        <div class="stats shadow mt-6 bg-base-200">
                            <div class="stat place-items-center">
                                <div class="stat-title">Puntuación final</div>
                                <div class="stat-value text-primary">{$totalScore}</div>
                                <div class="stat-desc">de 5000 puntos posibles</div>
                            </div>
                        </div>
                        <button class="btn btn-primary btn-wide mt-6 shadow-md" onclick={() => game.restart()}>
                            Jugar de nuevo
                        </button>
                    </div>
                </div>
            {/if}
        </div>
    </div>
</div>