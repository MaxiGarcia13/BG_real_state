export const ADD_ARTICLE_IN_SHOPPING_CART = 'ADD_ARTICLE_IN_SHOPPING_CART';
export const SUBTRACT_ARTICLE_IN_SHOPPING_CART = 'SUBTRACT_ARTICLE_IN_SHOPPING_CART';
export const REMOVE_ARTICLES_IN_SHOPPING_CART = 'REMOVE_ARTICLES_IN_SHOPPING_CART';

/**
 *
 * @param {Object} article
 */
export const addArticle = (article) => ({
    type: ADD_ARTICLE_IN_SHOPPING_CART,
    payload: { article },
});

/**
 *
 * @param {String} article_id
 */
export const subtractArticle = (article_id) => ({
    type: SUBTRACT_ARTICLE_IN_SHOPPING_CART,
    payload: { article_id },
});

export const removeArticles = () => ({
    type: REMOVE_ARTICLES_IN_SHOPPING_CART,
});

export default {
    addArticle,
    subtractArticle,
    removeArticles,
};
