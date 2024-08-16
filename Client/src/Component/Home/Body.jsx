import Category from './Category';
import Content from './Content';
import '../../style/Body.css';
export default function Body() {
    return (
        <>
            <div className="bodyContainer">
                <Category />
                <Content />
            </div>
        </>
    )
}