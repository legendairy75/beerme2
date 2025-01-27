const BaseJoi = require('joi');
const { number } = require('joi');

const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
  type: 'string',
  base: joi.string(),
  messages: {
    'string.escapeHTML': '{{#label}} must not include HTML!'
  },
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const clean = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if (clean !== value) return helpers.error('string.escapeHTML', { value })
        return clean;
      }
    }
  }
});

const Joi = BaseJoi.extend(extension)

module.exports.postSchema = Joi.object({
  post: Joi.object({
    // author: Joi.string().required(),
    title: Joi.string().escapeHTML(),
    description: Joi.string().escapeHTML(),
    body: Joi.string().escapeHTML(),
  }).required()
});

module.exports.commentSchema = Joi.object({
  comment: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    body: Joi.string().required().escapeHTML()
  }).required()
})
