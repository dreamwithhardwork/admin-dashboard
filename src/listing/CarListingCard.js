import { AttachMoney, FavoriteBorder } from '@material-ui/icons';
import './CarListingCard.css'
const { Card, CardMedia, CardContent, CardActions, Typography } = require("@material-ui/core");

function CarListingCard(props) {
    console.log(props.model)
    console.log(props.model.imagesWithColors!==null?props.model.imagesWithColors[Object.keys(props.model.imagesWithColors)][0].url:"")
    return (
        <Card className="root">
            <CardMedia className="media" image={props.model.imagesWithColors!==null?props.model.imagesWithColors[Object.keys(props.model.imagesWithColors)][0].url:""} />
            <CardContent>
                <Typography style={{display:"flex",justifyContent:"space-between"}} gutterBottom variant="body1">
                   <div>2018 {props.model.make} {props.model.name}</div> <FavoriteBorder/>
                </Typography>
                <Typography variant="caption" color="textSecondary" component="p">
                   12,000 Kms * Petrol * Manual
               </Typography>
            </CardContent>
            <CardActions>
            <Typography  variant="body1">
                   <AttachMoney/>   7,38,000 /-
                </Typography>
            </CardActions>
        </Card>
    )
}

export default CarListingCard;