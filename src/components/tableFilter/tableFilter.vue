<template>
    <form class="filter">
      <fieldset class="form-group">
        <div class="row">
          <legend class="col-form-legend col-sm-2">Filtro</legend>
          <div class="col-sm-10">
            <div class="form-check">
              <label class="form-check-label">
                <input @change="$emit('filterByText', filter)" v-model="filter" class="form-check-input" type="radio" 
                :value="true">
                Somente reviews com texto
              </label>
            </div>
            <div class="form-check">
              <label class="form-check-label">
                <input @change="$emit('filterByText', filter)" v-model="filter" class="form-check-input" type="radio" 
                :value="false">
                Somente reviews sem texto
              </label>
            </div>          
          </div>
          <div class="form-group col-12 mt-3">
            <label class="inputState">Filtrar por data</label>
            <select @change="$emit('filterByDate', date)" v-model="date" id="inputState" class="form-control">
              <option></option>
              <option v-for="dates in $store.state.reviews">
                {{dates.date}}
              </option>
            </select>
          </div>          
        </div>
      </fieldset>
    </form>
</template>

<script>
export default {

  name: 'tableFilter',
  mounted() {
    this.$emit('filterByText', this.filter)
  }, 
  data () {
    return {
      filter: true,
      date: this.$store.state.filter.date || ''
    }
  } 
}
</script>

<style lang="css" scoped>
</style>