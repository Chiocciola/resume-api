export async function GET() {
	// const res = await fetch('https://data.mongodb-api.com/...', {
	//   headers: {
	// 	'Content-Type': 'application/json',
	// 	'API-Key': process.env.DATA_API_KEY,
	//   },
	// })
	// const data = await res.json()
   
	const data = {
		name: "Dmitriy Bondar",
		title: "Senior Software Engineer",
		location: "Cupertino (CA)",
		phone: "408-306-2596",
		email: "di-man@yandex.ru",
		homePage: "https://www.acme-corp.com",
		sections: ["/api/resume/summary", "/api/resume/experience", "/api/resume/education", "/api/resume/skills"],
	};

	return Response.json(data)
  }