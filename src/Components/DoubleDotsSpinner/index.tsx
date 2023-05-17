import doubleDotsSpinerStyle from './index.css';


export default ({color="#a19f9f"}) => <div className={doubleDotsSpinerStyle.spinner}>
    <div className={doubleDotsSpinerStyle.dot1} style={{backgroundColor: color}}></div>
    <div className={doubleDotsSpinerStyle.dot2} style={{backgroundColor: color}}></div>
</div>;
