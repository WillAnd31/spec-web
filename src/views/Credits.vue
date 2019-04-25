<template>
	<v-sheet elevation="2" class="post-view">
		<h2 class="display-1">Credits</h2>
		<p class="body-1">This site is built by many open source software. The following software is used to run this web application specifically.</p>

		<v-text-field label="Search"
			prepend-inner-icon="search"
			v-model="search"
			@input="handleSearch">
		</v-text-field>

		<v-expansion-panel popout
			v-infinite-scroll="loadMore"
			infinite-scroll-disabled="busy"
			infinite-scroll-distance="50">
			<v-expansion-panel-content v-for="item in licenses" :key="item.name">
				<template v-slot:header>
					<div class="body-1">
						<span class="body-2">{{ item.licenses }}</span> - <span>{{ item.name }}</span>
					</div>
				</template>
				<v-card>
					<v-card-text class="body1">
						<p>Repository: <a target="_blank" :href="item.repository">{{ item.repository }}</a></p>
						<p>Licenses: <span>{{ item.licenses }}</span></p>
						<p>License URL: <a target="_blank" :href="item.repository">{{ item.licenseUrl }}</a></p>
					</v-card-text>
				</v-card>
			</v-expansion-panel-content>
		</v-expansion-panel>
	</v-sheet>
</template>

<script lang="ts">
import _ from 'lodash';
import { Vue, Component } from 'vue-property-decorator';
import InfiniteScroll from 'vue-infinite-scroll';
import Licenses from '../../public/licenses.json';

interface LicenseDec {
	name: string;
	licenses: string;
	repository: string;
	licenseUrl: string;
}

const ChunkSize = 25;
const FormattedLicenses = [
	{
		name: 'spec-web',
		licenses: 'GPLv3',
		repository: 'https://github.com/willand31/spec-web',
		licenseUrl: 'https://github.com/WillAnd31/spec-web/blob/master/LICENSE'
	},
	..._.map(Licenses, (lic, key) => _.assign({ name: key }, lic as any))
];

@Component({
	directives: {
		InfiniteScroll
	}
})
export default class CreditsView extends Vue {

	public allLicenses: LicenseDec[] = FormattedLicenses;
	public licenses: LicenseDec[] = this.allLicenses
		.splice(0, this.allLicenses.length > ChunkSize ? ChunkSize : this.allLicenses.length);
	public search = '';

	private filterLicenses(license: LicenseDec): boolean {
		if (!this.search || this.search === '') return true;

		const lowerSearch = this.search.toLowerCase();
		return !!['name', 'licenses', 'repository', 'licenseUrl'].find((field) => {
			return license[field] && license[field].toLowerCase().includes(lowerSearch);
		});
	}

	private loadMore() {
		this.licenses = this.licenses.concat(this.allLicenses.splice(0, ChunkSize));
	}

	private handleSearch() {
		this.allLicenses = FormattedLicenses.filter(this.filterLicenses);
		this.licenses = [];
		this.loadMore();
	}
}
</script>

<style lang="scss">
@import '../posts/util/styles.scss';
</style>
