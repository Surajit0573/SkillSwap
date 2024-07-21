const Joi = require('joi');

module.exports.courseSchema = Joi.object({
  course: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required().min(0),
    category: Joi.string().required(),
    benefits: Joi.string().required(),
    requirements: Joi.string().required(),
    createdAt: Joi.date().default(Date.now)
  }).required(),
  tags: Joi.array().items(Joi.string()).required(),
  url: Joi.string().required()
});

module.exports.reviewSchema = Joi.object({
    comment: Joi.string().required(),
    rating: Joi.number().required().min(1).max(5),
});

module.exports.userSchema = Joi.object({
  email: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required()

});


module.exports.teacherSchema = Joi.object({
  domain: Joi.string().required(),
  qualifications: Joi.string().required(),
  yoe: Joi.number().required(),
});

module.exports.profileSchema = Joi.object({
  fullname: Joi.string().required(),
  about: Joi.string().required(),
  dp: Joi.string().required(),
  links: Joi.object({
  website: Joi.string().required(),
  twitter: Joi.string().required(),
  linkedin: Joi.string().required(),}),
  skills: Joi.array().items(Joi.string()).required(),
});