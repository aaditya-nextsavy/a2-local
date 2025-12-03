import React, { useState } from 'react'
import PhoneInput from 'react-phone-number-input'

const PhonenumberInputBox = () => {
      const [value, setValue] = useState()
  return (
    <>
       <PhoneInput
              className="phonenumber-popup-input"
              international
              countryCallingCodeEditable={false}
              defaultCountry="SA"
              value={value}
              onChange={setValue}
            />
    </>
  )
}

export default PhonenumberInputBox
