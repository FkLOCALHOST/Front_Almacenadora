export const validateSigno = (contraseñaT) => {
    const regex = /[@$!%*?&]/

    return regex.test(contraseñaT)
}

export const validateSignoMessage = 'La contraseña necesita como minimo un caracter especial'