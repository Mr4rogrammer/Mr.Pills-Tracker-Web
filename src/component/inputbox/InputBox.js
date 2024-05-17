import "./InputBox.css"

function InputBox({value, onChange, placeholder, title, inputType}) {
    return (<>

            <div className="input-container">
                <p className="input-title">{title}</p>
                <div className="input-box-container">
                    <input type={inputType} className="input-text-style" placeholder={placeholder}  onChange={onChange} value={value}
                        icon={require('../../images/logo.svg').default}
                    />
                </div>

            </div>
    </>)
}

export default InputBox;