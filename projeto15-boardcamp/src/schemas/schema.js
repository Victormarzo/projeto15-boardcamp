import joi from 'joi';

const categoriesSchema=joi.object({
    name:joi.string().trim()
});
export {categoriesSchema};