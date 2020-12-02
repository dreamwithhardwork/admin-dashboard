import {  Card, CardActionArea, CardMedia, CardContent, Typography } from "@material-ui/core";
import './modelstyle.css'
import { connect } from "react-redux";

const { default: Carousel } = require("react-material-ui-carousel");

function ModelDetails(props) {
    const colors = props.activeModel.imagesWithColors === undefined || props.activeModel.imagesWithColors === null 
     ?[]:Object.keys(props.activeModel.imagesWithColors);
    console.log(colors)
    return (

    props.activeModel===""?<div style={{display:"flex",color:"red",justifyContent:"center",alignItems:"center",height:"80vh"}}>Add Models for selected <h3>
        &nbsp;{props.activeBrand}.....
        </h3> </div>:
        <Card className="card-root">
            <CardActionArea className="carosel-model">
                <Carousel animation="slide"  autoPlay={true} indicators={false} >
                    {
                       colors.length>0? props.activeModel.imagesWithColors[colors[0]].map((item,key) =>  <CardMedia component="img" image={item.url} title="" />)
                       :<CardMedia/>
                    }
                    
                </Carousel>
            </CardActionArea>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {props.activeBrand+" "+props.activeModel.name} 
          </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                {props.activeModel.description.substring(0,70)}
          </Typography>
            </CardContent>
        </Card>


    )
}

const mapStateToProps = state => {
    return{
        ...state
    }
}



export default connect(mapStateToProps,null)(ModelDetails);