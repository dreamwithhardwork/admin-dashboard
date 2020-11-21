import { connect } from "react-redux";
import { useEffect, useState } from "react";
import ElementComponenet from "./elementcomponenent";

const { Container, DialogTitle, Divider } = require("@material-ui/core");

function TabPanel(props){


    const[carProperty, setCarProperty] = useState(props.activeCarProperty===""?[]:props.carProperties[props.activeCarProperty])

    useEffect(() => {
        setCarProperty(props.activeCarProperty===""?[]:props.carProperties[props.activeCarProperty])
    },[props.activeCarProperty])

    return (
        <Container>
            <DialogTitle>{props.activeCarProperty} properties</DialogTitle>
            <Divider/>
            {
                carProperty.map((item,index) => {
                    return <ElementComponenet data = {item}/>
                })
            }
        </Container>
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

export default connect(mapStateToProps,mapDispatchToProps)(TabPanel)