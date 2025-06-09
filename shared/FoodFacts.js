const facts = [
	// Scientific
	"Eating a variety of colorful fruits and vegetables can help improve your health.",
	"Protein helps repair body tissues and build muscles.",
	"Drinking water before meals can help control appetite.",
	"Healthy fats are essential for brain function.",
	"Fiber-rich foods help regulate digestion.",
	"Spices like turmeric have anti-inflammatory properties.",
	"Eating slowly helps you digest food better.",
	"Whole grains are better than refined grains for sustained energy.",
	"Dark leafy greens are packed with iron and folate.",
	"Omega-3 fatty acids help reduce inflammation.",
	"Vitamin D is essential for calcium absorption and bone health.",
	"Fermented foods support gut health and immunity.",
	"Green tea contains antioxidants that may boost metabolism.",
	"Excess sugar consumption is linked to metabolic disorders.",
	"Eating breakfast improves concentration and energy levels.",
	"Magnesium-rich foods help with muscle relaxation and sleep.",
	"Bananas are a good source of potassium and help prevent cramps.",
	"Excess salt can increase blood pressure.",
	"Vitamin C boosts immune function and aids iron absorption.",
	"Staying hydrated supports healthy skin and kidneys.",

	// Ayurvedic
	"Triphala is known in Ayurveda to support digestion and detoxification.",
	"Drinking warm water in the morning can stimulate digestion.",
	"Turmeric milk (Golden Milk) is traditionally used to boost immunity.",
	"Ghee is considered a digestive and brain tonic in Ayurveda.",
	"Eating seasonal fruits aligns the body with nature's cycles.",
	"Fennel seeds after meals aid digestion and freshen breath.",
	"Ashwagandha is an adaptogen that helps manage stress.",
	"Amla (Indian gooseberry) is rich in Vitamin C and boosts immunity.",
	"Avoiding cold water with meals supports better digestion.",
	"Ginger tea helps with nausea and improves Agni (digestive fire).",
	"Ayurveda emphasizes mindful eating and chewing thoroughly.",
	"Tulsi (holy basil) is known for its anti-stress properties.",
	"Cumin seeds support gut health and reduce bloating.",
	"Honey should never be cooked or added to hot water directly.",
	"Eating your largest meal at midday aligns with peak digestion.",
	"Copper-charged water (stored overnight in copper) is said to balance doshas.",
	"Applying oil to the body (Abhyanga) improves circulation and reduces Vata imbalance.",
	"Avoiding incompatible food combinations (like milk + fruit) is key in Ayurveda.",
	"Soaking almonds overnight improves digestibility and nutrient absorption.",

	// Blended facts
	"Chyawanprash, a traditional Ayurvedic jam, enhances overall vitality.",
	"Neem leaves support skin health and natural detoxification.",
	"Sattvic foods like fresh fruits and whole grains promote mental clarity.",
	"Avoiding distractions like screens while eating aids mindful digestion.",
	"Eating at regular intervals supports metabolic balance.",
	"Overeating even healthy food can lead to indigestion and toxin buildup.",
	"Resting for a few minutes after meals helps digestion.",
	"Including all six tastes (sweet, sour, salty, pungent, bitter, astringent) in a meal balances doshas.",
	"Cooking food with love and attention is believed to increase its nourishment.",
	"A calm state of mind while eating improves nutrient absorption.",
];

export function getRandomFact() {
	const index = Math.floor(Math.random() * facts.length);
	return facts[index];
}
