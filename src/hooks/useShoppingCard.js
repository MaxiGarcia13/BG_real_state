import { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import action from '../actions/shoppingCart';

export const useShoppingCard = () => {
    const state = useSelector((store) => store.shoppingCart);
    const dispatch = useDispatch();

    const addArticle = (article = {}) => dispatch(action.addArticle(article));
    const subtractArticle = (article_id) => dispatch(action.subtractArticle(article_id));
    const removeArticles = () => dispatch(action.removeArticles());

    const calculateTotal = (price = 0, pricePerPackage = 0, amount = 0, quantitiesPerPackage = 1) => {
        const _package = Number.parseInt(amount / quantitiesPerPackage);
        const _offset = Number.parseInt(amount - _package * quantitiesPerPackage);

        let result = 0;

        if (_package > 0) {
            result += _package * pricePerPackage;
        }

        if (_offset > 0) {
            result += _offset * price;
        }

        return result;
    };

    const total = useMemo(() => {
        let result = 0;
        state.articles.forEach((element) => {
            result += calculateTotal(
                element.price,
                element.pricePerPackage,
                element.amount,
                element.quantitiesPerPackage
            );
        });
        return result;
    }, [state.articles]);

    const isMatchById = useCallback(
        (article_id) => {
            return state.articles.findIndex((article) => article._id === article_id) > -1;
        },
        [state.articles]
    );

    const findById = useCallback(
        (article_id) => {
            return state.articles.find((article) => article._id === article_id);
        },
        [state.articles]
    );

    return {
        state,
        addArticle,
        subtractArticle,
        removeArticles,
        isMatchById,
        findById,
        total,
        calculateTotal,
    };
};
