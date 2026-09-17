<script lang="ts">
	import PlayArrowRoundedIcon from '@iconify-svelte/material-symbols/play-arrow-rounded';
</script>

<div class="bg-base-200">
	<div class="hero min-h-96">
		<div class="hero-content text-center">
			<div class="max-w-md">
				<h1 class="text-5xl font-bold animate-slide-up">Dividi2</h1>
				<p class="prose prose-lg py-8 prose-gray animate-slide-up [animation-delay:200ms]">
					Desafía tu cálculo mental. Elige el divisor correcto del número mostrado en el menor
					tiempo posible para alcanzar la mayor puntuación.
				</p>
				<div class="group relative inline-block">
					<div
						class="aura absolute inset-0 -z-10 bg-accent text-neutral opacity-0
                   transition-opacity
                   group-hover:opacity-100"
					></div>

					<a class="btn btn-lg btn-primary animate-slide-up [animation-delay:400ms]" href="/play">
						<PlayArrowRoundedIcon height="1.5em" />
						Juega ahora
					</a>
				</div>
			</div>
		</div>
	</div>
	<div class="flex w-full flex-col">
		<div class="divider divider-warning px-5"></div>
	</div>
	<div class="hero min-h-96">
		<div class="hero-content text-center">
			<div class="max-w-md">
				<h1 class="text-3xl font-bold">Cómo jugar</h1>
				<p class="prose py-8 prose-gray">
					Desafía tu cálculo mental. Elige el divisor correcto del número mostrado en el menor
					tiempo posible para alcanzar la mayor puntuación.
				</p>
			</div>
		</div>
	</div>
</div>
