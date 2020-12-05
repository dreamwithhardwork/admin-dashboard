import { AttachMoney, FavoriteBorder } from '@material-ui/icons';
import './CarListingCard.css'
const { Card, CardMedia, CardContent, CardActions, Typography } = require("@material-ui/core");

function CarListingCard(props) {
    return (
        <Card className="root">
            <CardMedia className="media" image="https://storage.googleapis.com/automax-cars/model/hyundai/Black/1bde7f5c-e293-4cd1-a2a8-7a0527785479" />
            <CardContent>
                <Typography style={{display:"flex",justifyContent:"space-between"}} gutterBottom variant="body1">
                    <div>2018 Hyundai Creta SX</div> <FavoriteBorder/>
                </Typography>
                <Typography variant="caption" color="textSecondary" component="p">
                   12,000 Kms * Petrol * Manual
               </Typography>
            </CardContent>
            <CardActions>
            <Typography  variant="h6" component="h6">
                   <AttachMoney/>   7,38,000 /-
                </Typography>
            </CardActions>
        </Card>
    )
}

export default CarListingCard;