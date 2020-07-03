<template>
   <li class="nav-item"
    :class="[route.path === $route.path ? 'actived' : '', route.children ? 'dropdown' : '']">
      <a 
        :class="!route.children ? 'sidebar-link' : 'dropdown-toggle'" 
        @click="$route.path !== route.path ? $router.replace(route.path) : ''">
        <span class="icon-holder">
          <i class="c-blue-500" :class="route.meta.ico"></i>
        </span>
        <span class="title">{{ route.name }}</span>
        <span v-if="route.children" class="arrow">
          <i class="ti-angle-right"></i>
        </span>            
      </a>       
      <ul class="dropdown-menu" v-if="route.children">
        <li 
        :class="[child.path === $route.path ? 'actived' : '', child.children ? 'dropdown' : '']"
        v-for="child in route.children">
          <a 
            :class="!child.children ? 'sidebar-link' : 'dropdown-toggle'" 
            @click="$route.path !== child.path && !child.children ? $router.replace(child.path) : ''">
            <span class="icon-holder">
              <i class="c-blue-500" :class="child.meta.ico"></i>
            </span>
            <span class="title">{{ child.name }}</span>
            <span v-if="child.children" class="arrow">
              <i class="ti-angle-right"></i>
            </span>            
          </a>   
          <ul class="dropdown-menu" v-if="child.children">
            <li v-for="child in child.children">
              <a 
                :class="!child.children ? 'sidebar-link' : 'dropdown-toggle'" 
                @click="$route.path !== child.path && !child.children ? $router.replace(child.path) : ''">
                <span class="icon-holder">
                  <i class="c-blue-500" :class="child.meta.ico"></i>
                </span>
                <span class="title">{{ child.name }}</span>
                <span v-if="child.children" class="arrow">
                  <i class="ti-angle-right"></i>
                </span>            
              </a>           
            </li>
          </ul>                  
        </li>
      </ul>
    </li> 	
</template>

<script>
var slugify = require('slugify')

export default {

  name: 'nav-link',
  props: ['route'],
  methods: {
    push(v) {
      if(this.$route.path !== v.path && !v.children) 
        this.$router.replace(v.path) 
      else if(v.children)
        this.isExpanded = !this.isExpanded
    }
  },
  watch: { 
     '$route': {
        handler: function(r) {
          if(r)
            this.isExpanded = false
        },
        deep: true,
        immediate: true
      }
  },
  data () {
    return {
      isExpanded: false
    }
  }
}
</script>

<style lang="css" scoped>
</style>