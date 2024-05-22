import "./InputBox.css"
function TextArea({value, onChange, placeholder, title, inputType, height = "100px", isFullScreen = false}) {

    return (<>
            <div className={isFullScreen? "textbox-container" : "input-container"}>
               {
                title && <p className="input-title">{title}</p>
               }
                <div className="input-box-container ">
                    <textarea type={inputType} className="input-text-style input-area-height" style={{ height:height}} placeholder={placeholder}  onChange={onChange} value={value}
                        icon={require('../../images/logo.svg').default}
                    />
                </div>
            </div>
    </>)
}
export default TextArea;