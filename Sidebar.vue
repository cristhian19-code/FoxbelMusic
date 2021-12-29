<template>
    <aside id="sidebar">
        <div class="sidebar__img">
            <img src="@/assets/foxbel-music.png" alt="">
        </div>
        <div>
            <div class="sidebar__item" v-for="item_list in list" :key="item_list.name">
                <h1 class="sidebar__list-title">{{item_list.name}}</h1>
                <ul class="sidebar__link-content">
                    <li class="sidebar__list-link" v-for="item in item_list.items" :key="item">
                        {{item}}
                    </li>
                </ul>
            </div>
        </div>
    </aside>
</template>

<script>

export default {
    data() {
        return {
            list: [
                {
                    name: 'Mi Libreria',
                    items: ['Recientes', 'Artistas', 'Álbums', 'Canciones','Estaciones']
                },
                {
                    name: 'Playlist',
                    items: ['Metal','Para bailar','Rock 90s','Baladas']
                }
            ]
        }
    },
}
</script>

<style>
#sidebar{
    width: 330px;
    padding: 50px 40px;
    background: var(--color-secondary);
    height: 100%;
    color: white;
    grid-area: sidebar;
}


.sidebar__img>img{
    width: 250px;
}

.sidebar__item{
    margin-top: 30px;
}

.sidebar__list-title{
    font-size: 22px;
}

.sidebar__link-content{
    list-style: none;
    margin-top: 4px;
}

.sidebar__list-link{
    cursor: pointer;
    color: white;
    margin-top: 8px;
    font-size: 16px;
}

.sidebar__list-link:hover{
    transition: .2s;
    color: var(--color-main);
    font-weight: bold;
}

.sidebar__list-link::after{
    content: '';
    position: absolute;
    width: 5px;
    background-color: var(--color-main);
    left: 0;
    height: 0px;
    width: 5px;
}

.sidebar__list-link:hover::after{
    height: 20px;
}

@media (max-width: 900px) {
    #sidebar{
        position: absolute;
        top: 0;
        left: -330px;
        z-index: 100;
        transition: .5s linear;
    }

    #sidebar.active{
        left: 0px;
    }

}


</style>