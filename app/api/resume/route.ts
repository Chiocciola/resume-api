export async function GET() {
	
	const data = {
		name: "Dmitriy Bondar",
		title: "Software Engineer",
		location: "Cupertino (CA)",
		phone: "408-306-2596",
		email: "di-man@yandex.ru",
		homePage: "https://www.linkedin.com/in/dmitriy-bondar/",
		sections: [
			{url:"/api/resume/skills"}, 
			{url:"/api/resume/summary"}, 
			{url:"/api/resume/experience"},
			{url:"/api/resume/education"}
		]
	};

	return Response.json(data)
  }