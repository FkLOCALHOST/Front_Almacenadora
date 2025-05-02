export const validateNumero = (contraseñaT) => {
    const regex = /\d/

    return regex.test(contraseñaT)
}

export const validateNumeroMessage = 'La contraseaña necesita como miimo un numero'