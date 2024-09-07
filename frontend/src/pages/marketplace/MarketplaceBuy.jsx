import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import axios from "axios"
import { Box, Button, Typography } from '@mui/material';

const MarketplaceBuy = () => {
    const prodData = useSelector((state) => state.productData);
    const priceBreakdown = [];
    const [prodInfo, setProdInfo] = useState("");
    priceBreakdown.push({"totalPrice": prodData.price});
    console.log(priceBreakdown);
    
    async function getWikiResponse(url, config) {
        const res = await axios.get(url, config);
        return res;
      };
    const handlePay = () => {
        try {
              axios.post("http://localhost:3001/", {priceBreakdown})
          }
          catch(err){
              console.log(err);
          }
    }
    //   useEffect(() => {
    //       const WIKI_URL = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exsentences=15&exlimit=3&exintro&titles=${foodData.query}&explaintext=1&format=json&formatversion=2&origin=*`
    //       const wikiConfig = {
    //         timeout: 6500 * 6500
    //     };
    //       getWikiResponse(WIKI_URL, wikiConfig).then(result => {
    //       setProdInfo(result.data.query.pages[0].extract);
    //     })
    //   }, [prodData.query]);
  return (
    <>
        <Box display="flex" flexDirection="column" alignItems="center">
                <Box m={2} p={4} border={`2px solid black`} boxShadow={`5px 7px 2px 2px black`}>
                    <img width={1100} src={prodData.src} />
                </Box>
            </Box>
            <Box display="flex" justifyContent="space-between" marginX={12} marginY={5}>
                <Box display="flex" flexDirection="column" width="100%">
                    <Typography marginBottom={2} style={{fontWeight: "200", fontSize: "1rem"}}>
                        {prodData.name}
                    </Typography>
                    <Typography variant='h6' marginBottom={2} color="#c2c2c2" fontWeight="200">
                        {prodData.category}
                    </Typography>
                    {/* <Typography variant='h3b' marginBottom={2}>
                        {foodInfo}
                    </Typography> */}
                    <Typography display="flex" flexDirection="row" marginBottom={2.5}>
                        <Typography variant='h2b' fontWeight="100">
                            {prodData.rating}
                        </Typography>
                        <Typography color="#ff8400" fontSize="1.2rem" m={1.3}>
                            {prodData.rating >= 1.0 && <i class="bi bi-star-fill" style={{marginRight: "3px"}}></i>}
                            {prodData.rating >= 2.0 && <i class="bi bi-star-fill" style={{marginRight: "3px"}}></i>}
                            {prodData.rating > 2.0 && prodData.rating < 3.0 && <i class="bi bi-star-half" style={{marginRight: "3px"}}></i>}
                            {prodData.rating >= 3.0 && <i class="bi bi-star-fill" style={{marginRight: "3px"}}></i>}
                            {prodData.rating > 3.0 && prodData.rating < 4.0 && <i class="bi bi-star-half" style={{marginRight: "3px"}}></i>}
                            {prodData.rating >= 4.0 && <i class="bi bi-star-fill" style={{marginRight: "3px"}}></i>}
                            {prodData.rating > 4.0 && prodData.rating < 5.0 && <i class="bi bi-star-half" style={{marginRight: "3px"}}></i>}
                            {prodData.rating === 5.0 && <i class="bi bi-star-fill" style={{marginRight: "3px"}}></i>}                                                    
                        </Typography>
                        <Typography display="flex" flexDirection="row">
                            <Typography marginTop={2}>
                                ₹ 
                            </Typography>
                            <Typography fontSize="2rem">
                                {prodData.price}
                            </Typography>
                        </Typography>
                        {/* <Button variant="contained" onClick={handleRateit} sx={{
                            backgroundColor: theme.palette.mode === "dark" ? "black" : "white",
                            border: theme.palette.mode === "dark" ? "2px solid white" : "",
                            height: "40px",
                            margin: "0.5rem",
                            textTransform: "none",
                            color: theme.palette.mode === "dark" ? dark : "#111",
                            "&:hover": {
                            backgroundColor: theme.palette.mode === "dark" ? "white" : "#0062ff",
                            color: theme.palette.mode === "dark" ? "black" : "white",
                        }
                        }
                        
                        }>
                            {rated ? (<Box display="flex" flexDirection="row">
                                <Box color={ theme.palette.mode === "light" ? "#00c742" : "#00ff44"}>
                                    <CheckIcon/>
                                </Box>
                                <Typography variant="h7" fontWeight="400">
                                    Rated {rating}
                                </Typography>
                            </Box>) : (
                                <Typography>
                                    Ate it? Rate it
                                </Typography>
                            )}
                        </Button>
                        <Button variant="contained" onClick={handleSubmitListAdd} sx={{
                            backgroundColor: theme.palette.mode === "dark" ? "black" : "white",
                            border: theme.palette.mode === "dark" ? "2px solid white" : "",
                            height: "40px",
                            margin: "0.5rem",
                            textTransform: "none",
                            color: theme.palette.mode === "dark" ? dark : "#111",
                            "&:hover": {
                            backgroundColor: theme.palette.mode === "dark" ? "white" : "#0062ff",
                            color: theme.palette.mode === "dark" ? "black" : "white",
                        }
                        }
                        
                        }>
                            {ListIndexes.includes(prodData.id) ? (
                                <Box display="flex" flexDirection="row" marginTop={1}>
                                <Box color={ theme.palette.mode === "light" ? "#00c742" : "#00ff44"}>
                                    <CheckIcon/>
                                </Box>    
                                <Typography>
                                    Added to list
                                </Typography>
                            </Box>
                            ) : 
                            (<Box display="flex" flexDirection="row" marginTop={1}>
                                <Box>
                                    <BookmarkBorderIcon/>
                                </Box>    
                                <Typography>
                                    Add to list
                                </Typography>
                            </Box>)} */}
                        {/* </Button> */}
                    </Typography>
                    {
                    <Box>
                        <form action='http://localhost:3001/pay' method='post'>
                    <input type="text" onChange={handlePay} value={priceBreakdown}/>
                    <input type='submit' style={{
                        width: "225px",
                        height: "40px",
                        backgroundColor: "#005eff",
                        border: "1px solid white",
                        borderRadius: "4px",
                        color: "white",
                        fontStyle: "italic",
                    }} onClick={handlePay} value="CONTINUE TO PAY WITH PAYPAL"/>
                </form>
                    <Box>
                        {/* {rateClicked && <Box display="flex" flexDirection="row">
                            <Box>
                                <Rating
                                onClick={handleRating}
                                onPointerEnter={handleEnter}
                                onPointerLeave={handleLeave}
                                onPointerMove={handleMove}
                                />
                            </Box>
                            <Typography variant='h5' fontWeight="200" m={1}>
                                Rate {prodData.name}
                            </Typography>
                        </Box>}
                        {rateHover && <Typography variant='h7' fontWeight="200" marginLeft={9}>
                            {RateEquivalentMessage}
                        </Typography>} */}
                    </Box>
                        </Box>
                        }
                </Box>
            </Box>
    </>
  )
}

export default MarketplaceBuy;
