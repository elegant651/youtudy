
const state = {
    id: '',
    nickname: 'cherryboy',
    profileUrl: '',
    isActive: true,    
    isConnected: false
  }
  
  const getters = {
    userData: state => {
        return {
          id: state.id,
          nickname: state.nickname,
          profileUrl: state.profileUrl,
          isActive: state.isActive        
        }
    },
    isConnected: state => state.isConnected
  }
  
  const mutations = {
    setData(state, user) {
      state.id = user.userId      
      state.isActive = user.isActive      
    },
    setNickname(state, nickname) {
      state.nickname = nickname
    },    
    clear() {
      state.id = ''
      state.nickname = ''
      state.profileUrl = ''
      state.isActive = false      
    },
    setIsConnected(state, isConnected) {
      state.isConnected = isConnected
    }
  }
  
  const actions = {
  
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }