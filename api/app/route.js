export async function GET() {
	
	const host = process.env.API_URL;

	const data = [
		{url: host + "/general",    description: "General resume information such as name, title, and contact details"},
		{url: host + "/skills",     description: "Hard and soft skills, technologies and programming languages"}, 
		{url: host + "/experience", description: "Information about professional background"},
		{url: host + "/education" , description: "Information about educational background"},
	];

	return Response.json(data)
  }