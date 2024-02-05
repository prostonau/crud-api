class Config {
  bathUrl?: string = '';
  authUrl?: string = '';
  apiUrl: string = '';
  projectKey: string = '';
  secret: string = '';
  scope: string = '';
  store: string;
  constructor() {
    this.bathUrl = 'europe-west1.gcp.commercetools.com';
    this.authUrl = `https://auth.${this.bathUrl}`;
    this.apiUrl = `https://api.${this.bathUrl}`;
    this.projectKey = '611a116e-87f8-43a5-9c07-959851c6dff3';
    this.secret = 'wiWXgK9Z2y_K8rx0FYLg1N-r';
    this.scope = 'i9z0351m49c9fr3YGHU_CsVHk9Eh0hyP';
    this.store = 'cycklesStoreeCommerceRSSchool';
  }
}
export default Config;
