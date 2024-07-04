<template>
    <main class="flex flex-col items-center bg-home_background bg-cover">
        <div class="px-6 pt-10 lg:px-8 bg-gray-800 bg-opacity-90 w-full">
            <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                <div class="text-center">
                    <h1 class="text-5xl font-extrabold font-font_tittle tracking-tight text-white sm:text-7xl drop-shadow-lg">
                        Disfruta jugando sin límites
                    </h1>
                    <p class="mt-6 text-lg leading-8 text-gray-300 opacity-90">
                        ¡Podrás seleccionar al personaje que gustes para iniciar la partida!
                    </p>
                    <div class="mt-10 flex items-center justify-center gap-x-6">
                        <RouterLink to="/game">
                            <button class="px-6 py-3 bg-blue-600 rounded-full text-white font-bold shadow-lg hover:bg-blue-800 transition transform hover:-translate-y-1 hover:scale-110 duration-300">
                                JUGAR
                            </button>
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-gray-800 w-full pb-24 py-10 flex items-center justify-center">
            <div class="mx-auto max-w-7xl px-6 lg:px-8">
                <dl class="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
                    <div class="mx-auto flex max-w-xs flex-col gap-y-4">
                        <dd class="order-first text-4xl font-semibold tracking-tight text-white sm:text-5xl drop-shadow-lg">44 million</dd>
                        <dt class="text-base leading-7 text-gray-300">Transacciones cada 24 horas</dt>
                    </div>
                    <div class="mx-auto flex max-w-xs flex-col gap-y-4">
                        <dd class="order-first text-4xl font-semibold tracking-tight text-white sm:text-5xl drop-shadow-lg">$119,000</dd>
                        <dt class="text-base leading-7 text-gray-300">Inversión</dt>
                    </div>
                    <div class="mx-auto flex max-w-xs flex-col gap-y-4">
                        <dd class="order-first text-4xl font-semibold tracking-tight text-white sm:text-5xl drop-shadow-lg">46,000</dd>
                        <dt class="text-base leading-7 text-gray-300">Nuevos usuarios</dt>
                    </div>
                </dl>
            </div>
        </div>
    </main>
</template>