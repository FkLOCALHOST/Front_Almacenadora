export const validateDPI = (dpi) => {
    const regex = /^\d{13,13}$/

    return regex.test(dpi)
}

export const validateDPIMessage = 'El DPI de contener 13 caracteres, sin espacios ni guiones ni letras'