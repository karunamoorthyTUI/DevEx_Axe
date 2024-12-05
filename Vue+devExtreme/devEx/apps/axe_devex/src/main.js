import 'devextreme/dist/css/dx.common.css';
import './themes/generated/theme.base.dark.css';
import './themes/generated/theme.base.css';
import './themes/generated/theme.additional.dark.css';
import './themes/generated/theme.additional.css';
import './index.css';
import { createApp }  from "vue";
import router from "./router";
import themes from "devextreme/ui/themes";
import { FrappeUI,setConfig,frappeRequest } from "frappe-ui";
import App from "./App.vue";
import appInfo from "./app-info";
setConfig('resourceFetcher',frappeRequest);
themes.initialized(() => {
    const app = createApp(App);
    app.use(router);
    app.use(FrappeUI);
    app.config.globalProperties.$appInfo = appInfo;
    app.mount('#app');
});