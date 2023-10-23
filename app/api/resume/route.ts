export async function GET() {
	
	const data = {
		name: "Dmitriy Bondar",
		title: "Software Engineer",
		location: "Cupertino (CA)",
		phone: "408-306-2596",
		email: "di-man@yandex.ru",
		homePage: "https://www.linkedin.com/in/dmitriy-bondar/",
		sections: ["/api/resume/skills", "/api/resume/summary", "/api/resume/experience"]//, "/api/resume/education"],
	};

	return Response.json(data)
  }