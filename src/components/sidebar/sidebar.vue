<template>
  <!-- #Left Sidebar ==================== -->
  <div class="sidebar">
    <div class="sidebar-inner">
      <!-- ### $Sidebar Header ### -->
      <div class="sidebar-logo">
        <div class="peers ai-c fxw-nw">
          <div class="peer peer-greed">
            <a class="sidebar-link td-n" href="index.html">
              <div class="peers ai-c fxw-nw">
                <div class="peer">
                  <div class="logo">
                    <img src="static/images/logo.png" alt="">
                  </div>
                </div>
                <div class="peer peer-greed">
                  <h5 class="lh-1 mB-0 logo-text">Adminator</h5>
                </div>
              </div>
            </a>
          </div>
          <div class="peer">
            <div class="mobile-toggle sidebar-toggle">
              <a href="" class="td-n">
                <i class="ti-arrow-circle-left"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- ### $Sidebar Menu ### -->
      <ul class="sidebar-menu scrollable pos-r">
        <nav-link :route="route" :key="route.name" v-for="route in $store.state.routes" />
      </ul>
    </div>
  </div>	
</template>

<script>
import navLink from './partials/navLink/navLink.vue';

export default {

  name: 'sidebar',

  data () {
    return {

    }
  },
  components: {
    navLink,
  },  
}
</script>

<style lang="css" scoped>
</style>