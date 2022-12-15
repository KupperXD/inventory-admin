import { Plugin } from '@nuxt/types';

const axiosPlugin: Plugin = (ctx) => {
    ctx.$axios.onError((e) => {
        console.dir(e);
    });
};

export default axiosPlugin;
