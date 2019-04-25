<template>
	<v-bottom-sheet app v-model="shouldShow" persistent hide-overlay transition>
		<div class="opt-in-prompt green lighten-5">
			<p class="body-1">The Spec recognizes your rights to your own data, that is why analytics are turned turned off by default. This data is extraordinarily useful, please review the <router-link to="/terms-of-service">privacy policy</router-link> and if you're okay with it please opt in.</p>
			<v-btn color="success" @click="optIn()">Opt In</v-btn>
		</div>
	</v-bottom-sheet>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component
export default class AnalyticOptIn extends Vue {

	private get shouldShow(): boolean {
		return !this.$store.state.analyticsOptIn;
	}

	@Watch('shouldShow')
	private onShouldShowChanged() {
		this.$forceUpdate();
	}

	private optIn() {
		this.$store.commit('optIntoAnalytics');
	}
}
</script>

<style lang="scss">
.opt-in-prompt {
	padding: 1em;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-around;

	p {
		margin-right: 1em;
		width: 80%;
		min-width: 40em;
	}
}
</style>

