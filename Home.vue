<template>
  <div class="recent">
    <BannerVue />

    <div class="result">
      <h1>Resultados</h1>
      <div class="result__list">
        <CardMusicVue v-for="item in list_music" :key="item.id" :title="item.album.title" :artist="item.artist.name" :image="item.album.cover_big" :preview="item.preview"/>
      </div>
    </div>
  </div>
</template>

<script>
import { inject } from 'vue'
import BannerVue from '../components/Banner.vue'
import CardMusicVue from '../components/CardMusic.vue'

export default {
  name: 'Home',
  setup(props) {
    const list_music = inject('list_music');
    return {
      list_music
    }
  },
  components: {
    BannerVue,
    CardMusicVue
  }
}
</script>

<style>
.recent {
  height: 100%;
}

/*Estilo lista resultado */
.result{
  margin-top: 40px;
}

.result>h1{
  color: var(--color-main);
}

.result__list{
  display: flex;
  margin-top: 20px;
  padding-bottom: 20px;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
}

@media (max-width: 1200px) {
  .header__main-search>input{
    width: 100%;
  }
  .header__main{
    flex-direction: column;
  }
  .header__main-user{
    margin-top: 20px;
  }
}
</style>
