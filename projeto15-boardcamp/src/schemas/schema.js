import joi from 'joi';

const categoriesSchema=joi.object({
    name:joi.string().empty(),
});

const gamesSchema=joi.object({
    name:joi.string()
    .empty().required(),
    image:joi.string()
    .required(),
    stockTotal:joi.number()
    .integer()
    .min(1)
    .required(),
    pricePerDay:joi.number()
    .integer()
    .min(1)
    .required(),
    categoryId:joi.number()
    .integer()
    .min(1)
    .required(),
});


export {categoriesSchema,gamesSchema};