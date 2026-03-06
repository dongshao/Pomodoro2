<script setup>
import { useTimerStore } from '@/stores/timer'
const timerStore = useTimerStore()
</script>

<template>
  <div class="action-buttons">
    <button 
      class="main-btn" 
      :class="{ active: timerStore.isActive }"
      @click="timerStore.isActive ? timerStore.pauseTimer() : timerStore.startTimer()"
    >
      {{ timerStore.isActive ? 'PAUSE' : 'START' }}
    </button>
    <button 
      v-if="timerStore.isActive || timerStore.remainingTime !== (timerStore.mode === 'pomodoro' ? 25*60 : (timerStore.mode === 'shortBreak' ? 5*60 : 15*60))" 
      class="reset-btn" 
      @click="timerStore.resetTimer()"
    >
      RESET
    </button>
  </div>
</template>

<style scoped>
.action-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
}

.main-btn {
  background: white;
  color: var(--bg-primary);
  border: none;
  font-size: 1.5rem;
  font-weight: 800;
  padding: 1rem 3rem;
  border-radius: 99px;
  cursor: pointer;
  transition: transform 0.1s, box-shadow 0.2s;
  box-shadow: 0 6px 0 rgba(0,0,0,0.15);
}

.main-btn:active {
  transform: translateY(6px);
  box-shadow: 0 0 0 rgba(0,0,0,0);
}

.main-btn.active {
  box-shadow: 0 0 0 rgba(0,0,0,0);
  transform: translateY(6px);
  opacity: 0.9;
}

.reset-btn {
  background: transparent;
  color: inherit;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s;
  padding: 0.5rem 1rem;
}

.reset-btn:hover {
  opacity: 1;
}
</style>
