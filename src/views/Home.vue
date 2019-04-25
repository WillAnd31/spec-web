<template>
	<v-container grid-list-xl class="home">
		<v-layout column>
			<v-flex xs3 v-for="post in postData" :key="post.identifier">
				<PostPeek :post="post"/>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script lang="ts">
import _ from 'lodash';
import { Component, Vue } from 'vue-property-decorator';
import PostPeek from '../components/PostPeek.vue';

import posts from '../posts/posts.json';
import { Post } from '../posts/models';

@Component({
	components: {
		PostPeek
	},
})
export default class Home extends Vue {

	private postData: Post[] = _.map(posts, (p) => new Post(p));

}
</script>
