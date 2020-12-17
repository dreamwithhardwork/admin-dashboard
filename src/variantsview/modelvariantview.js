import { AirlineSeatReclineExtra, CheckCircleOutlineOutlined, CloseOutlined, DirectionsCar, ExpandMore, FlashOnOutlined, SpeedOutlined } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import Carousel from 'react-material-ui-carousel';
import { Link, useParams } from 'react-router-dom';
import { SERVICE_URL } from '../components/constants/constants';
import { getRequest } from '../components/constants/headers';
import SimpleBackdrop from '../components/messages/backdrop';
import {getVariant} from '../components/variant/specifications/carpropertiesservices'
import '../variantsview/modelview.css'
const { Container, Paper, Card, CardActionArea, CardContent, CardMedia, Typography, ListItemText, TextField, Accordion, AccordionSummary, AccordionDetails, Divider } = require("@material-ui/core");
const { Fragment, useState, useRef, useEffect } = require("react");


const specifications =  [
    {
        "id": "5fbfeda637b2af5f45b4c831",
        "name": "Engine ",
        "properties": [
            {
                "name": "Engine Type",
                "propertyDataType": "STRING"
            },
            {
                "name": "Fast Charging",
                "propertyDataType": "BOOLEAN",
                "status": "KEY FEATURE",
                "value": "YES"
            },
            {
                "name": "Displacement (cc)",
                "propertyDataType": "STRING",
                "status": "KEY SPECIFICATION",
                "value": "1197"
            },
            {
                "name": "Max Power",
                "propertyDataType": "STRING",
                "value": "81.86bhp@6000rpm"
            },
            {
                "name": "Max Torque",
                "propertyDataType": "STRING",
                "value": "114.74nm@4200rpm"
            },
            {
                "name": "No. of cylinder",
                "propertyDataType": "STRING"
            },
            {
                "name": "Valves Per Cylinder",
                "propertyDataType": "STRING"
            },
            {
                "name": "Turbo Charger",
                "propertyDataType": "BOOLEAN"
            },
            {
                "name": "Battery Warranty",
                "propertyDataType": "BOOLEAN"
            },
            {
                "name": "Transmission Type",
                "propertyDataType": "STRING"
            },
            {
                "name": "Gear Box",
                "propertyDataType": "STRING"
            }
        ]
    },
    {
        "id": "5fbfee2437b2af5f45b4c833",
        "name": "Fuel & Performance",
        "properties": [
            {
                "name": "Fuel Type",
                "propertyDataType": "STRING",
                "value": "PETROL"
            },
            {
                "name": "Mileage (ARAI)",
                "propertyDataType": "STRING",
                "status": "KEY SPECIFICATION",
                "value": "20.35"
            }
        ]
    }
];


