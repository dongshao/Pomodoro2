<script setup>
import { useTodoStore } from '@/stores/todo'

const props = defineProps({
  todo: {
    type: Object,
    required: true
  }
})

const todoStore = useTodoStore()
</script>

<template>
  <div 
    class="todo-item" 
    :class="{ 
      completed: todo.completed,
      focused: todoStore.focusedTodoId === todo.id 
    }"
  >
    <div class="left-section">
      <button 
        class="check-btn" 
        @click="todoStore.toggleTodo(todo.id)"
      >
        <span v-if="todo.completed">✓</span>
      </button>
      <span class="text">{{ todo.text }}</span>
    </div>
    
    <div class="actions">
      <button 
        class="focus-btn" 
        title="Focus on this task"
        @click="todoStore.setFocusedTodo(todo.id)"
      >
        🎯
      </button>
      <button 
        class="delete-btn" 
        title="Delete task"
        @click="todoStore.removeTodo(todo.id)"
      >
        ✕
      </button>
    </div>
  </div>
</template>

<style scoped>
.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  margin-bottom: 0.5rem;
  transition: transform 0.2s, background 0.2s, border-left 0.2s;
  border-left: 4px solid transparent;
}

.todo-item:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.todo-item.focused {
  border-left-color: white;
  background: rgba(255, 255, 255, 0.25);
}

.left-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.check-btn {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.5);
  background: transparent;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  transition: all 0.2s;
}

.check-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.todo-item.completed .check-btn {
  background: #ff4757;
  border-color: #ff4757;
}

.todo-item.completed .text {
  text-decoration: line-through;
  opacity: 0.6;
}

.text {
  font-size: 1.1rem;
}

.actions {
  display: flex;
  gap: 0.5rem;
  opacity: 0.5;
  transition: opacity 0.2s;
}

.todo-item:hover .actions {
  opacity: 1;
}

.focus-btn, .delete-btn {
  background: transparent;
  border: none;
  color: inherit;
  font-size: 1.2rem;
  padding: 0.25rem;
  cursor: pointer;
  border-radius: 4px;
}

.focus-btn:hover, .delete-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.todo-item.focused .focus-btn {
  opacity: 1;
  background: rgba(255, 255, 255, 0.3);
}
</style>
