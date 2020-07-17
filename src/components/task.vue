<template>
    <div class="tasks-wrapper">
        
        <router-link to="/"  class="link-home">
            <i class="fa fa-angle-left" aria-hidden="true"></i>
            <span>HOME</span>
        </router-link>
        <div class="title">
            <input type="text" 
                v-if="todo.isEditing"
                v-model="editValue"
                @keyup.enter="editTitle(todo, todo.taskName, editValue)"
            >
            <h1 v-else>{{todo.taskName}}</h1>
            <i class="fa fa-pencil-square-o" @click="changeTitle(todo)"></i>
        </div>
        <ul>
            <li v-for="task in todo.tasks" :key="task.title">
                <i 
                    v-bind:class="{'fa fa-circle': task.done, 'fa fa-circle-o': !task.done}"
                    @click="completeTask(todo, task.title)"
                ></i>
                <input type="text" 
                    v-if="task.isEditing"
                    
                    v-model="editValue"
                    @keyup.enter="editTask(todo, task.title, editValue)"
                >
                <span
                    v-else
                    @click="completeTask(todo, task.title)"
                    :class="{strike: task.done}"
                >{{ task.title }}</span>
                <i class="fa fa-pencil-square-o" @click="changeTask(todo, task.title)"></i>
                <i class="fa fa-times" @click="deleteTask(todo, task.title)"></i>
            </li>
        </ul>
        <div class="add">
            <button>
                <i class="fa fa-plus" @click="addTask"></i>
            </button>
        </div>
        <div class="save">
            <button v-if="isChanged">
                Save
            </button>
            <button v-if="isChanged"  @click="undoClk">
                Undo
            </button>
        </div>
    </div>
</template>

<script>



export default {
    data() {
        return {
            editValue: '',
            isChanged: false,
            isSaved: false,
            undoTodo: [],
            doTodo: [],
        }
    },
    props: ['todo'],
    methods: {
        undoClk() {

        },
        addTask() {
            this.todo.tasks = this.todo.tasks.concat({
                title: '',
                done: false,
                isEditing: true
            });
        },
        deleteTask(todo, title) {
            this.$emit('delete-task', todo, title);
        },
        completeTask(todo, title) {

            // console.log("isChanged", this.prevTodo);
            this.$emit('complete-task', todo, title);
        },
        changeTask(todo, title) {
            this.$emit('change-task', todo, title);
            if(this.editValue.length == 0) {
                this.editValue=title;
            } else {
                this.editValue='';
            }
        },
        changeTitle(todo) {
            this.$emit('change-title', todo);
            
            if(this.editValue.length == 0) {
                this.editValue=todo.taskName;
            } else {
                this.editValue='';
            }
            
        },
        editTask(todo, title, editValue) {
            this.$emit('edit-task', todo, title, editValue);
            this.editValue='';
        },
        editTitle(todo, title, editValue) {
            this.$emit('edit-title',todo, title, editValue);
            this.editValue='';
        }
    }
}


</script>

<style>
@import "../../node_modules/font-awesome/css/font-awesome.css";


.link-home {
    border: 1px solid #000;
    padding: 3px;
    border-radius: 5px;
    text-decoration: none;
    color: #000;
}

.link-home:hover {
    border: 2px solid #000;
    font-weight: bold;
}

.link-home i {
    font-size: 14px;
}
.link-home span {
    font-size: 14px;
    margin-top: 2px;
}



.tasks-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
}

.tasks-wrapper .title {
    display: flex;
    justify-content: center;
    align-items: center;
}

.tasks-wrapper .title input {
    width: 150px;
    height: 40px;
    font-size: 32px;
}
.tasks-wrapper .title i {
    margin-left: 10px;
    font-size: 20px;
}


.tasks-wrapper ul {
    display: flex;
    flex-direction: column;
    align-items: space-between;
    width: 300px;
    list-style: none;
    padding: 0;
}

.tasks-wrapper ul li {
    display: flex;
    cursor: pointer;
}

.tasks-wrapper ul li span,
.tasks-wrapper ul li input {
    flex-grow: 1;
    margin-left: 10px;
}


.tasks-wrapper ul li i {
    flex-basis: 15px;
    flex-shrink: 0; 
}

.strike {
    text-decoration: line-through;
}



</style>