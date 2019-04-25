<template>
	<v-toolbar app class="app-header-container">
		<div class="app-header">
			<div class="breadcrumb-nav">
				<router-link to="/" class="home-link">
					<h2 class="headline teal--text text--darken-4">The Spec</h2>
				</router-link>
				<v-breadcrumbs :items="breadcrumbs" class="bread-box">
					<template v-slot:divider>
						<v-icon>chevron_right</v-icon>
					</template>
				</v-breadcrumbs>
			</div>
			<div class="links">
				<a href="https://twitter.com/31wa" class="link twitter-link">
					<img class="twitter-img" src="https://d2hpjf1y64saff.cloudfront.net/images/twitter-icon.png" alt="twitter">
				</a>
				<a href="https://github.com/willand31" class="link github-link">
					<img class="github-img" src="https://d2hpjf1y64saff.cloudfront.net/images/githubicon-dark.png" alt="github">
				</a>
			</div>
		</div>
	</v-toolbar>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';

@Component
export default class AppHeader extends Vue {

	private get breadcrumbs() {
		return [{ text: '' }, ...this.$route.matched.map((r) => ({ text: r.name }))];
	}

}
</script>


<style lang="scss">
.app-header-container {
	.app-header {
		width: 100%;
		height: 100%;;
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: space-between;

		.breadcrumb-nav {
			flex-grow: 1;
			display: flex;
			align-items: center;

			.bread-box {
				padding-left: 0em;
			}
		}

		.home-link {
			text-decoration: none;
		}

		.links {
			height: inherit;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.link {
				height: inherit;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-left: 0.5em;

				img {
					width: auto;
				}

				.twitter-img {
					height: 100%;
				}

				.github-img {
					height: 65%;
				}
			}
		}
	}
}
</style>

