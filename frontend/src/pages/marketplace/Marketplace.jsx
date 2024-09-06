import React, { useEffect, useMemo, useState } from 'react'
import { Typography, Box, useTheme, Grid, InputBase, IconButton } from '@mui/material'
import { Phone, Mail } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
// import { setFoodData } from 'state';
import FarmequipmentsData from './FarmequipmentsData';
import AOS from "aos";
import "aos/dist/aos.css";
import "./market.css";

const FoodGalleryPage = () => {
    useEffect(() => {
        AOS.init({duration: 1000,delay: 300});
        AOS.refresh();
      }, []);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [
    pesticides
    ] = useMemo(() => {
    const [VA] = Array.from({length: 10}, () => []);
    FarmequipmentsData.map((item) => {
        if (item.category === "pesticides")
            VA.push(item);
    })
    return [VA];
  });

  const Pesticides = pesticides.filter((item) => {
    return search.toLowerCase() === "" ? item : item.name.toLowerCase().includes(search.toLowerCase())
  })

  const handleSearch = (event) => {
    setSearch(event.target.value);
  }

  const redirectToExternalResource = url => window.location.href = url
  
  return (
    <Box marginTop={5}>
        <Box m={5} marginLeft={9} sx={{
            border: "2px solid black",
            bgcolor: "white",
            width: "650px",
        }}>
            <InputBase 
            style={{
                ".css-yz9k0d-MuiInputBase-input": {
                    color: "black"
                }
            }}
            sx={{
                width: "600px",
                height: "40px",
                input: {
                    cursor: "text"
                },
                ".css-yz9k0d-MuiInputBase-input": {
                    color: "black",
                },
                paddingLeft: "1rem",
                fontSize: "1rem"
            }} 
            onChange={handleSearch}
            placeholder='Search for farm equipments'/>
            <IconButton>
                <SearchIcon/>
            </IconButton>
        </Box>
    {Pesticides.length > 0 && <Typography fontFamily="Poppins" fontSize="4rem" fontWeight="600" m={5} p={4}>
        Get your pesticides today
    </Typography>}
    {Pesticides.length > 0 && <Box m={5} p={4} marginTop={2} data-aos="fade-up" display="flex" width="90%">
      <Grid container spacing={5}>
              {Pesticides.map((item) => {
                  console.log(item);
                  
                  return (
                      <Grid item xs={4}>
                      <Box color="black" 
                      onClick={() =>
                          redirectToExternalResource(item.url)
                      }
                           height={700} bgcolor="rgb(255,255,255)" borderRadius={3} boxShadow="5px 10px 12px 1px black" className="itemcard" style={{cursor: "pointer"}}>
                          <img width="100%" src={item.src}/>
                          <Box width="90%" display="flex" justifyContent="space-between" marginLeft={1} color="black" style={{textShadow: "0px 0px 10px white"}}>
                              <Typography variant='h5' fontWeight="200" display="flex" flexDirection="column">
                                  {item.name}
                                  <Typography style={{fontSize: "0.7rem", marginBottom: "1rem"}} display="flex" flexDirection="row">
                                      <Typography m={0.2} style={{fontWeight: "100"}} marginRight={1} variant='h7'>
                                          {item.rating}
                                      </Typography>
                                      <Typography>
                                      ₹{item.price}
                                      </Typography>
                                  </Typography>
                              </Typography>
                          </Box>
                      </Box>
                      </Grid>
                  )
              })}
          </Grid>
  </Box>}
  </Box>
)
}

export default FoodGalleryPage