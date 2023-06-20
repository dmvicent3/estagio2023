import { createStore } from 'vuex'
import TaskList from './modules/TaskList'

export default createStore({
  modules: {
    TaskList
  }
})