export const validateDate = (fecha) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    return dateRegex.test(fecha)
}

export const validateDateMessage = 'El formato de la fecha debe ser YYYY-MM-DD'
export const validateDateMessage2 = 'La fecha de salida no puede ser menor a la de ingreso'