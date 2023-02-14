import {defineStore} from "pinia";
import {Breadcrumbs} from "~/src/types";

interface BreadcrumbsState {
    pages: Breadcrumbs;
}
const useBreadcrumbState = defineStore({
    id: 'breadcrumbsStore',
    state: (): BreadcrumbsState => {
        return {
            pages: [],
        };
    },
    actions: {
        setBreadcrumbs (payload: Breadcrumbs) {
            this.pages = payload;
        },
    },
    getters: {
        getBreadcrumbs(): Breadcrumbs {
            return this.pages;
        },
    },
});

export default useBreadcrumbState;
