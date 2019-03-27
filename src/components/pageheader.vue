<template>
    <div class="pageheader">
        <carousel :autoplay="true" :autoplayTimeout="9000" :perPage="1">
            <slide>
                <div id="banner-slide-1" class="slide">
                    <div class= "container slide-1">
                    <div class="row">
                        <div class="grid_12 banner-images">
                            <div class="site-info-wrap">
                                <div class="logo-wrap">
                                    <img src="../assets/quinto-images/graphics-1/home-logo-white.png">
                                </div>
                                <div class="lottery-image"><!--<img src='../assets/images/banner.png'>--></div>
                                <!--<div class="logo-wrap"><img src="../assets/quinto-images/graphics-1/mainMenuQuinto.png"></div>-->
                                <!--<p class="tagline">Don't Waste Your Time!<br>Play Lottery Now!</p>-->
                                <!--<router-link to="/lottery"><span class="lottery-btn btn-loud">Win Today!</span></router-link>-->
                            </div>
                        </div>
                        <div class="grid_12 jackpots-info">
                            <div class="jp-wrap">
                                <div class="jackpots">
                                    <span class="jp">Upcoming Lottery Jackpots:</span><br>
                                    <span class="jp-title">{{ jackpotName }}</span>
                                    <span v-if="jackpotName">: </span>
                                    <span class="jp-amt">{{ jackpotAmt }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="grid_6"><p class="tagline">Don't Waste Your Time!<br>Play Lottery Now!</p></div>
                        <div class="grid_6"><router-link to="/lottery"><span class="lottery-btn btn-loud">Win Today<img class="arrow" src="../assets/images/arr3.png"></span></router-link></div>
                    </div>
                </div>
                </div>
            </slide>

            <slide>
                <div id="banner-slide-2" class="slide">
                    <div class="container slide-2">
                        <div class="row">
                            <div class="grid_6 img-side">
                                <img src="../assets/quinto-images/kb-banner-girl.png">
                            </div>
                            <div class="grid_6 text-side">
                                <h3>Slide 2</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </slide>

            <slide>
                <div id="banner-slide-3" class="slide">
                    <div class="container slide-3">
                        <div class="row">
                            <div class="grid_6 text-side">
                                <h3>Slide 3</h3>
                            </div>
                            <div class="grid_6 img-side">
                                <img src="../assets/quinto-images/cash-cow-banner-img.png">
                            </div>
                        </div>
                    </div>
                </div>
            </slide>
        </carousel>
    </div>
</template>

<script>
    import {Carousel, Slide} from 'vue-carousel'
    export default {
        components: {
            Carousel,
            Slide
        },
        computed: {
            jackpotName: function () {
                return this.$store.getters['jackpots/curName']
            },
            jackpotAmt: function () {
                return this.$store.getters['jackpots/curAmt']
            },
            siteName: function () {
                return this.$store.getters['site/getName']
            },
            sitePlayers: function () {
                return this.$store.getters['site/getPlayers']
            },
            userName: function () {
                return this.$store.getters['account/name']
            },
            modalView: function () {
                return this.$store.state.home.modalView;
            }
        },
    }
</script>
<style scoped>
.inner-page-banner{
    min-height: 200px;
}
.text-side h3{
    color: #fff;
}
.VueCarousel-pagination{
    background: #000;
}
.VueCarousel-dot--active .VueCarousel-dot-inner{
    background: #f8f9fa;
}
.VueCarousel-dot{
    margin-top: 0!important;
}
img{
    height: 500px;
    width: auto;
}
#banner-slide-3{
    height: 500px;
    /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#284a7f+0,1d2544+50,14182e+79,000000+100 */
    background: #284a7f; /* Old browsers */
    background: -moz-radial-gradient(center, ellipse cover, #284a7f 0%, #1d2544 50%, #14182e 79%, #000000 100%); /* FF3.6-15 */
    background: -webkit-radial-gradient(center, ellipse cover, #284a7f 0%,#1d2544 50%,#14182e 79%,#000000 100%); /* Chrome10-25,Safari5.1-6 */
    background: radial-gradient(ellipse at center, #284a7f 0%,#1d2544 50%,#14182e 79%,#000000 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#284a7f', endColorstr='#000000',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
}
#banner-slide-2{
    height: 500px;
    /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#315b47+1,263f34+24,1e2825+56,000000+93 */
    background: #263f34; /* Old browsers */
    background: -moz-radial-gradient(center, ellipse cover, #315b47 0%, #263f34 24%, #1e2825 56%, #000000 93%); /* FF3.6-15 */
    background: -webkit-radial-gradient(center, ellipse cover, #315b47 0%,#263f34 24%,#1e2825 56%,#000000 93%); /* Chrome10-25,Safari5.1-6 */
    background: radial-gradient(ellipse at center, #315b47 0%,#263f34 24%,#1e2825 56%,#000000 93%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#315b47', endColorstr='#000000',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
}
#banner-slide-1{
    padding: 40px 0;
    /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#ff6f59+0,a34739+28,441e17+61,1e0d0b+78,000000+100 */
    background: #a34739; /* Old browsers */
    background: -moz-radial-gradient(center, ellipse cover, #ff6f59 0%, #a34739 28%, #441e17 61%, #1e0d0b 78%, #000000 100%); /* FF3.6-15 */
    background: -webkit-radial-gradient(center, ellipse cover, #ff6f59 0%,#a34739 28%,#441e17 61%,#1e0d0b 78%,#000000 100%); /* Chrome10-25,Safari5.1-6 */
    background: radial-gradient(ellipse at center, #ff6f59 0%,#a34739 28%,#441e17 61%,#1e0d0b 78%,#000000 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ff6f59', endColorstr='#000000',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
}
    .lottery-image img{
        height: 218%;
    }

</style>