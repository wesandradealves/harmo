 <template>
  <div id="wrap">
    <sidebar/>
    <div class="page-container">
      <app-header />
      <main class='main-content bgc-grey-100'>
        <div id='mainContent'>
          <transition name="fade" mode="out-in">
            <router-view />
          </transition>  
        </div>
      </main>
      <app-footer />  
    </div>
  </div>
</template>
<script>
import sidebar from '@/components/sidebar/sidebar.vue';
import appHeader from '@/components/appHeader/appHeader.vue';
import appFooter from '@/components/appFooter/appFooter.vue';
import json from '@/../static/reviews_test.json';

export default {
  name: "App",
  components: {
    sidebar,
    appHeader,
    appFooter
  },    
  mounted() {
    var self = this;

    self.$store.state.routes = self.$router.options.routes.filter(function (route) {
        return route.path != '*';
    });    

    if(!localStorage.getItem('reviews'))
      localStorage.setItem('reviews', JSON.stringify(json))
    
    for (const [key, item] of Object.entries(JSON.parse(localStorage.getItem('reviews')))) {
      if(!self.$store.state.reviews.some(function(review) {
          return review.date === item.date;
      })) {
        self.$store.state.reviews.push({
          date: item.date,
          reviews: []
        });          
      }
      for (const [k, i] of Object.entries(self.$store.state.reviews)) {
        if(i.date === item.date && !i.reviews.includes(item)) {
          i.reviews.push(item)
        }
      }             
    } 
  }  
};
</script>

<style lang="sass">
@import './_style'
</style>
