import "./Empty.css"
import Lottie from 'react-lottie';
function Empty({ message, animationData }) {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    return (<div className="empty-container">
        <Lottie
            options={defaultOptions}
            height={400}
            width={400}
        />
        <p className="empty-text">{message}</p>
    </div>)
}
export default Empty
