<template>
  <div id="app">
    <h1>{{appName}}</h1>
    <router-view v-bind:todos="todos"/>
  </div>
</template>

<script>

import TaskList from './components/task-list.vue';
import TodoList from './components/todo-list.vue';

export default {
  name: 'App',
  components: {
    TaskList,
    TodoList,
  },
  data() {
    return {
      appName: 'Simple ToDo App',
      todos: [
         
      ]
    };
  },
  mounted() {
    if (localStorage.getItem('todos')) {
      try {
        this.todos = JSON.parse(localStorage.getItem('todos'));
      } catch(e) {
        localStorage.removeItem('todos');
      }
    }
  },
  methods: {
    saveTodos() {
      const parsed = JSON.stringify(this.todos);
      localStorage.setItem('todos', parsed);
    }
  }
  
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

#app h1 {
  font-family: 'Permanent Marker', cursive;
  font-size: 50px;
  text-align: center;
  font-weight: 900;
  color: rgba(96, 49, 228, 0.15);
  margin-bottom: 20px;
}
</style>
