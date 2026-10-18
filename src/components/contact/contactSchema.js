import Joi from 'joi';

// Messages are i18n keys (rendered with t() in FormField), so errors follow the site language.
const msg = (key) => `contactPage.errors.${key}`;

export const contactSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required().messages({
    'string.empty': msg('nameRequired'),
    'any.required': msg('nameRequired'),
    'string.min': msg('nameMin'),
    'string.max': msg('nameMax'),
  }),
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .max(150)
    .required()
    .messages({
      'string.empty': msg('emailRequired'),
      'any.required': msg('emailRequired'),
      'string.email': msg('emailInvalid'),
      'string.max': msg('emailInvalid'),
    }),
  phone: Joi.string()
    .trim()
    .min(5)
    .max(25)
    .pattern(/^[0-9+\-\s()]+$/)
    .allow('')
    .messages({
      'string.min': msg('phoneInvalid'),
      'string.max': msg('phoneInvalid'),
      'string.pattern.base': msg('phoneInvalid'),
    }),
  subject: Joi.string().allow(''),
  message: Joi.string().trim().min(5).max(2000).required().messages({
    'string.empty': msg('messageRequired'),
    'any.required': msg('messageRequired'),
    'string.min': msg('messageMin'),
    'string.max': msg('messageMax'),
  }),
  // honeypot — hidden from real users
  website: Joi.string().allow('').max(200),
});

export const CONTACT_INITIAL_VALUES = {
  name: '',
  email: '',
  phone: '',
  subject: 'general',
  message: '',
  website: '',
};

export const SUBJECT_KEYS = ['general', 'project', 'career', 'other'];

// Formik `validate` adapter (first error per field)
export const validateContact = (values) => {
  const { error } = contactSchema.validate(values, { abortEarly: false });
  if (!error) return {};

  return error.details.reduce((acc, d) => {
    const field = d.path[0];
    return acc[field] ? acc : { ...acc, [field]: d.message };
  }, {});
};
