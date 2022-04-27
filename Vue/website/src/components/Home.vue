<template>

  <div id="app">
    <br><br>
    <form v-on:submit="updateName">
      <input id="input_name" v-model="text" autofocus autocomplete="off" placeholder="이름을 입력해주세요" v-on:keyup.enter="updateName">
      <button id="name_submit" type="submit" >Submit</button>
    </form>

    <br><br><br><br>
    
    <!-- 리스트를 그리는 쪽은 Todo.vue이기 때문에 props로 todos라는 이름으로 todos state를 넘겨줌 -->
    <section class="todoapp">
      <Header @insertTodo="insertTodo" />   <!-- @insertTodo 라는 custom event 등록 -->
      <Todo :todos="todos" 
            @removeTodo="removeTodo" 
            @updateDone="updateDone" 
            @updateTodo="updateTodo" />    <!-- 해당 이벤트를 이용하여 선택된 id 값만 넘겨주면 된다. Todo.vue에서 사용될 함수이기 때문에 이벤트를 등록해준다.-->
      <!-- update에 대한 모든 정보는 Todo.vue에서 관리되어진다. 다른 컴포넌트에서는 Edit 상태에 대한 정보가 전혀 궁금하지 않기 때문이다. -->
      <Footer/>
    </section>

  </div>
</template>

<script>
import "@/assets/main.css";

import Header from '@/components/Header';
import Todo from '@/components/Todo';
import Footer from '@/components/Footer';

export default {
  name: 'Home',
  components: {
    Header, Todo, Footer,
  },

    data() {      //state 준비
      return {
        
        todos: [{
          id: new Date(),     //클라이언트에서 고유한 값을 나타낼 수 있는 수단으로 Date를 이용함
          text: "Vue 공부하기",   //To Do의 내용
          isDone: false    //일이 마무리 되었는지 판단 할 수 있는 값
        },
        {
          id: new Date() + 1,
          text: "To Do List 만들기!!",
          isDone: false
        },
        {
          id: new Date().getTime(),   //고유한 값을 주기 위해 Date를 이용
          text: 'Clone Coding',
          isDone: false
        },
      ]
    };
  },

  methods: {
    updateName(event) {

        //input창에 이름 입력 시, 팝업으로 이름을 띄워줌
        alert(this.text+"님 환영합니다!!");
        localStorage.setItem(this.text, this.text); 
    },

    // header에 있는 input의 value를 전달받음 > 부모와 자식사이에 이벤트를 이용하여 데이터를 주고 받을 수 있어야한다.
    // 부모는 on을 이용하여 event를 등록하고 자식은 emit을 이용하여 해당 이벤트를 발생시킨다.
    insertTodo (text) {
      this.todos = [
        ...this.todos,    //기존의 배열에 새로운 todo를 추가한다.
        {
          // id, isDone의 경우 같은 포맷을 유지하기 때문에 새로 받지 않는다.
          id: new Date().getTime(), 
          text,     //유동적인 text 값만 받는다
          isDone: false
        }
      ];
    },

    //remove 함수는 매우 심플하다. 선택된 id를 받아 그 id와 같지 않은 todo들만 Filter 해주면 된다.
    removeTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id);
    },

    //선택된 id를 받아 상태를 업데이트하는 함수
    updateDone(id) {
      const todos = [...this.todos];
      const todo = todos.find(todo => todo.id === id);    //find() 메소드는 주어진 판별 함수를 만족하는 첫 번째 요소의 값을 반환한다. 그런 요소가 없다면 undefined를 반환한다.

      if (todo) {
        todo.isDone = !todo.isDone;
        this.todos = todos;
      }
    },

    //변화되는 text와 id를 받아 text를 업데이트하는 함수
    //id와 text를 받아 해당 todo를 찾아 text를 업데이트 함
    updateTodo({ id, text }) {
      const todos = [...this.todos];
      const todo = todos.find(todo => todo.id === id);

      if (todo) {
        todo.text = text;
        this.todos = todos;
      }
    },
  },

};
</script>

<style>
#name_submit {
  color: black;
  margin-left: 10px;
}

</style>