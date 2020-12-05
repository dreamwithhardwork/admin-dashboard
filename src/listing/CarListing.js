import Filter from "./filter";

const { Container } = require("@material-ui/core");
const { default: CarListingCard } = require("./CarListingCard");

function CarListing(props){
    return(
        <Container style={{marginTop:"20px", display:"flex",flexWrap:"wrap",flexDirection:"column"}}>
            <Filter/>
            <div style={{width:"100%", display:"flex",flexWrap:"wrap", overflow:"auto"}}>
            <CarListingCard/>
            <CarListingCard/>
            <CarListingCard/>
            <CarListingCard/>
            <CarListingCard/>
            <CarListingCard/>
            <CarListingCard/>
            <CarListingCard/>
            <CarListingCard/>
            <CarListingCard/>
            <CarListingCard/>
            <CarListingCard/>
            <CarListingCard/>
            <CarListingCard/>
            <CarListingCard/>
            <CarListingCard/>
            <CarListingCard/>
            <CarListingCard/>
            </div>
        </Container>
    )
}

export default CarListing;