import Joi from 'joi';

export const MAX_CV_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_CV_EXTENSIONS = ['pdf', 'doc', 'docx'];
const ALLOWED_CV_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

export const APPLY_INITIAL_VALUES = {
  name: '',
  phone: '',
  email: '',
  branch: 'any',
  experience: '',
  message: '',
  cv: null,
  website: '', // honeypot
};

// Messages are i18n keys (translated in the field components), so errors follow the site language.
const err = (key) => `careers.apply.errors.${key}`;

const fieldsSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required().messages({
    'string.empty': err('required'),
    'any.required': err('required'),
    'string.min': err('nameInvalid'),
    'string.max': err('nameInvalid'),
  }),
  phone: Joi.string().trim().pattern(/^[+\d\s()-]{7,}$/).max(25).required().messages({
    'string.empty': err('required'),
    'any.required': err('required'),
    'string.pattern.base': err('phone'),
    'string.max': err('phone'),
  }),
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .max(150)
    .allow('')
    .messages({
      'string.email': err('email'),
      'string.max': err('email'),
    }),
  branch: Joi.string().allow(''),
  experience: Joi.number().integer().min(0).max(60).allow('').messages({
    'number.base': err('experience'),
    'number.integer': err('experience'),
    'number.min': err('experience'),
    'number.max': err('experience'),
  }),
  message: Joi.string().trim().max(2000).allow('').messages({
    'string.max': err('messageMax'),
  }),
  website: Joi.string().allow('').max(200),
});

const validateCv = (file) => {
  if (!file) return null;

  const extension = file.name.split('.').pop()?.toLowerCase();
  const typeOk = !file.type || ALLOWED_CV_TYPES.includes(file.type);

  if (!ALLOWED_CV_EXTENSIONS.includes(extension) || !typeOk) return err('cvType');
  if (file.size > MAX_CV_SIZE) return err('cvSize');
  return null;
};

// Formik `validate` adapter (first error per field)
export const validateApplication = (values) => {
  const { cv, ...fields } = values;
  const { error } = fieldsSchema.validate(fields, { abortEarly: false });

  const errors = error
    ? error.details.reduce((acc, d) => {
        const field = d.path[0];
        return acc[field] ? acc : { ...acc, [field]: d.message };
      }, {})
    : {};

  const cvError = validateCv(cv);
  if (cvError) errors.cv = cvError;

  return errors;
};
