<template>
	<div class="container-fluid">
	  <table-filter 
	  	v-on:filterByText="filterByText"  
	  	v-on:filterByDate="filterByDate"  
	  class="mb-30" />
	  <div class="row">
	    <div class="col-md-12">
	      <div class="bgc-white bd bdrs-3 p-20 mB-20">
	        <h4 class="c-grey-900 mB-20">Reviews ({{vm._data.filter.length}})</h4>
	        <table id="dataTable" class="table table-striped table-bordered" cellspacing="0" width="100%">
	            <thead>
	              <tr>
	                <th width="120">Date</th>
	                <th width="250">Reviewer</th>
	                <th width="80">Gender</th>
	                <th width="120">Source</th>
	                <th width="30">Score</th>
	                <th>Text</th>
	              </tr>
	            </thead>
	            <tfoot>
	              <tr>
	                <th width="120">Date</th>
	                <th width="250">Reviewer</th>
	                <th width="80">Gender</th>
	                <th width="120">Source</th>
	                <th width="30">Score</th>
	                <th>Text</th>
	              </tr>
	            </tfoot>
	            <tbody>
	              <tr v-for="review in vm._data.filter">
	                <td>{{review.date}}</td>
	                <td>{{review.reviewer}}</td>
	                <td>{{review.gender}}</td>
	                <td>{{review.source}}</td>
	                <td>{{review.score}}</td>
	                <td>{{review.text}}</td>
	              </tr>
		        </tbody>
			</table>
	      </div>
	    </div>
	  </div>
	</div>
</template>

<script> 
import Vue from "vue";
import tableFilter from '@/components/tableFilter/tableFilter.vue';

var vm = new Vue({
  data: {
  	filter: [],
  	reviews: []
  }
});

export default {

  name: 'relatorios',
  methods: {
  	filterByText(bool) {  		
  		var self = this;
  		this.$store.state.filter.bool = bool;

		vm._data.filter = vm._data.reviews.filter(function (review) {
			if(bool&&self.$store.state.filter.date)
		    	return review.text&&review.date === self.$store.state.filter.date;
			else if(bool&&!self.$store.state.filter.date)
		    	return review.text;
			else if(!bool)
		    	return !review.text;		    
		    return review.text
		})	
  	},  	
  	filterByDate(date) {
  		var self = this;
  		this.$store.state.filter.date = date;

		vm._data.filter = vm._data.reviews.filter(function (review) {
			if(date&&self.$store.state.filter.bool)
		    	return review.date === date&&review.text;
			else if(date&&!self.$store.state.filter.bool)
		    	return review.date === date&&!review.text;
		    else if(!date&&!self$store.state.filter.bool)
		    	return !review.text;
		    return review.date === date
		})	
  	}
  },
  data () {
    return {
	  	filter: [],
	  	reviews: []
    }
  },  
  watch: { 
     '$route': {
        handler: function(r) {
        	var self = this;

        	if(localStorage.getItem('reviews'))
			    vm._data.reviews = vm._data.filter = JSON.parse(localStorage.getItem('reviews')).filter(function (review) {
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
  components: {
    tableFilter
  }    
}
</script>

<style lang="css" scoped>
</style>