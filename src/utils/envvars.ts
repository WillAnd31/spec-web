class EnvVarsProto {
	public get env(): string { return process.env.NODE_ENV; }
	public get analyticsHost(): string { return process.env.VUE_APP_ANALYTICS_HOST; }
	public get analyticsSiteID(): string { return process.env.VUE_APP_ANALYTICS_SITE_ID; }
	public get buildHash(): string { return process.env.VUE_APP_BUILD_HASH; }

	public get isProduction(): boolean { return this.env === 'production'; }
	public get buildLink(): string {
		return 'https://github.com/WillAnd31/spec-web/tree/' + this.buildHash;
	}

	constructor() {
		(window as any).ENV = {
			buildHash: this.buildHash
		};
	}
}

export const EnvVars = new EnvVarsProto();