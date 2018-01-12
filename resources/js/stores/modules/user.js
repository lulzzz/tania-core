import NProgress from 'nprogress'

import * as types from '@/stores/mutation-types'
import stub from '@/stores/stubs/user'

const state = {
  current: stub
}

const getters = {
  getCurrentUser: state => state.current,
  IsUserAuthenticated: state => state.current.uid != '',
  IsNewUser: state => state.current.intro === true,
  IsUserAllowSeeNavigator: (state, getters) => {
    return getters.IsUserAuthenticated && state.current.intro === false
  }
}

const actions = {
  userLogin ({ commit, state }, payload) {
    NProgress.start()
    return new Promise(( resolve, reject ) => {
      commit(types.USER_LOGIN, {
        uid: 1001,
        username: payload.username,
        email: 'hello@tanibox.com',
        intro: payload.username === 'user' ? false: true
      })
      // implement login http request
      resolve()
    })
  },
  userCompletedIntro({ commit, state }) {
    commit(types.USER_COMPLETED_INTRO)
  }
}

const mutations = {
  [types.USER_LOGIN] (state, { id, username, email, intro }) {
    state.current = { id, username, email, intro }
  },
  [types.USER_COMPLETED_INTRO] (state) {
    state.current.intro = false
  }
}

export default {
  state, getters, actions, mutations
}
