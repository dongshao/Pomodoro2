<script setup>
import { useTodoStore } from '@/stores/todo'
import AddTodo from './AddTodo.vue'
import TodoItem from './TodoItem.vue'

const todoStore = useTodoStore()
</script>

<template>
  <div class="todo-list-container">
    <h3>任务清单</h3>
    <AddTodo />
    
    <div class="todos">
      <TodoItem 
        v-for="todo in todoStore.todos" 
        :key="todo.id" 
        :todo="todo" 
      />
    </div>
    
    <div class="empty-state" v-if="todoStore.todos.length === 0">
      <p>目前没有任务，在上方添加一个开始吧！</p>
    </div>
  </div>
</template>

<style scoped>
.todo-list-container {
  margin-top: 3rem;
  background: rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  border-radius: 16px;
}

h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-weight: 600;
  font-size: 1.2rem;
}

.todos {
  max-height: 300px;
  overflow-y: auto;
  padding-right: 0.5rem;
}

/* Custom scrollbar */
.todos::-webkit-scrollbar {
  width: 6px;
}

.todos::-webkit-scrollbar-track {
  background: transparent;
}

.todos::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 20px;
}

.empty-state {
  text-align: center;
  padding: 2rem 0;
  opacity: 0.6;
  font-style: italic;
}
</style>
