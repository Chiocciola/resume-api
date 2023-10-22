export async function GET() {
	
	const data = {
		name: "Dmitriy Bondar",
		title: "Senior Software Engineer",
		location: "Cupertino (CA)",
		phone: "408-306-2596",
		email: "di-man@yandex.ru",
		homePage: "https://www.linkedin.com/in/dmitriy-bondar/",
		sections: ["/api/resume/summary", "/api/resume/experience", "/api/resume/education", "/api/resume/skills"],
	};

	return Response.json(data)
  }