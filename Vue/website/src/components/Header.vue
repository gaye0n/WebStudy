<template>
  <header class="header">
    <h1>todos</h1>
    
    <!-- v-model을 사용하여 양방향 데이터바인딩을 이용한다. -->
    <!-- v-model을 이용하면 input의 value가 바뀔때 text state를 변경하게 된다.
          따로 input에 event를 걸어 state를 업데이트하지 않아도 되기 때문에 편하게 사용이 가능하다. -->
    <input 
      class="new-todo" 
      v-model="text" 
      autofocus autocomplete="off" 
      placeholder="What needs to be done?"
      @keypress="handleTodo" />
  </header>
</template>

<script>
export default {
  data() {
    return {
      text: "",
    };
  },

  methods: {
    handleTodo({ keyCode }) {
      const { text } = this;

      if (keyCode === 13 && text !== "") {
        this.$emit("insertTodo", text);
        this.text = "";
      }
    }
  },
};
</script>

<style>
h1 {
  position: absolute;
  top: -155px;
  width: 100%;
  font-size: 100px;
  font-weight: 100;
  text-align: center;
  color: rgba(175, 47, 47, 0.15);
  -webkit-text-rendering: optimizeLegibility;
  -moz-text-rendering: optimizeLegibility;
  text-rendering: optimizeLegibility;
}
</style>