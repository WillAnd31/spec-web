import _ from 'lodash';
import moment from 'moment';

export class Post {
	public identifier: string;
	public author: string;
	public date: Date;
	public title: string;
	public name: string;
	public desc: string;
	public tags: string[];

	constructor(json: any) {
		this.identifier = json.identifier;
		this.author = json.author;
		this.date = new Date(json.date);
		this.title = json.title;
		this.name = json.name;
		this.desc = json.desc;
		this.tags = json.tags || [];
	}

	public get prettyDate(): string {
		return moment(this.date).format('MMMM D, YYYY');
	}
}