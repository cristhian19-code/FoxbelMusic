import { createStore } from 'vuex'

export default createStore({
  state: {
    data_music: null,
    reproductor: null,
  },
  mutations: {
    setMusic(state, { payload, player }) {
      state.data_music = {
        title: payload.title,
        artist: payload.artist,
        image: payload.image
      };
      state.reproductor = player;
    }
  },
  actions: {
    playMusic({ commit, state }, payload) {

      if (state.reproductor) {
        state.reproductor.pause();
      }

      const player = new Audio(payload.preview)
      player.play();

      commit('setMusic', {
        payload,
        player
      })
    },
  },
  getters: {
    getPlay(state) {
      return state.reproductor ? true : false
    }
  }
})
