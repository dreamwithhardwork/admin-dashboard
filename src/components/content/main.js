import '../content/mainstyle.css';
import SideNav from '../sidenav/sinenav';
import Body from '../body/body';
import '../body/bodystyle.css'
import { connect } from 'react-redux';

function Main(props){
    return (
        <div className="autoride-main">
            {
                props.login ? <SideNav/> :""
            }
            <Body/>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        ...state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Main);