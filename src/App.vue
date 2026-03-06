<script setup>
import { ref, onMounted, watch } from 'vue'
import { useTimerStore } from '@/stores/timer'
import { useSettingsStore } from '@/stores/settings'
import { useTodoStore } from '@/stores/todo'

import TopHeader from '@/components/layout/TopHeader.vue'
import TimerControls from '@/components/timer/TimerControls.vue'
import TimerDisplay from '@/components/timer/TimerDisplay.vue'
import ActionButtons from '@/components/timer/ActionButtons.vue'
import TodoList from '@/components/todo/TodoList.vue'
import SettingsPanel from '@/components/settings/SettingsPanel.vue'

const timerStore = useTimerStore()
const settingsStore = useSettingsStore()
const todoStore = useTodoStore()

const isSettingsOpen = ref(false)

// Lifecycle: init from localStorage
onMounted(() => {
  settingsStore.loadSettings()
  todoStore.loadTodos()
  timerStore.setMode('pomodoro') // ensure timer resets to user settings
})

// Focus task sync
const getFocusedTaskText = () => {
  if (!todoStore.focusedTodoId) return ''
  const task = todoStore.todos.find(t => t.id === todoStore.focusedTodoId)
  return task ? task.text : ''
}

// Side-effects: Handle Document Title & Body Class for theme
watch([() => timerStore.formattedTime, () => timerStore.mode, () => getFocusedTaskText()], ([time, mode, focusText]) => {
  // Update Title
  const modeEmoji = mode === 'pomodoro' ? '🍅' : '☕'
  const taskPrefix = focusText ? `${focusText} - ` : ''
  document.title = `${time} - ${taskPrefix}${modeEmoji} Pomodoro`

  // Update Body Theme
  document.body.className = `theme-${mode}`
}, { immediate: true })

</script>

<template>
  <div class="app-container">
    <TopHeader @open-settings="isSettingsOpen = true" />
    
    <main class="main-content">
      <TimerControls />
      <TimerDisplay />
      
      <div v-if="todoStore.focusedTodoId" class="focus-banner">
        当前专注：<strong>{{ getFocusedTaskText() }}</strong>
      </div>

      <ActionButtons />
    </main>
    
    <TodoList />

    <SettingsPanel 
      :is-open="isSettingsOpen" 
      @close="isSettingsOpen = false" 
    />
  </div>
</template>

<style scoped>
.app-container {
  max-width: 480px;
  margin: 0 auto;
  min-height: 100vh;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
}

.main-content {
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  margin-top: 1rem;
}

.focus-banner {
  text-align: center;
  background: rgba(0,0,0,0.15);
  padding: 0.75rem;
  border-radius: 8px;
  margin-top: 1rem;
  font-size: 1.1rem;
}
</style>
