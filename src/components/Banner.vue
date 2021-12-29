<template>
    <div class="banner">
        <div v-if="width>1200" class="banner__img">
            <img src="https://m.media-amazon.com/images/I/61jNfu1D+HL._SY355_.jpg" alt="">
        </div>
        <div class="banner__desc">
            <div class="banner__desc-body">
                <h1 class="banner__desc-author">Adele 21</h1>
                <p class="banner__desc-addit">Lo mejor de Adele <span class="banner__desc-followers">321,123 seguidores</span></p>
                <p class="banner__desc-text">Adele Laurie Blue Adkins (Tottenham, Londres, Inglaterra, 5 de mayo de 1988), conocida simplemente como Adele, es una cantante, compositora y multinstrumentista británica.8​ </p>
                <div class="banner__desc-buttons">
                    <button>
                        Reproducir
                    </button>
                    <button>
                        Seguir
                    </button>
                    <button>
                        <i class="fas fa-ellipsis-h"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { inject } from 'vue'
export default {
    setup() {
        const width = inject('width');

        return{
            width
        }
    }
}
</script>

<style>
.banner{
    height: 250px;
    margin-top: 40px;
    display: flex;
    color: white;
}

.banner>div{
    height: 100%;
    position: relative;
}

.banner__img >img{
    height: 250px;
    width: 250px;
}

.banner__desc{
    background-image: url('../assets/adele-wallpaper.jpg');
    transform: rotateY(180deg);
    background-size: cover;
    height: 100%;
    width: 100%;
    background-repeat: no-repeat;
    background-position: top center;
}

.banner__desc-body{
    position: absolute;
    transform: rotateY(180deg);
    height: 100%;
    width: 100%;
    padding: 30px 40px;
}

.banner__desc-body::before{
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: -10;
    background-color: var(--color-ligth-prim);
    opacity: 0.6;
}

.banner__desc-addit{
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 20px;
}

.banner__desc-followers{
    font-size: 10px;
    margin-left: 16px;
    color: var(--color-secondary);
}

.banner__desc-text{
    font-size: 12px;
    font-weight: 400;
}

.banner__desc-buttons{
    display: flex;
    gap: 20px;
    margin-top: 50px;
    font-size: 14px;
    font-weight: 400;
}

.banner__desc-buttons>button:not(:nth-child(3)){
    background-color: transparent;
    border:none;
    height: 31px;
    width: 117px;
    cursor: pointer;
    border-radius: 100px;
}

.banner__desc-buttons>button:nth-child(1){
    color: white;
    background-color: var(--color-main);
}

.banner__desc-buttons>button:nth-child(2){
    border: 1px solid var(--color-main);
    color: var(--color-main);
    transition: 0.5s;
}

.banner__desc-buttons>button:nth-child(2):hover{
    color: white;
    border: 1px solid white;
}

.banner__desc-buttons>button:nth-child(3){
    background-color: transparent;
    color: white;
    cursor: pointer;
    font-size: 20px;
    border: none;
}
</style>