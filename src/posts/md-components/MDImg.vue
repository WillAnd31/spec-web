<template>
	<v-card :class="getClass()" :style="getStyle()">
		<img :src="src" :alt="alt">
		<span v-if="!!title" class="title-text blue-grey--text text--lighten-2 caption text-truncate">{{ title }}</span>
	</v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

@Component
export default class MDImg extends Vue {
	@Prop({ required: true })
	private src!: string;

	@Prop({ default: '' })
	private title!: string;

	@Prop({ default: '' })
	private alt!: string;

	@Prop({ default: 'auto' })
	private width!: string;

	@Prop({ default: 'auto' })
	private height!: string;

	private getClass(): string[] {
		const classes = ['img-container'];
		if (!!this.title) classes.push('has-title');
		return classes;
	}

	private getStyle(): string {
		if ((this as any).$vuetify.breakpoint.smAndDown) {
			return `width: 100%; height: auto;`;
		}
		return `width: ${this.width}; height: ${this.height};`;
	}

}
</script>

<style lang="scss" scoped>
.img-container {
	display: flex;
	align-items: center;
	justify-content: center;
	// overflow: hidden;
	margin: 0.5em auto 0.8em;

	&.has-title {
		margin-bottom: 1.8em;
	}

	img {
		flex-shrink: 0;
		width: 100%;
	}

	.title-text {
		position: absolute;
		bottom: -1.8em;
		text-align: center;
		width: 100%;
	}
}
</style>
