import React from 'react'
import Camera from '../../components/Camera';
import { Box, TextField } from '@mui/material';
import ThreeInputForm from './ThreeInputForm.jsx';



// const CssTextField = withStyles({
//     root: {
//     '& label': {
//         color: 'white',
//     },
//     '& label.Mui-focused': {
//         color: 'white',
//     },
//     '& .MuiInput-underline:after': {
//         borderBottomColor: 'white',
//     },
//     '& .MuiOutlinedInput-root': {
//         '& fieldset': {
//             borderColor: 'white',
//         },
//         '&:hover fieldset': {
//             borderColor: 'white',
//         },
//         'fieldset': {
//             borderColor: 'white',
//         },
//         'input': {
//             color: 'white'
//         },
//     '&.Mui-focused fieldset': {
//     borderColor: 'white',
//     },
//     },
//     }
//     })(TextField);

const MarketplaceSell = () => {
  return (
    <>
        <div style={{backgroundColor: "white"}}>
            
            <ThreeInputForm/>
        </div>
    </>
  )
}

export default MarketplaceSell;
//capture url
//form -user price, his name, retailer or farmer 