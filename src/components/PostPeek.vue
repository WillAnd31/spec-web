<template>
	<v-card class="post-peek" :to="post.name">
		<p class="date blue-grey--text text--lighten-2">{{ post.prettyDate }} - {{ post.author }}</p>
		<v-card-title primary-title class="headline">{{ post.title }}</v-card-title>
		<v-card-text class="body-1">
			<p>{{ post.desc }}</p>
			<p class="caption blue-grey--text text--lighten-2">Read More...</p>
		</v-card-text>
	</v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Post } from '../posts/models';

@Component
export default class PostPeekComponent extends Vue {

	@Prop() private post!: Post;

}
</script>

<style lang="scss" scoped>
.post-peek {
	.date {
		position: absolute;
		top: 1em;
		right: 1em;
	}
}
</style>
