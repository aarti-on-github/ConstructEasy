import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Link } from '@mui/material';
import { convertLength } from '@mui/material/styles/cssUtils';
import {Link} from 'react-router-dom'

export default function Body() {
  return (
    <>
    <div className='cards'>
    <Card sx={{ maxWidth: 345,marginTop:'2rem',marginBottom:'2rem'}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="230"
          image='/img1.png'
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Attendance Management
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>

    </div>
     <Card sx={{ maxWidth: 345,marginTop:'2rem',marginBottom:'2rem' }}>
     <CardActionArea>
       <CardMedia
         component="img"
         height="230"
         image="/img4.png"
         alt="green iguana"
       />
       <CardContent>
         <Typography gutterBottom variant="h5" component="div">
           Worker Profile
         </Typography>
       </CardContent>
     </CardActionArea>
   </Card>

    <Link to="/manageworker">
    <Card sx={{ maxWidth: 345,marginTop:'2rem',marginBottom:'2rem'}}>
    <CardActionArea>
      <CardMedia
        component="img"
        height="238"
        image="/img3.png"
        alt="green iguana"
        sx={{backgroundSize:convertLength}}
        />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Manage Worker
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
  </Link>

   <Card sx={{ maxWidth: 345 ,marginTop:'2rem',marginBottom:'2rem'}}>
   <CardActionArea>
     <CardMedia
       component="img"
       height="230"
       image="/img2.png"
       alt="   sx=green iguana"
     />
     <CardContent>
       <Typography gutterBottom variant="h5" component="div">
         Add work location
       </Typography>
     </CardContent>
   </CardActionArea>
 </Card>
 </>
  );
}