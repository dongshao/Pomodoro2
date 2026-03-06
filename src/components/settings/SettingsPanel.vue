<script setup>
import { useSettingsStore } from '@/stores/settings'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])
const settingsStore = useSettingsStore()

const saveAndClose = () => {
  settingsStore.saveSettings()
  emit('close')
}
</script>

<template>
  <div class="settings-overlay" v-if="isOpen" @click.self="saveAndClose">
    <div class="settings-modal" :class="{ 'modal-open': isOpen }">
      <div class="modal-header">
        <h2>Settings</h2>
        <button class="close-btn" @click="saveAndClose">✕</button>
      </div>
      
      <div class="modal-body">
        <div class="setting-group">
          <label>Timer (minutes)</label>
          <div class="inputs-row">
            <div class="input-item">
              <span>Pomodoro</span>
              <input type="number" min="1" max="90" v-model="settingsStore.pomodoroTime" />
            </div>
            <div class="input-item">
              <span>Short Break</span>
              <input type="number" min="1" max="30" v-model="settingsStore.shortBreakTime" />
            </div>
            <div class="input-item">
              <span>Long Break</span>
              <input type="number" min="1" max="60" v-model="settingsStore.longBreakTime" />
            </div>
          </div>
        </div>
        
        <div class="setting-group toggle-group">
          <label>Sound Alerts</label>
          <label class="switch">
            <input type="checkbox" v-model="settingsStore.soundEnabled" />
            <span class="slider round"></span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.settings-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
  color: #333; /* Dark text for modal */
}

.settings-modal {
  background: white;
  border-radius: 16px;
  width: 90%;
  max-width: 400px;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  transform: translateY(20px);
  opacity: 0;
  animation: slideUp 0.3s forwards ease-out;
}

@keyframes slideUp {
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.5rem;
}

.close-btn {
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #999;
}

.close-btn:hover {
  color: #333;
}

.setting-group {
  margin-bottom: 2rem;
}

.setting-group > label {
  display: block;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.9rem;
  color: #777;
  margin-bottom: 1rem;
}

.inputs-row {
  display: flex;
  gap: 1rem;
}

.input-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.input-item span {
  font-size: 0.9rem;
  color: #555;
}

.input-item input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f9f9f9;
  font-size: 1rem;
  box-sizing: border-box;
}

.input-item input:focus {
  outline: none;
  border-color: #ba4949;
  background: #fff;
}

.toggle-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.toggle-group > label {
  margin-bottom: 0;
}

/* Toggle Switch Styles */
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
}

input:checked + .slider {
  background-color: #84c733;
}

input:focus + .slider {
  box-shadow: 0 0 1px #84c733;
}

input:checked + .slider:before {
  transform: translateX(22px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
