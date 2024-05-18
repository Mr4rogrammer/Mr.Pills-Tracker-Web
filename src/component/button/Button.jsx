import "./Button.css"
function Button({ title, onClick , isLoading}) {

    return (<>

        <button className="button-with-spinner" onClick={onClick} disabled={isLoading}>
            {isLoading ? (
                <div className="spinner-container">
                    <svg className="spinner" viewBox="0 0 50 50">
                        <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="4" />
                    </svg>
                </div>
            ) : (
                title
            )}
        </button>
    </>)


}

export default Button;