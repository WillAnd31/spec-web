<template>
	<v-footer class="app-footer">
		<div class="footer-side">
			<a class="white--text" v-if="analyticOn" @click="disableAnalytics()">disable analytics</a>
		</div>

		<div class="footer-side">
			<a :href="buildLink" target="_blank" class="white--text">{{ buildHash }}</a>
			<router-link to="/credits" class="white--text">credits</router-link>
			<router-link to="/terms-of-service" class="white--text">TOS+PP</router-link>
		</div>
	</v-footer>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { EnvVars } from '../utils/envvars';

@Component
export default class AppFooter extends Vue {

	private get analyticOn(): boolean {
		return this.$store.state.analyticsOptIn;
	}

	private get buildHash(): string {
		return EnvVars.buildHash;
	}

	private get buildLink(): string {
		return EnvVars.buildLink;
	}

	private disableAnalytics() {
		this.$store.commit('optOutOfAnalytics');
	}

}
</script>


<style lang="scss">
.app-footer {
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet) !important;
	padding: 0 1em;

	.footer-side {
		display: flex;
		align-items: center;
		justify-content: space-between;

		a {
			text-decoration: none;
			margin-left: 1em;
		}
	}
}
</style>

