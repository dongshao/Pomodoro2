<script setup>
import { useTimerStore } from '@/stores/timer'
const timerStore = useTimerStore()
</script>

<template>
  <div class="timer-display">
    <div class="time">{{ timerStore.formattedTime }}</div>
    <div class="session-info" v-if="timerStore.mode === 'pomodoro'">
      Session #{{ timerStore.pomodorosCompleted + 1 }}
    </div>
  </div>
</template>

<style scoped>
.timer-display {
  text-align: center;
  margin: 2rem 0;
}

.time {
  font-size: 6rem;
  font-weight: 800;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  letter-spacing: -2px;
  text-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.session-info {
  margin-top: 1rem;
  font-size: 1.1rem;
  opacity: 0.8;
  font-weight: 500;
}
</style>
