import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ url }) => {
	return { url: url.origin + url.pathname };
};
