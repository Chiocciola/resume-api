export async function GET() {
	
	// Test data, "location" is missing
	const data = {
        title: "General",
        content: {
			name: "Dmitriy Bondar",
			title: "Software Engineer",
			linkedin: {url: "https://www.linkedin.com/in/dmitriy-bondar/"},
			summary: "Technical leader with over 15 years of experience specialized in .NET and User Interface design. Skilled in executing large scale projects at various levels of maturity. Proficient throughout all phases of software development — from concept to delivery and maintenance. Proven ability to bridge business and technical requirements in product and feature launches.",
		}
	};  

	return Response.json(data)
  }