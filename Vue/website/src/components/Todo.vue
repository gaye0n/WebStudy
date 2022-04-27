<template>
  <section class="main">
    <ul class="todo-list">
      <li 
        :class="{ todo: true, completed: isDone, editing: edit.id === id }" 
        v-for="({ id, text, isDone }) in todos" 
        :key="id">
        <!-- edit state에 있는 id와 해당 todo의 id가 같을때만 input으로 변경된다. -->

        <div class="view">
          <input class="toggle" type="checkbox" :checked="isDone" @click="handleDone(id)" />    <!-- 실제 Checkbox가 선택되었을때 handleDone을 실행시킴 -->
          <label @dblclick="handleEdit({ text, id })">{{ text }}</label>
          <button class="destroy" @click="handleRemove(id)"></button>   <!-- x 버튼이 눌렸을때 눌린 todo의 id를 handleRemove에게 넘겨 줄 수 있도록 click event를 걸어준다. -->
        </div>
        <input class="edit" type="text" v-model="edit.text" @keypress="handleUpdate" /> 
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  //Home.vue에서 넘겨준 값을 props로 받을 수 있도록 함
  props: {
    todos: { type: Array, default: () => [] }
  },

  data () {
    return {
      edit: {   //edit 데이터를 관리한다. 
      //수정하고 싶은 Todo가 선택되면 이 edit state에 선택된 todo의 id와 text가 채워진다.
      //text를 따로 관리하는 이유는 기존 데이터와 독립되게 만들기 위해서이다. 수정 취소시 원본 데이터는 손상되면 안되기 때문이다.
          text: "", 
          id: -1
      }
    };
  },

  methods: {
    //클릭된 id 값을 받아 emit 해줄 handleRemove 함수 추가
    handleRemove(id) {
      this.$emit("removeTodo", id);
    },

    //id를 넘겨받아 이벤트를 실행기켜줄 handleDone 함수 추가
    handleDone(id) {
      this.$emit("updateDone", id);
    },

    //더블 클릭시 선택된 Todo의 정보를 받아 edit state를 채우는 함수
    handleEdit({ text, id }) {
      this.edit = {
        text,
        id
      };
    },

    //input에 수정될 값을 입력하고 Enter를 눌렀을때 해당 Todo의 내용이 변경되도록 함
    handleUpdate({ keyCode }) {
      if (keyCode === 13) {
        this.$emit("updateTodo", this.edit);
        this.edit = { //추가된 후 edit state를 리셋함 
          text: "",
          id: -1
        }
      }
    },
    
  },
};
</script>

<style>
.main {
  position: relative;
  z-index: 2;
  border-top: 1px solid #e6e6e6;
}
.toggle-all {
  width: 1px;
  height: 1px;
  border: none; /* Mobile Safari */
  opacity: 0;
  position: absolute;
  right: 100%;
  bottom: 100%;
}
.toggle-all + label {
  width: 60px;
  height: 34px;
  font-size: 0;
  position: absolute;
  top: -52px;
  left: -13px;
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}
.toggle-all + label:before {
  content: "❯";
  font-size: 22px;
  color: #e6e6e6;
  padding: 10px 27px 10px 27px;
}
.toggle-all:checked + label:before {
  color: #737373;
}
.todo-list {
  margin: 0;
  padding: 0;
  list-style: none;
}
.todo-list li {
  position: relative;
  font-size: 24px;
  border-bottom: 1px solid #ededed;
}
.todo-list li:last-child {
  border-bottom: none;
}
.todo-list li.editing {
  border-bottom: none;
  padding: 0;
}
.todo-list li.editing .edit {
  display: block;
  width: calc(100% - 43px);
  padding: 12px 16px;
  margin: 0 0 0 43px;
}
.todo-list li.editing .view {
  display: none;
}
.todo-list li .toggle {
  text-align: center;
  width: 40px;
  /* auto, since non-WebKit browsers doesn't support input styling */
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  border: none; /* Mobile Safari */
  -webkit-appearance: none;
  appearance: none;
}
.todo-list li .toggle {
  opacity: 0;
}
.todo-list li .toggle + label {
  /*
		Firefox requires `#` to be escaped - https://bugzilla.mozilla.org/show_bug.cgi?id=922433
		IE and Edge requires *everything* to be escaped to render, so we do that instead of just the `#` - https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/7157459/
	*/
  background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center left;
}
.todo-list li .toggle:checked + label {
  background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E");
}
.todo-list li label {
  word-break: break-all;
  padding: 15px 15px 15px 60px;
  display: block;
  line-height: 1.2;
  transition: color 0.4s;
}
.todo-list li.completed label {
  color: #d9d9d9;
  text-decoration: line-through;
}
.todo-list li .destroy {
  display: none;
  position: absolute;
  top: 0;
  right: 10px;
  bottom: 0;
  width: 40px;
  height: 40px;
  margin: auto 0;
  font-size: 30px;
  color: #cc9a9a;
  margin-bottom: 11px;
  transition: color 0.2s ease-out;
}
.todo-list li .destroy:hover {
  color: #af5b5e;
}
.todo-list li .destroy:after {
  content: "×";
}
.todo-list li:hover .destroy {
  display: block;
}
.todo-list li .edit {
  display: none;
}
.todo-list li.editing:last-child {
  margin-bottom: -1px;
}
</style>