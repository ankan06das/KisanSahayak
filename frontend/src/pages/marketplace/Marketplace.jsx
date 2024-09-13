import { useEffect, useMemo, useState } from 'react'
import { Typography, Box, Grid, InputBase, IconButton, Button } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";
import "./market.css";
import { setProductData } from '../../state/reducer';
import useGetItems from '../../hooks/useGetItems';

const FoodGalleryPage = () => {
	const { loading, items } = useGetItems();
	const [products, setProducts] = useState([]);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [search, setSearch] = useState("");

	useEffect(() => {
		AOS.init({ duration: 1000, delay: 300 });
		AOS.refresh();
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		const getItems = async () => {
			const data = await items();
			setProducts(data);
		}
		getItems();
	}, []);

	// Filter products based on search input
	const filteredProducts = useMemo(() => {
		return products.filter((item) =>
			item.product_name.toLowerCase().includes(search.toLowerCase())
		);
	}, [products, search]);

	return (
		<Box marginTop={5}>
			<Box m={5} marginLeft={9} sx={{
				border: "2px solid black",
				bgcolor: "white",
				width: "650px",
			}}>
				<InputBase
					sx={{
						width: "600px",
						height: "40px",
						input: {
							cursor: "text",
							paddingLeft: "1rem",
							fontSize: "1rem",
							color: "black",
						},
					}}
					placeholder='Search for farm equipments'
					value={search}
					onChange={(e) => {setSearch(e.target.value)}}
				/>
				<IconButton>
					<SearchIcon />
				</IconButton>
				<Button variant="contained" onClick={() => navigate("sell")} sx={{
					height: "40px",
					margin: "0.5rem",
					color: "#000",
					"&:hover": {
						backgroundColor: "#000"
					}
				}}>
					SELL
				</Button>
			</Box>
			{loading && <Typography fontFamily="Poppins" fontSize="2rem" fontWeight="500" m={5} p={4}>
				Get your pesticides today...
			</Typography>}
			{filteredProducts.length > 0 && (
				<Box m={5} p={4} marginTop={2} data-aos="fade-up" display="flex" width="90%">
					<Grid container spacing={5}>
						{filteredProducts.map((item, index) => (
							<Grid item xs={4} key={index}>
								<Box
									color="black"
									onClick={() => {
										navigate(`/marketplace/buy/${item._id}`)
									}}
									height={500}
									bgcolor="rgb(255,255,255)"
									borderRadius={3}
									boxShadow="5px 10px 12px 1px black"
									className="itemcard"
									style={{ cursor: "pointer" }}
								>
									<img width="100%" src={item.image_url} alt={item.product_name} />
									<Box
										width="90%"
										display="flex"
										justifyContent="space-between"
										marginLeft={1}
										color="black"
										style={{ textShadow: "0px 0px 10px white" }}
									>
										<Typography variant="h5" fontWeight="200" display="flex" flexDirection="column">
											{item.product_name}
											<Typography style={{ fontSize: "0.7rem", marginBottom: "1rem" }} display="flex" flexDirection="row">
												<Typography m={0.2} style={{ fontWeight: "100" }} marginRight={1} variant="h7">
													<p>
														<span>{item.seller_name} | </span>
														<span>{item.seller_type} | </span>
														<span>{item.updatedAt}</span>
													</p>
												</Typography>
												<Typography>
													₹{item.price}
												</Typography>
											</Typography>
										</Typography>
									</Box>
								</Box>
							</Grid>
						))}
					</Grid>
				</Box>
			)}
		</Box>
	)
}

export default FoodGalleryPage;
