<template>
    <div class="container-page">
        <Header></Header>
        <Main :withoutLeft="false" :withoutRight="false"></Main>
    </div>
</template>

<script>
import Header from "./Header.vue";
import Main from "./Main.vue";
export default {
    name: "App",
    components: {
        Main,
        Header,
    },
};
</script>
