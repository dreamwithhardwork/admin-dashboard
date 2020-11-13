import '../make/makestyle.css';
import AutoRideToolBar from './toolbar';
import Brand from './brand';
import { Paper } from '@material-ui/core';
import React, { useState } from 'react';
import NewBrandModel from './newbrandform';

function Make(props){

    const makeListCo = [{"id":"5faa7a56f48e841b00747d8f","name":"hyundai","logoUrl":"https://storage.googleapis.com/automax-cars/main/edfb42fa-2d1d-4306-9d31-66381a0dc152.png","type":"CAR","popular":true},{"id":"5faa7ac0f48e841b00747d90","name":"honda","logoUrl":"https://storage.googleapis.com/automax-cars/main/66b64fd3-7862-457b-be7a-bd3f212f7309.png","type":"CAR","popular":true},{"id":"5faa7e01f48e841b00747d92","name":"tata","logoUrl":"https://storage.googleapis.com/automax-cars/main/79922093-ae86-4cc0-8ac2-bfae03a8668c.png","type":"CAR","popular":true},{"id":"5faa7e14f48e841b00747d93","name":"skoda","logoUrl":"https://storage.googleapis.com/automax-cars/main/e157faba-24a5-4f0f-9bad-c1bcf36be129.png","type":"CAR","popular":true},{"id":"5faa7e29f48e841b00747d94","name":"toyata","logoUrl":"https://storage.googleapis.com/automax-cars/main/b4fa7ed4-c6d7-467f-8b6a-5fe6a278c8df.png","type":"CAR","popular":true},{"id":"5faa7e41f48e841b00747d95","name":"volkswagen","logoUrl":"https://storage.googleapis.com/automax-cars/main/e123c5c9-9b23-4c21-9985-cefa4d299776.png","type":"CAR","popular":true},{"id":"5faacb85f48e841b00747da2","name":"kia","logoUrl":"https://storage.googleapis.com/automax-cars/main/5deae8a6-d66c-46c0-aa5f-6c46ed6a9e4a.jpeg","type":"CAR","popular":true},{"id":"5faae354f48e841b00747da5","name":"maruti suzuki","logoUrl":"https://storage.googleapis.com/automax-cars/main/32ef3ee0-a3ca-4a85-8ca9-a17845e9b022.png","type":"CAR","popular":true},{"id":"5faae3d3f48e841b00747da6","name":"renault","logoUrl":"https://storage.googleapis.com/automax-cars/main/14358150-df51-4244-a726-4d59dd2409e9.png","type":"CAR","popular":false},{"id":"5faae3e5f48e841b00747da7","name":"mahindra","logoUrl":"https://storage.googleapis.com/automax-cars/main/5fd18a43-4f08-4063-92fa-6e69c35abab0.png","type":"CAR","popular":false},{"id":"5faae3f9f48e841b00747da8","name":"mercedes benz","logoUrl":"https://storage.googleapis.com/automax-cars/main/d1839671-7542-475b-929d-161402f63313.png","type":"CAR","popular":false},{"id":"5faae407f48e841b00747da9","name":"nissan","logoUrl":"https://storage.googleapis.com/automax-cars/main/c35fa07c-a0be-4b75-8ac8-0c0179882157.png","type":"CAR","popular":false},{"id":"5faae419f48e841b00747daa","name":"chevrolet","logoUrl":"https://storage.googleapis.com/automax-cars/main/7ba82edf-a366-4220-acfc-9e61ae76fcb3.png","type":"CAR","popular":false},{"id":"5faae428f48e841b00747dab","name":"ford","logoUrl":"https://storage.googleapis.com/automax-cars/main/32424ece-362e-486a-8c77-d7b8d1ec88db.png","type":"CAR","popular":true},{"id":"5faccb0ba37e2c31148b6024","name":"MG","logoUrl":"https://storage.googleapis.com/automax-cars/main/914f90c9-c1c8-4b5a-aef1-6bec9e471fd0.webp","type":"CAR","popular":true},{"id":"5faccb28a37e2c31148b6025","name":"dutson","logoUrl":"https://storage.googleapis.com/automax-cars/main/e8eb8223-4681-4798-b210-a63b093efc44.webp","type":"CAR","popular":true},{"id":"5faccb67a37e2c31148b6026","name":"jeep","logoUrl":"https://storage.googleapis.com/automax-cars/main/8f718e5b-e1cd-444e-925c-926d857ed0d9.webp","type":"CAR","popular":true},{"id":"5faccbc5a37e2c31148b6027","name":"isuzu","logoUrl":"https://storage.googleapis.com/automax-cars/main/23387774-7219-4f67-abb2-c438e78becab.webp","type":"CAR","popular":true},{"id":"5faccc06a37e2c31148b6028","name":"BMW","logoUrl":"https://storage.googleapis.com/automax-cars/main/eaf08bd5-e563-4bd8-a418-fa9f33124a78.webp","type":"CAR","popular":true}]
    const [makeList,setMakeList] = useState(makeListCo);

    const updateBrands = (newBrand) => {
        let newMakeList = [...makeList]
        newMakeList.push(newBrand);
        setMakeList(newMakeList);
    }


    return(
        <Paper elevation={0} className="makeroot">
            <AutoRideToolBar/>
            <div className="makelist">
                {
                         makeList.map((make) => <Brand key={make.id} src={make.logoUrl} data={make} update={updateBrands}/>)
                }
            </div>
            <NewBrandModel update={updateBrands}/>
        </Paper>
        
    )

}

export default Make;