<template>
  <div class="app">
    <SidebarVue />
    <main>
      <div class="header__main">
        <div class="header__main-inputs">
          <div class="header__main-search">
            <input v-model="search" @keyup.enter="handleSearch()" type="text" placeholder="Buscar">
            <i class="fas fa-search"></i>
          </div>
          <button class="btn__sidebar">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <div class="header__main-user">
          <i class="fas fa-user"></i>
          <span>Francisco M.</span>
        </div>
      </div>
      
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <MusicPlayerVue/>
  </div>
</template>
<script>
import MusicPlayerVue from './components/MusicPlayer.vue'
import SidebarVue from './components/Sidebar/Sidebar.vue'
import {ref, provide} from 'vue'

export default {
  components: {
    SidebarVue,
    MusicPlayerVue
  },
  setup(props) {
    const list_music = ref([]);
    const search = ref('');
    const width = ref(window.innerWidth);
    const data_music = ref({});

    provide('data_music', data_music);
    provide('list_music', list_music);
    provide('width', width);

    return {
      list_music,
      search,
      width,
    }
  },
  mounted() {
    window.onresize = ()=>{
      this.width = window.innerWidth;
    }
    const menu = document.querySelector('.btn__sidebar');
    menu.addEventListener('click', ()=>{
      document.getElementById('sidebar').classList.toggle('active');
    })
  },
  methods: {
    async handleSearch() {
      this.list_music = [];

      if(this.search.length > 0) {
        try {
          const res = await fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${this.search}`, {
            method: "GET",
            headers: {
              "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
              "x-rapidapi-key": "c750f476e6mshf8d1c90e5b2142bp17510cjsn09f1faa45bb3"
            }
          })
          const list = await res.json();
          const filter = list.data.filter(item => item.album.title.toLowerCase().includes(this.search.toLowerCase()));
          this.list_music = filter;
        } catch (error) {
        
        }
      }else{
        this.handlePlaylist();
      }
    },
    
    async handlePlaylist(){
      const res = await fetch('https://deezerdevs-deezer.p.rapidapi.com/playlist/230733753',{
        method: "GET",
        headers: {
          "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
          "x-rapidapi-key": "c750f476e6mshf8d1c90e5b2142bp17510cjsn09f1faa45bb3"
        }
      });

      const playlist = await res.json();
      this.list_music = playlist.tracks.data.slice(0,12);
    },
  },
  created() {
    this.handlePlaylist();
  },
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;700&display=swap');

:root{
  --color-main: #E86060;
  --color-secondary: #662323;
  --color-softgray: #BDBDBD;
  --color-gray: #828282;
  --color-ligth-prim: #FF7676;
}

html,body,#app,.app{
  height: 100vh;
  width: 100vw;
}

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Quicksand', sans-serif;
}

.app{
  display: grid;
  grid-template-columns: 330px calc(100vw - 330px);
  grid-template-rows: calc(100vh - 100px) 100px;
  grid-template-areas: 
  'sidebar main'
  'player player';
}

main{
  overflow-y: auto;
  padding: 30px 40px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}

.fade-enter, .fade-leave-to {
  opacity: 0
}


/* cabecer pagina principal*/
.header__main{
  display: flex;
  justify-content: space-between;
}

.header__main-inputs{
  display: grid;
  grid-template-columns: calc(100% - 56px) 56px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

.header__main-search{
  position: relative;
  display: flex;
  align-items: center;
}

.header__main-search>input{
  height: 40px;
  width: 100%;
  padding: 9px 40px 9px 16px;
  border-radius: 100px;
  outline: none;
  border: 1px solid var(--color-gray);
}

.header__main-search>i{
  font-size: 18px;
  position: absolute;
  right: 16px;
}

.btn__sidebar{
  cursor: pointer;
  background-color: transparent;
  width: 40px;
  height: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: none;
  position: relative;
  margin-left: 20px;
  font-size: 30px;
}

.btn__sidebar span{
  height: 4px;
  width: 30px;
  position: absolute;
  background-color: var(--color-ligth-prim);
}

.btn__sidebar span:nth-child(1){
  transform: translateY(-8px);
}

.btn__sidebar span:nth-child(2){
  transform: translateY(8px);
}

.header__main-user{
  display: flex;
  align-items: center;
  gap: 12px;
}

.header__main-user>i{
  font-size: 14px;
  color: var(--color-main);
}
.header__main-user>span{
  font-size: 16px;
  margin-left: 16px;
}

.btn__sidebar{
  display: none;
}

@media (max-width: 900px) {
  .app{
    grid-template-columns: 100vw;
    grid-template-rows: calc(100vh - 100px) 100px;
    grid-template-areas: 
    'main'
    'player';
  }

  
}
</style>
