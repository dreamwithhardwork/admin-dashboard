import '../content/mainstyle.css';
import SideNav from '../sidenav/sinenav';
import Body from '../body/body';
import '../body/bodystyle.css'

function Main(){
    return (
        <div className="autoride-main">
            <SideNav/>
            <Body/>
        </div>
    )
}

export default Main;