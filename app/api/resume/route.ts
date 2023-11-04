export async function GET() {
	
	const data = {
		name: "Dmitriy Bondar",
		title: "Software Engineer",
		location: "Cupertino, CA",
		phone: "408-306-2596",
		email: "di-man@yandex.ru",
		linkedin: "https://www.linkedin.com/in/dmitriy-bondar/",
		summary: "Technical leader with over 15 years of experience specialized in .NET and User Interface design. Skilled in executing large scale projects at various levels of maturity. Proficient throughout all phases of software development — from concept to delivery and maintenance. Proven ability to bridge business and technical requirements in product and feature launches.",
		sections: [
			{url:"/api/resume/skills"}, 
			{url:"/api/resume/experience"},
			{url:"/api/resume/education"}
		]
	};

	return Response.json(data)
  }