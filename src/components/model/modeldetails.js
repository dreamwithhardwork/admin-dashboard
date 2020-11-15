import { Button, Paper, Card, CardActionArea, CardMedia, CardContent, Typography } from "@material-ui/core";
import './modelstyle.css'
import { connect } from "react-redux";

const { default: Carousel } = require("react-material-ui-carousel");

function ModelDetails(props) {
    const colors = props.activeModel.imagesWithColors === undefined?[]:Object.keys(props.activeModel.imagesWithColors);
    console.log(colors)
    return (

     props.activeModel===""?<div>Select a model</div>:
        <Card className="carosel">
            <CardActionArea style={{ display: "flex" }}>
                <Carousel animation="slide" autoPlay={true} indicators={true} >
                    {
                       colors.length>0? props.activeModel.imagesWithColors[colors[0]].map((item,key) =>  <CardMedia component="img" image={item} title="" />)
                       :<CardMedia/>
                    }
                    
                </Carousel>
            </CardActionArea>
            <CardContent style={{flexGrow:1}}>
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