<template>
<main class="bg-slate-800 text-slate-200 p-5 rounded-xl">
    <img :src="image" alt="">
    <p class="font-bold text-xl">{{ name }}</p>
    <p class="text-justify">{{ description }}</p>
</main>
</template>

<script>
export default {
    props: {
        image: String,
        name: String,
        description: String
    }
}
</script>