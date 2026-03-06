<script setup>
import { useTimerStore } from '@/stores/timer'

const timerStore = useTimerStore()

const modes = [
  { id: 'pomodoro', label: 'Pomodoro' },
  { id: 'shortBreak', label: 'Short Break' },
  { id: 'longBreak', label: 'Long Break' }
]
</script>

<template>
  <div class="timer-controls">
    <button 
      v-for="m in modes" 
      :key="m.id"
      class="mode-btn"
      :class="{ active: timerStore.mode === m.id }"
      @click="timerStore.setMode(m.id)"
    >
      {{ m.label }}
    </button>
  </div>
</template>

<style scoped>
.timer-controls {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  background: rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  border-radius: 12px;
}

.mode-btn {
  background: transparent;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  color: inherit;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  opacity: 0.7;
}

.mode-btn:hover {
  opacity: 1;
}

.mode-btn.active {
  background: rgba(255, 255, 255, 0.2);
  opacity: 1;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
