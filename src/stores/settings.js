import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSettingsStore = defineStore('settings', () => {
    // Durations are stored in minutes
    const pomodoroTime = ref(25)
    const shortBreakTime = ref(5)
    const longBreakTime = ref(15)

    // App preferences
    const soundEnabled = ref(true)

    // Load from LocalStorage if exists
    const loadSettings = () => {
        const saved = localStorage.getItem('pomodoro-settings')
        if (saved) {
            try {
                const parsed = JSON.parse(saved)
                pomodoroTime.value = parsed.pomodoroTime ?? 25
                shortBreakTime.value = parsed.shortBreakTime ?? 5
                longBreakTime.value = parsed.longBreakTime ?? 15
                soundEnabled.value = parsed.soundEnabled ?? true
            } catch (e) {
                console.error('Failed to parse settings', e)
            }
        }
    }

    // Save to LocalStorage
    const saveSettings = () => {
        localStorage.setItem('pomodoro-settings', JSON.stringify({
            pomodoroTime: pomodoroTime.value,
            shortBreakTime: shortBreakTime.value,
            longBreakTime: longBreakTime.value,
            soundEnabled: soundEnabled.value
        }))
    }

    return {
        pomodoroTime,
        shortBreakTime,
        longBreakTime,
        soundEnabled,
        loadSettings,
        saveSettings
    }
})
