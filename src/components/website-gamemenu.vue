<template>
<div class="game-menu">
  <div class="container">
    <div class="row">
        <!--<div class="grid_15">
          <div class="gm-item home">
            &lt;!&ndash;<span><router-link to="/bingo"><img src='../assets/quinto-images/graphics-1/bingo-main.png'></router-link></span>&ndash;&gt;
            <span><router-link to="/">All</router-link></span>
          </div>
        </div>-->
        <div class="grid_15" v-for="tab in tabs">
            <div class="gm-item lotto">
                <!--<span><router-link to="/lottery"><img src='../assets/quinto-images/graphics-1/lottery-main.png'></router-link></span>-->
                <span><router-link :to="'/'+tab.tab_descr">{{ tab.tab_descr }}</router-link></span>
            </div>
        </div>
    </div>
  </div>
</div>
</template>

<script>
    export default {
        computed: {
            tabs: function(){
                if(!this.$store.state.tabs.tabs) return [];
                return this.$store.state.tabs.tabs.filter(function(tab){
                    console.log(tab.parent_name+' == LOBBY');
                    return tab.parent_name == 'LOBBY';
                }).sort(function(a,b){
                    return a.ord - b.ord;
                });
            }
        }
    }
    
</script>
<style scoped>
.game-menu{
    border-bottom: 1px solid #444;
    /*border-top: 1px solid #444;*/
    padding: 20px 0;
    -webkit-box-shadow: 0px 24px 85px -26px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 24px 85px -26px rgba(0,0,0,0.75);
    box-shadow: 0px 24px 85px -26px rgba(0,0,0,0.75);
}
.gm-item > span{
    min-height: 20px;
    display: inline-block;
}

.gm-item > span > a{
    color: #fff;
    display: block;
    background-color: #1d2544;
    width: 125px;
    border-radius: 3px;
}
.gm-item:hover{
    opacity: 0.5;
}
.grid_15{
    width: 20%;
    margin-left: 0;
}


</style>