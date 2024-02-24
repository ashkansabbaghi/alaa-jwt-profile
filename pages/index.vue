<template>
    <div>
        <div class="min-h-[calc(100vh-200px)] flex flex-col justify-center items-center">
            <img src="/alaa-logo.avif" alt="Logo"
                class="object-cover w-40 h-40 mb-8 rounded-full">
            <h1 class="text-4xl font-bold mb-4">welcome AlaaTV</h1>
            <p class="text-lg mb-8 px-4 md:px-0"> I`m <strong>ashkan sabbaghi</strong>  front-end developer (vue.js) </p>
            <div class="flex justify-center items-center space-x-4">
                <nuxt-link class="bg-cyan-500 hover:bg-cyan-600  text-white px-4 py-2 rounded-md" to="/login">START</nuxt-link>
            </div>
        </div>

        {{ posts }}
    </div>
</template>

<script setup>

definePageMeta({
    middleware : ['auth']
})

</script>
