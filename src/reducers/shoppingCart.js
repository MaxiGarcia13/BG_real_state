import {
    ADD_ARTICLE_IN_SHOPPING_CART,
    SUBTRACT_ARTICLE_IN_SHOPPING_CART,
    REMOVE_ARTICLES_IN_SHOPPING_CART,
} from '../actions/shoppingCart';

const initialState = {
    articles: [],
};

const shoppingCardReducer = (store = initialState, action) => {
    switch (action.type) {
        case ADD_ARTICLE_IN_SHOPPING_CART: {
            return {
                ...store,
                articles: [...store.articles, action.payload.article],
            };
        }

        case SUBTRACT_ARTICLE_IN_SHOPPING_CART: {
            return {
                ...store,
                articles: store.articles.filter((article) => article._id !== action.payload.article_id),
            };
        }
        case REMOVE_ARTICLES_IN_SHOPPING_CART: {
            return {
                ...store,
                articles: [],
            };
        }
        default:
            return store;
    }
};

export default shoppingCardReducer;
