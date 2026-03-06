import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTodoStore = defineStore('todo', () => {
    // Array of { id, text, completed }
    const todos = ref([])
    const focusedTodoId = ref(null)

    const loadTodos = () => {
        const saved = localStorage.getItem('pomodoro-todos')
        if (saved) {
            try {
                const parsed = JSON.parse(saved)
                todos.value = parsed.todos || []
                focusedTodoId.value = parsed.focusedTodoId || null
            } catch (e) {
                console.error('Failed to parse todos', e)
            }
        }
    }

    const saveTodos = () => {
        localStorage.setItem('pomodoro-todos', JSON.stringify({
            todos: todos.value,
            focusedTodoId: focusedTodoId.value
        }))
    }

    const addTodo = (text) => {
        if (!text.trim()) return
        todos.value.push({
            id: Date.now().toString(),
            text,
            completed: false
        })
        saveTodos()
    }

    const removeTodo = (id) => {
        todos.value = todos.value.filter(t => t.id !== id)
        if (focusedTodoId.value === id) focusedTodoId.value = null
        saveTodos()
    }

    const toggleTodo = (id) => {
        const todo = todos.value.find(t => t.id === id)
        if (todo) {
            todo.completed = !todo.completed
            saveTodos()
        }
    }

    const setFocusedTodo = (id) => {
        focusedTodoId.value = focusedTodoId.value === id ? null : id
        saveTodos()
    }

    return {
        todos,
        focusedTodoId,
        loadTodos,
        saveTodos,
        addTodo,
        removeTodo,
        toggleTodo,
        setFocusedTodo
    }
})
