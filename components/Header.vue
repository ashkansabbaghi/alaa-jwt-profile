<template>
    <header>
        <ul>
            <li><nuxt-link to="/">home</nuxt-link></li>
            <li><nuxt-link to="/login">login</nuxt-link></li>
            <li><nuxt-link to="/profile/ashkan">profile</nuxt-link></li>
        </ul>
    </header>
</template>

<script setup>
defineOptions({
    name : "Header"
})

</script>

