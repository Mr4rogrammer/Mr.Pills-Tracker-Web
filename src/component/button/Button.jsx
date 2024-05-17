import "./Button.css"



function Button({ title, onClick }) {
    return (<>

        <div className="button-wrapper" onClick={onClick}>
            <p className="button-text">{title}</p>
        </div>


    </>)


}

export default Button;