export const buildTypes = (types) => {
    if (types && Array.isArray(types)) {
        return types.map((item) => buildType(item.fields, item.sys.id));
    }

    return types;
};

export const buildType = (item, id) => {
    return {
        ...item,
        _id: id,
    };
};
