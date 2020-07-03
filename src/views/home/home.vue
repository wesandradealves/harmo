<template>
    <div class="row gap-20 masonry pos-r">
      <div class="masonry-sizer col-md-6"></div>
      <div class="masonry-item  w-100">
        <div class="row gap-20">
          <!-- #Toatl Visits ==================== -->
          <div class='col-md-3'>
            <div class="layers bd bgc-white p-20">
              <div class="layer w-100 mB-10">
                <h6 class="lh-1">Total Reviews</h6>
              </div>
              <div class="layer w-100">
                <div class="peers ai-sb fxw-nw">
                  <div class="peer">
                    <span class="d-ib lh-0 va-m fw-600 bdrs-10em pX-15 pY-15 bgc-green-50 c-green-500">{{ vm._data.reviews.length }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- #Total Page Views ==================== -->
          <div class='col-md-3'>
            <div class="layers bd bgc-white p-20">
              <div class="layer w-100 mB-10">
                <h6 class="lh-1">Positive Reviews</h6>
              </div>
              <div class="layer w-100">
                <div class="peers ai-sb fxw-nw">
                  <div class="peer">
                    <span class="d-ib lh-0 va-m fw-600 bdrs-10em pX-15 pY-15 bgc-orange-50 c-orange-500">{{ vm._data.reviews.filter(function (review) {
        return review.score > 3
      }).length }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- #Unique Visitors ==================== -->
          <div class='col-md-3'>
            <div class="layers bd bgc-white p-20">
              <div class="layer w-100 mB-10">
                <h6 class="lh-1">Neutral Reviews</h6>
              </div>
              <div class="layer w-100">
                <div class="peers ai-sb fxw-nw">
                  <div class="peer">
                    <span class="d-ib lh-0 va-m fw-600 bdrs-10em pX-15 pY-15 bgc-blue-50 c-blue-500">{{ vm._data.reviews.filter(function (review) {
        return review.score === 3
      }).length }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- #Bounce Rate ==================== -->
          <div class='col-md-3'>
            <div class="layers bd bgc-white p-20">
              <div class="layer w-100 mB-10">
                <h6 class="lh-1">Negative Reviews</h6>
              </div>
              <div class="layer w-100">
                <div class="peers ai-sb fxw-nw">
                  <div class="peer">
                    <span class="d-ib lh-0 va-m fw-600 bdrs-10em pX-15 pY-15 bgc-red-50 c-red-500">{{ vm._data.reviews.filter(function (review) {
        return review.score <= 3
      }).length }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="masonry-item col-12">
        <!-- #Site Visits ==================== -->
        <div class="bd bgc-white">
          <div class="peers fxw-nw@lg+ ai-s">
            <div class="peer peer-greed w-70p@lg+ w-100@lg- p-20">
              <div class="layers">
                <div class="layer w-100 mB-10">
                  <h6 class="lh-1">Wordcloud</h6>
                </div>
                <div class="layer w-100">
                  <wordcloud
                  :data="vm._data.wordCloudData"
                  nameKey="name"
                  valueKey="value"
                  :color="vm._data.wordCloudPallete"
                  :showTooltip="true"
                  :wordClick="wordClickHandler">
                  </wordcloud>
                </div> 
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> 
</template>

<script>
import Vue from "vue";
import wordcloud from 'vue-wordcloud'

var vm = new Vue({
  data: {
    reviews: [],
    wordCloudData: [],
    wordCloudPallete: ['#1f77b4', '#629fc9', '#94bedb', '#c9e0ef'],
  }
});

export default {

  name: 'Home',
  watch: { 
     '$route': {
        handler: function(r) {
          var self = this;

          if(localStorage.getItem('reviews'))
          vm._data.reviews = JSON.parse(localStorage.getItem('reviews')).filter(function (review) {
            if(r.path.split('/')[3] && 
              review.hasOwnProperty(r.path.split('/')[2]))
                return review[r.path.split('/')[2]] === r.path.split('/')[3]
              return self.$store.state.reviews;
          })
        },
        deep: true,
        immediate: true
      }
  },
  computed: {
    vm() {
      return vm;
    }  
  },
  mounted() {
    let categories = []

    for (const [key, item] of Object.entries(vm._data.reviews)) {
      if(item.categories)
        for (const [k, category] of Object.entries(JSON.parse(item.categories))) {
            if(!categories.some(function(categories) {
                return categories.category === category;
            })) {
              categories.push({
                category: category,
                reviews: []
              });
            }  
            for (const [kk, cat] of Object.entries(categories)) {
              if(cat.category === category)
                cat.reviews.push(item);
            }             
        }  
    }

    for (const [key, category] of Object.entries(categories)) {
       vm._data.wordCloudData.push({
        name: category.category,
        value: category.reviews.length
       });
    }     
  },
  methods: {
    wordClickHandler(name, value, vm) {
      console.log('wordClickHandler', name, value, vm);
    }
  },  
  components: {
    wordcloud
  }  
}
</script>

<style lang="sass">

</style>