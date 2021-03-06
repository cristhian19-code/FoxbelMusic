<template>
  <div class="app">
    <SidebarVue />
    <main>
      <div class="header__main">
        <div class="header__main-inputs">
          <div class="header__main-search">
            <input v-model="search" @keyup.enter="handleSearch()" type="text" :placeholder="`Buscar por ${select}`">
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
import SidebarVue from './components/Sidebar.vue'
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
    const select = ref('Recientes');
    
    provide('data_music', data_music);
    provide('list_music', list_music);
    provide('width', width);
    provide('select', select);

    return {
      list_music,
      search,
      width,
      select
    }
  },
  mounted() {
    //obtener la medida de la pantalla
    window.onresize = ()=>{
      this.width = window.innerWidth;
    }

    //boton para abrir sidebar
    const menu = document.querySelector('.btn__sidebar');
    menu.addEventListener('click', ()=>{
      document.getElementById('sidebar').classList.toggle('active');
      menu.classList.toggle('animation');
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
          const filter = list.data.filter(item => 
            item[this.select == 'Álbums' ? 'album' : 'artist'][this.select == 'Álbums' ? 'title' : 'name'].toLowerCase().includes(this.search.toLowerCase())
          );

          const data = filter.map(item => {
            return  {
              id: item.id,
              artist: item.artist.name,
              title: this.select == 'Álbums' ? item.album.title : item.title,
              image: item.album.cover_big,
              preview: item.preview,
            }
          })

          this.list_music = data;
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
      const data = playlist.tracks.data.slice(0,12)
      

      this.list_music = await data.map(item => {
        return {
          id: item.id,
          title: item.album.title,
          artist: item.artist.name,
          image: item.album.cover_big,
          preview: item.preview,
        }
      });
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
  overflow: hidden;
  margin-left: 20px;
}

.btn__sidebar span{
  height: 4px;
  width: 30px;
  position: absolute;
  transition: 0.5s;
  background-color: var(--color-ligth-prim);
}

.btn__sidebar span:nth-child(1){
  transform: translateY(-8px);
}

.btn__sidebar span:nth-child(2){
  transform: translateY(8px);
}

.btn__sidebar.animation span:nth-child(1){
  transition-delay: .1s;
  transform: translateY(0) rotate(45deg);
}
.btn__sidebar.animation span:nth-child(2){
  transition-delay: .2s;
  transform: translateY(0) rotate(315deg);
}
.btn__sidebar.animation span:nth-child(3){
  transform: translateX(50px);
}

.header__main-user{
  display: flex;
  align-items: center;
  gap: 12px;
  width: 150px;
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

  .btn__sidebar{
    display: flex;
  }
}
</style>
