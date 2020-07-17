import Vue from 'vue'
import Router from 'vue-router'

import TodoList from '../components/todo-list.vue';
import TaskList from '../components/task-list.vue';

Vue.use(Router);



export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: TodoList
        }, 
        {
            path: '/task', 
            name: 'task',
            props: true,
            component: TaskList
        }
    ]
})