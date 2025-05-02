export const validatePhone = (phone) => /^\d{8}$/.test(phone);

export const validatePhoneMessage = 'El teléfono debe contener exactamente 8 dígitos.';
