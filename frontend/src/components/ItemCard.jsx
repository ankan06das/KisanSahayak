/* eslint-disable react/prop-types */
import { Typography, Box, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom';

const ItemCard = ({item}) => {
	const navigate = useNavigate();

	return (
		<Grid item xs={4}>
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
	)
}

export default ItemCard;