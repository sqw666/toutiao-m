<template>
  <div class="seach-container">
    <form action="/">
<van-search v-model="searchText"
 placeholder="请输入搜索关键词"
 show-action
 @search="onSearch(searchText)"
    @cancel="$router.back()"
    @focus="isResultShow = false"
  />
    </form>
    <search-result 
    :search-text='searchText'

    
    v-if="isResultShow" /> 

    <search-suggestion v-else-if="searchText"
    :search-text='searchText'
    @search='onSearch'
     />
    <search-history
    @update-histories='searchHistories = $event'
    :search-histories='searchHistories'
     v-else 
     @search='onSearch'
     /> 

  </div>
</template>

<script>
import SearchSuggestion from './components/search-suggestion'
import SearchHistory from './components/search-history'
import SearchResult from './components/search-result.vue'
import { setItem , getItem} from '@/utils/storage'
import { getSearchHistories } from '@/api/search'
import { mapState } from 'vuex'
export default {
    name: 'SearchIndex',
    components: {
      SearchSuggestion,
      SearchHistory,
        SearchResult
    },
    props: {},
    data () {
        return {
          searchText: '',
          isResultShow: false,
          searchHistories: []

        }
    },
    computed: {
      ...mapState(['user'])
    },
    watch: {
      searchHistories () {
         setItem('search-histories',this.searchHistories)


      }
    },
    created () {
      this.loadSearchHistories()
      // console.log(data)
    },
    mounted () {},
    methods: {
      onSearch (searchText) {

          this.searchText = searchText
        // console.log('11')
        const index = this.searchHistories.indexOf(searchText)
        if (index !== -1) {
          this.searchHistories.splice(index,1)
        }
        this.searchHistories.unshift(searchText)
        // setItem('search-histories', this.searchHistories)






        this.isResultShow = true

      },
      onCancel () {
        console.log('22')


      },
    async  loadSearchHistories() {
let searchHistories = getItem('search-histories') || []

        if (this.user) {

const { data } = await getSearchHistories()
searchHistories = [...new Set([...searchHistories, ...data.data.keywords])]

// console.log(data.data.keywords)


        }
        console.log(searchHistories)
        // return searchHistories
        this.searchHistories = searchHistories

      }

    }

}
</script>

<style scoped lang="less">

</style>>
