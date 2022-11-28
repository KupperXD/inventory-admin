import { Plugin } from '@nuxt/types';

const axiosPlugin: Plugin = (ctx) => {
    ctx.$axios.onError((e) => {
        if (e.response?.status === 404) {
            ctx.error({
                statusCode: 404,
                message: 'Page not found',
            });
        }
    });
};

export default axiosPlugin;