function ModelVariantView(props) {

    const [expanded, setExpanded] = useState(false)
    const [backDrop,setBackDrop] = useState(false)
    const {name,variantName,fuelType} = useParams();
    const [model, setModel] = useState({});
    const [variant,setVariant] = useState({});

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded?panel:false);
    }

    useEffect(async ()=>{
        setBackDrop(true)
        try{
            let res = await fetch(SERVICE_URL.GET_MODEL_BY_NAME+name);
            let body = await res.json();
            setModel(body);

            body.variants.map(item => {
                if(item.variantName === variantName && fuelType == item.fuelType){
                    setVariant(item);
                    console.log(item)
                }
            })
            if(Object.keys(variant).length===0){
                setVariant(body.variants.length!==0?body.variants[0]:{})
            }
        }
        catch(e){}
        setTimeout(()=>{
            setBackDrop(false)
            console.log("close")
        },1000)
    },[])

    return (
        <div style={{ display: "flex", flexDirection: "column", margin: "20px", width: "100%" }}>
            <Paper className="keyfeatures">
                <Container>
                    <Card className="card-root">
                        <CardActionArea className="carosel-model">
                            <Carousel animation="slide" autoPlay={true} indicators={false} >
                                 {
                                     (model.imagesWithColors  === undefined || model.imagesWithColors  === null )? <CardMedia/>:
                                     model.imagesWithColors[Object.keys(model.imagesWithColors)[0]].map(item => <CardMedia component="img" image={item.url}/>)
                                     
                                 }
                            </Carousel>
                        </CardActionArea>
                        <CardContent>
                            <div style={{ display: "flex", flexDirection: "column", marginLeft: "40px" }}>
                                <Typography style={{ fontWeight: "bold" }} variant="h5">
                                    {model.make
                                     + " "+model.name + " "+ variantName+" " +fuelType}
                               </Typography>
                                <Autocomplete onChange={(e, value) => console.log("uiiu")} size="small"
                                    style={{ marginRight: "30px", width: 300, marginTop: "30px" }} id="combo-box-de9mo" options={["variantt1", "variant2"]}
                                    getOptionLabel={option => { return option; }}
                                    disableClearable={true}
                                    renderOption={(option) => (
                                        <Fragment>
                                            <ListItemText style={{ color: "black" }}> {option}</ListItemText>
                                        </Fragment>
                                    )}
                                    renderInput={(params) => { return <TextField value={"select"} {...params} label="Change variant" variant="outlined" /> }} />

                                <div style={{ display: "flex", marginTop: "20px" }}>
                                    <Typography variant="body2" color="textSecondary" component="p"> Ex-showroom Price</Typography>
                                    <Link style={{ marginLeft: "5px", textDecoration: "none" }}>
                                        {
                                            new Intl.NumberFormat('en-IN', {
                                                style: 'currency',
                                                currency: 'INR',
                                                minimumFractionDigits: 0
                                            }).format(variant.exShowroomPrice)
                                        }
                                    </Link>
                                </div>

                                <Typography style={{ display: "flex", marginTop: "40px" }}>
                                    <div style={{ position: "relative", display: "flex", flexDirection: "column" }}>
                                        <Typography variant="body2" color="textSecondary" component="p"> <FlashOnOutlined style={{ fontSize: "40px" }} /></Typography>
                                        <Typography variant="body2" color="textSecondary" component="p" className="spec-icon">BHP</Typography>
                                        <Typography variant="body2" color="textSecondary" component="p" className="spec-icon-view"></Typography>
                                    </div>

                                    <div style={{ position: "relative", display: "flex", flexDirection: "column", marginLeft: "60px" }}>
                                        <Typography variant="body2" color="textSecondary" component="p"> <DirectionsCar style={{ fontSize: "40px" }} /></Typography>
                                        <Typography variant="body2" color="textSecondary" component="p" className="spec-icon">Engine(cc)</Typography>
                                        <Typography variant="body2" color="textSecondary" component="p" className="spec-icon-view">--</Typography>
                                    </div>

                                    <div style={{ position: "relative", display: "flex", flexDirection: "column", marginLeft: "60px" }}>
                                        <Typography variant="body2" color="textSecondary" component="p"> <SpeedOutlined style={{ fontSize: "40px" }} /></Typography>
                                        <Typography variant="body2" color="textSecondary" component="p" className="spec-icon">Mileage</Typography>
                                        <Typography variant="body2" color="textSecondary" component="p" className="spec-icon-view">--</Typography>
                                    </div>

                                    <div style={{ position: "relative", display: "flex", flexDirection: "column", marginLeft: "60px" }}>
                                        <Typography variant="body2" color="textSecondary" component="p"> <AirlineSeatReclineExtra style={{ fontSize: "40px" }} /></Typography>
                                        <Typography variant="body2" color="textSecondary" component="p" className="spec-icon">Seats</Typography>
                                        <Typography variant="body2" color="textSecondary" component="p" className="spec-icon-view">--</Typography>
                                    </div>
                                </Typography>
                            </div>
                        </CardContent>
                    </Card>
                </Container>
            </Paper>


            <div className="variants">
                <Container>
                    <Typography style={{ fontWeight: "bold", marginBottom: "20px" }} variant="h6">
                        {model.make + " "+model.name + " "+ variantName+" " } Specifications
                   </Typography>

              {
                  variant.specifications === undefined ? "":
                  variant.specifications.map((item, index) => {
                    return <Accordion square  expanded={expanded===item.name } onChange={handleChange(item.name)}>
                     <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1d-content" id="panel1d-header">
                     <Typography variant="h6">{item.name}</Typography>
                     </AccordionSummary>
                     <AccordionDetails style={{display:"flex",flexDirection:"column"}}>
                            <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-between"}}>
                                 {
                                     item.properties.map(property => {
                                                return <Row data={property}/>
                                     })
                                 }
                                 
                            </div>
                           
                     </AccordionDetails>
                    </Accordion>
                   })
              }
                   
                </Container>
            </div>
            <SimpleBackdrop open={backDrop} />
        </div>
    )
}

function Row(props){
    return(
        <div style={{width:"40%",marginTop:"20px"}}>
        <div style={{display:"flex",justifyContent:"space-between"}}>
        <Typography variant="body2">{props.data.name}</Typography>
         <Typography variant="body2">
             {props.data.value==="YES"?<CheckCircleOutlineOutlined style={{color:"green"}}/>:props.data.value === "NO"? <CloseOutlined color="secondary" />
             :props.data.value===""||props.data.value===undefined?"NA":props.data.value}
         </Typography>
        </div>
        <Divider style={{margin:"10px 0px 10px 0px"}}/>
       </div>
    )
}


export default ModelVariantView;