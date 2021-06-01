<template>
  <div class="search-suggestion">
  <van-cell
  icon="search"
  
  v-for="(str, index) in suggestions"
  :key="index"
  @click="$emit('search', str)"
  >
  <div slot="title" v-html="highlight(str)"></div></van-cell>



  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
import { debounce } from 'lodash'

// const fn = _.debounce(function () {
//   console.log('helloqqq')

// }, 1000)

// fn()
export default {
    name: 'SearchSuggestion',
    components: {},
    props: {
      searchText: {
        type: String,
        required: true

      }
    },
    data () {
        return {
          suggestions: []
        }
    },
    computed: {},
    watch: {
      searchText: {
         handler: debounce (async function () {
          const { data } = await getSearchSuggestions(this.searchText)
        // console.log(data)
        this.suggestions = data.data.options
        },500),
      // async  handler (){
      //   // console.log('helloer')
      //   const { data } = await getSearchSuggestions(this.searchText)
      //   // console.log(data)
      //   this.suggestions = data.data.options

      //   },
        immediate: true
      }
      
    },
    created () {},
    mounted () {},
    methods: {
      highlight (str) {
        
        // console.log(str)

      return str.replace(new RegExp(this.searchText, 'gi'), `<span style="color:red">${this.searchText}</span>)`)

      }
    }

}
</script>

<style scoped lang="less">

</style>>
