import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useSettingsStore } from './settings'

export const useTimerStore = defineStore('timer', () => {
    const settingsStore = useSettingsStore()

    // Modes: 'pomodoro', 'shortBreak', 'longBreak'
    const mode = ref('pomodoro')
    const isActive = ref(false)
    const remainingTime = ref(settingsStore.pomodoroTime * 60)
    const pomodorosCompleted = ref(0)

    let timerInterval = null
    let expectedEndTime = null

    const formattedTime = computed(() => {
        const minutes = Math.floor(remainingTime.value / 60)
        const seconds = remainingTime.value % 60
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    })

    // Start the timer
    const startTimer = () => {
        if (isActive.value) return

        isActive.value = true
        expectedEndTime = Date.now() + remainingTime.value * 1000

        timerInterval = setInterval(() => {
            const now = Date.now()
            const diff = Math.round((expectedEndTime - now) / 1000)

            if (diff > 0) {
                remainingTime.value = diff
            } else {
                completeTimer()
            }
        }, 1000) // update roughly every second
    }

    // Pause the timer
    const pauseTimer = () => {
        isActive.value = false
        clearInterval(timerInterval)
    }

    // Reset the timer for current mode
    const resetTimer = () => {
        pauseTimer()
        setMode(mode.value)
    }

    // Set specific mode
    const setMode = (newMode) => {
        pauseTimer()
        mode.value = newMode
        if (newMode === 'pomodoro') {
            remainingTime.value = settingsStore.pomodoroTime * 60
        } else if (newMode === 'shortBreak') {
            remainingTime.value = settingsStore.shortBreakTime * 60
        } else if (newMode === 'longBreak') {
            remainingTime.value = settingsStore.longBreakTime * 60
        }
    }

    // Logic when timer hits 00:00
    const completeTimer = () => {
        pauseTimer()
        remainingTime.value = 0

        // Play sound if enabled
        if (settingsStore.soundEnabled) {
            // Logic for sound effect can be injected here or handled in component
            const audio = new Audio('/notification.mp3') // placeholder
            audio.play().catch(e => console.log('Audio error or interaction needed:', e))
        }

        if (mode.value === 'pomodoro') {
            pomodorosCompleted.value += 1
            if (pomodorosCompleted.value % 4 === 0) {
                setMode('longBreak')
            } else {
                setMode('shortBreak')
            }
        } else {
            setMode('pomodoro')
        }
    }

    return {
        mode,
        isActive,
        remainingTime,
        pomodorosCompleted,
        formattedTime,
        startTimer,
        pauseTimer,
        resetTimer,
        setMode
    }
})
