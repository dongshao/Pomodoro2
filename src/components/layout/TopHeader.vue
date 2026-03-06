<script setup>
defineProps({
  title: {
    type: String,
    default: 'Pomodoro Focus'
  }
})
const emit = defineEmits(['open-settings'])
</script>

<template>
  <header class="top-header">
    <div class="logo">
      <span class="icon">🍅</span>
      <h1>{{ title }}</h1>
    </div>
    <button class="settings-btn" @click="emit('open-settings')">
      ⚙️ 设置
    </button>
  </header>
</template>

<style scoped>
.top-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
}

.icon {
  font-size: 1.8rem;
}

.settings-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s;
  color: inherit;
}

.settings-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>
