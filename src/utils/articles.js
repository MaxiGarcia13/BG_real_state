export const buildArticles = (articles) => {
    if (articles && Array.isArray(articles)) {
        return articles.map((item) => buildArticle(item.fields, item.sys.id));
    }

    return articles;
};

export const buildArticle = (item, id) => {
    return {
        ...item,
        _id: id,
        // categories: buildCategories(item.categories),
        // company: { ...item.company, name: item.company.fields.name },
        title: item.name,
        mainPicture: { url: `https:${item.images[0].fields.file.url}`, alt: item.images[0].fields.title },
        pictures: item.images.map((img) => ({
            url: `https:${img.fields.file.url}`,
            alt: img.fields.title,
        })),
        priceWithSign: `€${item.price.toFixed(2)}`,
        year: new Date(item.created).getFullYear(),
    };
};
