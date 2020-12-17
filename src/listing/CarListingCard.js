import { AttachMoney, FavoriteBorder } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import './CarListingCard.css'
const { Card, CardMedia, CardContent, CardActions, Typography } = require("@material-ui/core");

function CarListingCard(props) {

    const history = useHistory();

    const handleClick = () => {
        history.push("/viewModel/"+props.model.name+"/"+" "+"/"+" ");
    }

    return (
        <Card className="root" onClick={handleClick}>
            <CardMedia className="media" image={props.model.imagesWithColors!==undefined?props.model.imagesWithColors[Object.keys(props.model.imagesWithColors)][0].url:""} />
            <CardContent>
                <Typography style={{display:"flex",justifyContent:"space-between"}} gutterBottom variant="body1">
                   <div>{props.model.fromYear}  {props.model.make} {props.model.name}</div> <FavoriteBorder/>
                </Typography>
                <Typography variant="caption" color="textSecondary" component="p">
                    {props.model.fuelTypes===undefined?"":props.model.fuelTypes.join(" / ")}
               </Typography>
            </CardContent>
            <CardActions>
            <Typography  variant="body1">
            {[new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
        }).format(props.model.minPrice), " - ", new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
            }).format(props.model.maxPrice)]}
                </Typography>
            </CardActions>
        </Card>
    )
}

export default CarListingCard;