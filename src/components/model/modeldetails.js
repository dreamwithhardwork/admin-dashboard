import {  Card, CardActionArea, CardMedia, CardContent, Typography } from "@material-ui/core";
import './modelstyle.css'
import { connect } from "react-redux";
import {FlashOnOutlined, SpeedOutlined, AirlineSeatReclineExtra, DirectionsCar} from '@material-ui/icons';

const { default: Carousel } = require("react-material-ui-carousel");

function ModelDetails(props) {
    const colors = props.activeModel.imagesWithColors === undefined || props.activeModel.imagesWithColors === null 
     ?[]:Object.keys(props.activeModel.imagesWithColors);
    console.log(props.activeModel)
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
          <Typography style={{display:"flex",marginTop:"40px"}}>
              <div style={{position:"relative",display:"flex",flexDirection:"column"}}>
              <Typography variant="body2" color="textSecondary" component="p"> <FlashOnOutlined style={{fontSize:"40px"}} /></Typography>
              <Typography variant="body2" color="textSecondary" component="p" className="spec-icon">BHP</Typography>
                <Typography variant="body2" color="textSecondary" component="p" className="spec-icon-view">{props.bhp}</Typography>
              </div>

              <div style={{position:"relative",display:"flex",flexDirection:"column",marginLeft:"40px"}}>
              <Typography variant="body2" color="textSecondary" component="p"> <DirectionsCar style={{fontSize:"40px"}} /></Typography>
              <Typography variant="body2" color="textSecondary" component="p" className="spec-icon">Engine(cc)</Typography>
              <Typography variant="body2" color="textSecondary" component="p" className="spec-icon-view">{props.enginecc}</Typography>
              </div>

              <div style={{position:"relative",display:"flex",flexDirection:"column",marginLeft:"40px"}}>
              <Typography variant="body2" color="textSecondary" component="p"> <SpeedOutlined style={{fontSize:"40px"}} /></Typography>
              <Typography variant="body2" color="textSecondary" component="p" className="spec-icon">Mileage</Typography>
              <Typography variant="body2" color="textSecondary" component="p" className="spec-icon-view">{props.mileage}</Typography>
              </div>

              <div style={{position:"relative",display:"flex",flexDirection:"column",marginLeft:"40px"}}>
              <Typography variant="body2" color="textSecondary" component="p"> <AirlineSeatReclineExtra style={{fontSize:"40px"}} /></Typography>
              <Typography variant="body2" color="textSecondary" component="p" className="spec-icon">Seats</Typography>
              <Typography variant="body2" color="textSecondary" component="p" className="spec-icon-view">{props.seat}</Typography>
              </div>
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