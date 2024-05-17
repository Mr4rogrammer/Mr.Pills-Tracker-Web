import "./InputBox.css"

function TextArea({value, onChange, placeholder, title, inputType}) {
    return (<>

            <div className="input-container">
                <p className="input-title">{title}</p>
                <div className="input-box-container">
                    <textarea type={inputType} className="input-text-style input-area-height" placeholder={placeholder}  onChange={onChange} value={value}
                        icon={require('../../images/logo.svg').default}
                    />
                </div>

            </div>
    </>)
}

export default TextArea;