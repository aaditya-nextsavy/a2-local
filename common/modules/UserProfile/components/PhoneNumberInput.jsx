import React, { useState } from 'react'
import PhoneInput from 'react-phone-number-input'

const PhoneNumberInput = () => {
    const [value, setValue] = useState()
    localStorage.setItem("PhoneNumberInput", value)

    return (
        <>
            <PhoneInput
                international
                countryCallingCodeEditable={false}
                defaultCountry="SA"
                value={value}
                onChange={setValue} />
        </>
    )
}

export default PhoneNumberInput
