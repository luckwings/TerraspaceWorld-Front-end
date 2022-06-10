const PARA_API_ENDPOINT = "https://api-v2-mainnet.paras.id";
const DEGEN_WHALE_API_ENDPOINT = "https://api.degenwhale.club";

const apiCall = async (url: string) => {
    const response = await fetch(url);
    return await response.json();
}

export const getFeaturedCollections = async () => {
    const url = `${PARA_API_ENDPOINT}/featured-collections`;
    const { data, status } = await apiCall(url);
    if (status) {
        const { results } = data;
        return results;
    }
    return [];
}

export const getNewCollections = async () => {
    const url = `${PARA_API_ENDPOINT}/publications`;
    const { data, status } = await apiCall(url);
    if (status) {
        const { results } = data;
        return results;
    }
    return [];
}

export const getTopCollections = async (limit: number = 30) => {
    const url = `${PARA_API_ENDPOINT}/activities/top-users?__limit=${limit}`;
    const { data, status } = await apiCall(url);
    if (status) {
        const { collections } = data;
        return collections;
    }
    return [];
}

export const getCollectionStats = async (collection_id: string) => {
    const url = `${PARA_API_ENDPOINT}/collection-stats?collection_id=${collection_id}`;
    const { data, status } = await apiCall(url);
    if (status) {
        const { results } = data;
        return results;
    }
    return null;
}

export const getCollectionData = async (collection_id: string) => {
    const url = `${PARA_API_ENDPOINT}/collections?collection_id=${collection_id}`;
    const { data, status } = await apiCall(url);
    if (status) {
        const { results } = data;
        return results.length > 0 ? results[0] : null;
    }
    return null;
}

export const getTopTokens = async () => {
    const url = `${PARA_API_ENDPOINT}/top-token`;
    const { data, status } = await apiCall(url);
    if (status) {
        return data;
    }
    return [];
}

export const getUpcomingProjects = async () => {
    const url = `${DEGEN_WHALE_API_ENDPOINT}/upcoming-projects`;
    const results = await apiCall(url);
    return results;
}

export const getHistoricalCollections = async () => {
    const url = `${DEGEN_WHALE_API_ENDPOINT}/historical/collections`;
    const results = await apiCall(url);
    return results;
}

export const getNearPrice = async () => {
    const url = `${DEGEN_WHALE_API_ENDPOINT}/historical`;
    const { near_usd_price } = await apiCall(url);
    return near_usd_price.current_value;
}