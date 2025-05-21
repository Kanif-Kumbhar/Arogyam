const ADDITIVE_INFO = {
	E330: {
		name: "Citric Acid",
		description:
			"A natural acid found in citrus fruits used as a preservative and flavor enhancer.",
		harm: "Generally recognized as safe (GRAS). No significant health risks at typical consumption levels.",
	},
	E503: {
		name: "Ammonium Carbonates",
		description:
			"Used as a leavening agent in baking and as an acidity regulator.",
		harm: "Safe when used within regulated limits; excessive intake may cause minor digestive discomfort.",
	},
	E500: {
		name: "Sodium Carbonates",
		description:
			"Commonly used as an acidity regulator and raising agent in food products.",
		harm: "Considered safe; large amounts might cause irritation or laxative effects.",
	},
	E1101: {
		name: "Enzymes (e.g., protease)",
		description:
			"Biological catalysts derived from plants, animals, or microbes to improve food processing.",
		harm: "Generally low risk; allergic reactions are rare but possible in sensitive individuals.",
	},

	// Common additives:
	E621: {
		name: "Monosodium Glutamate (MSG)",
		description: "Flavor enhancer that intensifies savory taste.",
		harm: "Safe for most people; some may experience mild symptoms like headaches (MSG symptom complex).",
	},
	E160a: {
		name: "Alpha-Carotene",
		description:
			"Natural pigment used as a colorant, found in carrots and other vegetables.",
		harm: "Non-toxic and safe as a food additive.",
	},

	// Harmful / Controversial additives:
	E102: {
		name: "Tartrazine",
		description: "Synthetic lemon-yellow dye used in foods and beverages.",
		harm: "May cause allergic reactions and hyperactivity in sensitive children.",
	},
	E110: {
		name: "Sunset Yellow FCF",
		description: "Synthetic orange dye used in candies, drinks, and snacks.",
		harm: "Linked to allergic reactions and hyperactivity; banned or restricted in some countries.",
	},
	E210: {
		name: "Benzoic Acid",
		description:
			"Preservative used to inhibit bacterial growth in acidic foods.",
		harm: "Safe in low doses; excessive intake linked to allergic reactions and asthma aggravation.",
	},
	E249: {
		name: "Potassium Nitrite",
		description:
			"Used as a preservative and color fixative in processed meats.",
		harm: "Can form carcinogenic nitrosamines if overused; regulated limits apply.",
	},
	E251: {
		name: "Sodium Nitrate",
		description: "Preservative for meats and fish.",
		harm: "Similar concerns as potassium nitrite regarding nitrosamine formation.",
	},
};

export default ADDITIVE_INFO;
