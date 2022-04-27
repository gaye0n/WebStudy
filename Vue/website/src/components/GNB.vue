<template>
    <div class="container">
        <router-link to="/">Home</router-link>
        <router-link to="/login">{{ login }}</router-link>
        <router-link to="/register"> {{ register }} </router-link>
    </div>
</template>

<script>
    export default {
        data () {
          return {
            login: "로그인",
            register: "회원가입",
        }
    }
}
</script>

<!-- 여기서만 Style 적용 > scoped -->
<style scoped>
.container {
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding: 20px;
    background-color: lightgray;
}
</style>
