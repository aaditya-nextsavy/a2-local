import { useState } from "react";
const Checkbox = ({ label, checked, ...props }) => {
    const defaultChecked = checked ? checked : false;
    const [isChecked, setIsChecked] = useState(defaultChecked);

    return (
        <>
            <label className="d-flex align-items-center">
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => setIsChecked((prev) => !prev)}
                    className={isChecked ? "checked" : ""}
                    {...props}
                />
                <span className="checkboxlabel">{label}</span>
            </label>
        </>
    );
};
export default Checkbox;