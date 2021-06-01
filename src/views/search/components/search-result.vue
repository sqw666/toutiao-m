<template>
  <div class="search-result">
      <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
  <van-cell v-for="(article, index) in list" 
  :key="index" 
  :title="article.title" 
  
  />
</van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'

export default {
    name: 'SearchResult',
    components: {},
    props: {
      searchText: {
        type: String,
        required: true

      }
    },
    data () {
        return {
            list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20
        }
    },
    computed: {},
    watch: {},
    created () {},
    mounted () {},
    methods: {
        async onLoad() {
 
 const { data } = await getSearchResult({
   page: this.page,
   per_page: this.perPage,
   q: this.searchText
 }) 
//  console.log(data);
const { results } = data.data
this.list.push(...results)
this.loading = false
if (results.length) {
  this.page++
} 
else {
  this.finished = true
}
 // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      
    }
    }

}
</script>

<style scoped lang="less">
.search-result {
    position: fixed;
    top: 54px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: auto;
}

</style>>
