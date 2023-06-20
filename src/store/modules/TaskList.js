import axios from 'axios'

const state = {
    tasks: [],
    filters: {
        selectFilter: null,
        searchFilter: "",
    },
    isFirstLoad: true,
    isNextTasksLoading: false,
    isDumped: false,
    limit: 18,
    page: 1
}

const getters = {
    loadTasks: (state) => state.tasks,
    loadFilters: (state) => state.filters,
    isFirstLoad: (state) => state.isFirstLoad,
    isNextTasksLoading: (state) => state.isNextTasksLoading,
    isDumped: (state) => state.isDumped

}


const actions = {
    async getTasks({ commit }) {
        if (!state.isFirstLoad && !state.isDumped)
            commit('setIsNextTasksLoading', true)

        const completed = state.filters.selectFilter == "Completed" ? true : state.filters.selectFilter == "Uncompleted" ? false : null;
        const queryStringFilters = `?q=${state.filters.searchFilter}&${completed !== null ? "completed=" + completed : ""}`;
        const queryStringPagination = `&_page=${state.page}&_limit=${state.limit}`;
        const res = await axios.get(`https://jsonplaceholder.typicode.com/todos${queryStringFilters + queryStringPagination}`);

        if (!state.isFirstLoad)
            commit('setIsNextTasksLoading', false)

        if (!res.data.length == 0) {
            commit('setIsDumped', false)
            commit('setIsFirstLoad', false);
            commit('setTasks', res.data);
            commit('incrementPage');
        } else {
            commit('setIsDumped', true)
        }
    },

    async addTask({ commit }, title) {
        const res = await axios.post(
            'https://jsonplaceholder.typicode.com/todos',
            { title, completed: false }
        )
        commit('newTask', res.data)
    },

    async deleteTask({ commit }, id) {
        await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
        commit('removeTask', id)
    },

    async updateTask({ commit }, updatedTask) {
        await axios.put(`https://jsonplaceholder.typicode.com/todos/${updatedTask.id}`)
        commit('updateTask', updatedTask)
    },

    getFilters({ commit }) {
        commit('setFilters', state.filters)
    },

    updateFilter({ commit }, filter) {
        commit('updateFilter', filter)
        commit('resetTasks')
    },

}

const mutations = {
    setTasks: (state, tasks) => state.tasks = [...state.tasks, ...tasks],
    newTask: (state, task) => state.tasks.unshift(task),
    removeTask: (state, id) => state.tasks = state.tasks.filter(task => task.id != id),
    updateTask: (state, updatedTask) => {
        const index = state.tasks.findIndex(task => task.id === updatedTask.id);
        if (index !== -1)
            state.tasks.splice(index, 1, updatedTask);
    },
    setFilters: (state, filters) => state.filters = filters,
    updateFilter: (state, filter) => {
        state.filters = { ...state.filters, ...filter };
    },
    setIsFirstLoad: (state, isFirstLoad) => state.isFirstLoad = isFirstLoad,
    setIsNextTasksLoading: (state, isNextTasksLoading) => state.isNextTasksLoading = isNextTasksLoading,
    setIsDumped: (state, isDumped) => state.isDumped = isDumped,
    incrementPage: (state) => state.page++,
    resetTasks: (state) => { state.page = 1, state.tasks = [], state.isFirstLoad = true, state.isDumped = false }
}


export default {
    state,
    getters,
    actions,
    mutations
}