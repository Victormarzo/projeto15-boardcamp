import joi from 'joi';

const categoriesSchema=joi.object({
    name:joi.string().empty().trim(),
});

const gamesSchema=joi.object({
    name:joi.string()
    .empty().required().trim(),
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

const costumersSchema=joi.object({
    name:joi.string()
    .empty().required().trim(),
    phone:joi.string()
    .min(10)
    .max(11)
    .required(),
    birthday:joi.date().
    less('now').
    required(),
    cpf:joi.string()
    .min(11)
    .max(11)
    .required(),

});

const rentalsSchema=joi.object({
    customerId:joi.number()
    .integer()
    .min(1),
    gameId:joi.number()
    .integer()
    .min(1),
    daysRented:joi.number()
    .integer()
    .min(1),
})


export {categoriesSchema,gamesSchema,costumersSchema,rentalsSchema};