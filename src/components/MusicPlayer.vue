<template>
<div class="container__player">
    <div class="music__content">
        <div class="music__content-img">
            <img :src="data_music ? data_music.image : 'https://m.media-amazon.com/images/I/61jNfu1D+HL._SY355_.jpg'" alt="">
        </div>
        <div class="music__content-desc">
            <p>{{data_music ? data_music.title : 'Canción'}}</p>
            <p>{{data_music ? data_music.artist : 'Artista'}}</p>
        </div>
    </div>

    <div class="music__player">
        <button>
            <i class="fas fa-angle-double-left"></i>
        </button>
        <button @click="setPlay()">
            <i v-if="play" class="fas fa-play"></i>
            <i v-else class="fas fa-pause"></i>
        </button>
        {{}}
        <button>
            <i class="fas fa-angle-double-right"></i>
        </button>
    </div>

    <div v-if="width>650" class="music__control">
        <input type="range" @change="setVolumen" :value="reproductor ? reproductor.volume : 0.5" min="0" step="0.1" max="1">
        <button @click="setMuted()">
            <i v-if="!muted" class="fas fa-volume-up"></i>
            <i v-else class="fas fa-volume-mute"></i>
        </button>
    </div>
</div>
</template>

<script>
import { inject } from 'vue'
import { mapState,mapGetters } from 'vuex'
export default {
    data() {
        return {
            muted: false,
            play: true  && this.getPlay
        }
    },
    setup() {
        const width = inject('width');

        return {
            width
        }
    },
    computed: {
        ...mapState(['data_music','reproductor']),
        ...mapGetters(['getPlay'])
    },
    methods: {
        setMuted(){
            if(this.reproductor){
                this.reproductor.muted = !this.muted
                this.muted = !this.muted;
            }
        },
        setVolumen(e){
            if(this.reproductor){
                const volumen = e.target.value
                this.reproductor.volume = volumen 
            }
        },
        setPlay(){
            if(this.reproductor){
                if(!this.play){
                    this.reproductor.pause();
                }else{
                    this.reproductor.play();
                }
                this.play = !this.play;
            }
        }
    },
}
</script>

<style>
.container__player{
    width: 100%;
    grid-area: player;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
    background-color: #EB5757;
}

.container__player button{
    font-size: 20px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: white;
}

/* Estilos descripcion de la musica*/
.music__content{
    display: flex;
    height: 100%;
    align-items: center;
}

.music__content-img{
    height: 100%;
}

.music__content-img>img{
    height: 100%;
}

.music__content-desc{
    margin-left: 20px;
}

.music__content-desc>p:nth-of-type(1){
    font-size: 14px;
    font-weight: bold;
}
.music__content-desc>p:nth-of-type(2){
    font-size: 12px;
    font-weight: 400;
}

/* Estilos control de reproductor */
.music__player{
    display: flex;
    gap: 10px;
    align-items: center;
}

.music__player>button:nth-of-type(2){
    height: 60px;
    width: 60px;
    font-size: 15px;
    border-radius: 50%;
    background-color: var(--color-ligth-prim);
}

/* Estilos control de volumen */
.music__control{
    padding-right: 32px;
    display: flex;
    gap: 20px;
    align-items: center;
}
.music__control>input{
    -webkit-appearance: none;
    border-radius: 40px;
    height: 10px;
}

.music__control>button{
    font-size: 30px;
}

@media (max-width: 650px) {
   .music__player{
       padding-right: 20px;
   }
}
</style>