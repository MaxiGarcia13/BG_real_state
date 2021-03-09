export const buildCategories = (categories) => {
    if (categories && Array.isArray(categories)) {
        return categories.map((item) => buildCategory(item.fields, item.sys.id));
    }

    return categories;
};

export const buildCategory = (item, id) => {
    return {
        ...item,
        _id: id,
    };
};
