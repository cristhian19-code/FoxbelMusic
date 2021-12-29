<template>
  <div class="card">
    <div class="card__img">
      <div class="card__img-play">
        <button @click="playMusic({
          title,
          artist,
          image,
          preview
        })">
          <i class="fas fa-play"></i>
        </button>
      </div>
      <img :src="image" alt="">
    </div>
    <div class="card__body">
        <h2>{{title}}</h2>
        <p>{{artist}}</p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    title: String,
    artist: String,
    image: String,
    preview: String
  },
  methods: {
    ...mapActions(['playMusic']),
  },
}
</script>

<style>
.card{
  width: 200px;
  display: flex;
  flex-direction: column;
}
.card__img{
  position: relative;
}

.card__img-play{
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card__img-play>button{
  background-color: transparent;
  border: none;
  font-size: 36px;
  cursor: pointer;
  color: white;
}

.card__img img{
  height: 200px;
  width: 200px;
}

.card__body>h2{
  font-size: 14px;
}

.card__body>p{
  font-size: 12px;
  font-weight: 400;
}
</style>