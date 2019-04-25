<template>
	<v-app>
		<Header/>

		<v-content :class="{ 'spec-app-content': true, 'needs-opt-in': !analyticsOptIn }">
			<v-container fluid class="spec-app-container">
				<router-view></router-view>
			</v-container>

			<Footer/>
		</v-content>

		<AnalyticOptIn/>
	</v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Home from './views/Home.vue';
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';
import AnalyticOptIn from './components/AnalyticOptIn.vue';

@Component({
	components: {
		Home,
		Header,
		Footer,
		AnalyticOptIn
	},
})
export default class App extends Vue {

	private get analyticsOptIn(): boolean {
		return this.$store.state.analyticsOptIn;
	}

}
</script>

<style lang="scss">
.spec-app-content {

	&.needs-opt-in {
		margin-bottom: 3.5em;
	}

	.spec-app-container {
		min-height: 100vh;
	}
}
</style>

