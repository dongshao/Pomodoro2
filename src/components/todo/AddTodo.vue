<script setup>
import { ref } from 'vue'
import { useTodoStore } from '@/stores/todo'

const todoStore = useTodoStore()
const newTodoText = ref('')

const handleAdd = () => {
  if (newTodoText.value.trim()) {
    todoStore.addTodo(newTodoText.value)
    newTodoText.value = ''
  }
}
</script>

<template>
  <form class="add-todo" @submit.prevent="handleAdd">
    <input 
      type="text" 
      v-model="newTodoText" 
      placeholder="What are you working on?" 
      class="todo-input"
    />
    <button type="submit" class="submit-btn" :disabled="!newTodoText.trim()">
      +
    </button>
  </form>
</template>

<style scoped>
.add-todo {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  width: 100%;
}

.todo-input {
  flex: 1;
  padding: 1rem;
  border-radius: 12px;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  color: inherit;
  font-size: 1rem;
  outline: none;
  font-family: inherit;
}

.todo-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.todo-input:focus {
  background: rgba(255, 255, 255, 0.3);
}

.submit-btn {
  background: rgba(0, 0, 0, 0.2);
  color: inherit;
  border: none;
  border-radius: 12px;
  width: 50px;
  font-size: 1.5rem;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.submit-btn:hover:not(:disabled) {
  background: rgba(0, 0, 0, 0.3);
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
