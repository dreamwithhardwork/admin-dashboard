import { Button, Paper, Card, CardActionArea, CardMedia, CardContent, Typography } from "@material-ui/core";
import './modelstyle.css'

const { default: Carousel } = require("react-material-ui-carousel");

function ModelDetails() {
    return (


        <Card className="carosel">
            <CardActionArea style={{ display: "flex" }}>
                <Carousel indicators={false} >
                    <CardMedia component="img" image="https://stimg.cardekho.com/images/carexteriorimages/930x620/Renault/KWID/7426/1580286379253/front-left-side-47.jpg"
                        title="Contemplative Reptile" />
                </Carousel>
            </CardActionArea>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    Renault Kwid
          </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Renault has launched a new base-spec RXL variant for the Kwid 1.0-litre.
          </Typography>
            </CardContent>
        </Card>


    )
}

export default ModelDetails