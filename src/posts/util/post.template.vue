<template>
	<v-sheet elevation="2" class="post-view">
	<p class="signature blue-grey--text text--lighten-2">{{SIGNATURE}}</p>

{{HTML}}
	</v-sheet>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
{{IMPORTS}}
{{COMPONENT_IMPORTS}}
@Component({
	components: {
{{COMPONENT_NAMES}}	}
})
export default class {{CLASS_NAME}}PostTemplate extends Vue {
{{COMPONENT_BODY}}
}
</script>

<style lang="scss">
@import '../util/styles.scss';
</style>
