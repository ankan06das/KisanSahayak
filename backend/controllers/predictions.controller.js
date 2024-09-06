import Prediction from "../models/predictions.model.js";

export const uploadAndPredict = async (req, res) => {
	try {
		const {
			userId,
			url,
			location,
			rainAct,
			rainNorm,
			rainDep,
			soil_N,
			soil_K,
			soil_P,
			soil_pH,
			temp,
			hum
		} = req.body;

		const newPrediction = new Prediction({
			userId,
			url,
			location,
			rainAct,
			rainNorm,
			rainDep,
			soil_N,
			soil_K,
			soil_P,
			soil_pH,
			temp,
			hum,
			disease: "Lol",
			recomm: ["pesti1", "pesti2"]
		});

		if (newPrediction) {
			const prediction = await newPrediction.save();
			res.status(201).json(prediction);
		} else {
			res.status(400).json({ error: "Invalid parameters" });
		}
	} catch (err) {
		console.log("Error in Generating Predictions", err.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
}