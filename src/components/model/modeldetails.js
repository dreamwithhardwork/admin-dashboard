import { Button, Paper, Card, CardActionArea, CardMedia, CardContent, Typography } from "@material-ui/core";
import './modelstyle.css'

const { default: Carousel } = require("react-material-ui-carousel");

function ModelDetails() {
    return (


        <Card className="carosel">
            <CardActionArea style={{ display: "flex" }}>
                <Carousel indicators={false} >
                    <CardMedia component="img" image="https://stimg.cardekho.com/images/carexteriorimages/930x620/Kia/Seltos/6226/1580962193955/front-left-side-47.jpg"
                        title="Contemplative Reptile" />
                </Carousel>
            </CardActionArea>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    Kia Seltos
          </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    The compact SUV is available in two trims: Tech Line and GT Line. The Tech Line is available in five
          </Typography>
            </CardContent>
        </Card>


    )
}

export default ModelDetails