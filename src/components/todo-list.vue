<template>
  <div>
    <todo v-on:delete-todo="deleteTodo" v-for="todo in todos" :todo.sync="todo" :key="todo.taskName"></todo>
    <create-todo v-on:create-todo="createTodo"></create-todo>
  </div>
</template>

<script type = "text/javascript" >
// import sweetalert from 'sweetalert';
import Todo from './todo.vue';
import CreateTodo from './createTodo.vue';

export default {
  props: ['todos'],
  components: {
    Todo,
    CreateTodo,
  },
  methods: {
    createTodo(newTodo) {
        this.todos.push(newTodo);
        // sweetalert('Success!', 'To-Do created!', 'success')
        this.saveTodos();
    },
    deleteTodo(todo) {
        const todoIndex = this.todos.indexOf(todo);
        this.todos.splice(todoIndex, 1);
        console.log("todos: ", this.todos);
        this.saveTodos();
    },
    saveTodos() {
        const parsed = JSON.stringify(this.todos);
        localStorage.setItem('todos', parsed);
    }
  },
};
</script>

<style scoped>
p.tasks {
  text-align: center;
}
</style>