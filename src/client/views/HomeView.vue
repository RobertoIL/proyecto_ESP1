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
    </main>
</template>