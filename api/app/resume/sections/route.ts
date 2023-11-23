export async function GET() {
	
	const host = process.env.API_URL;

	const data = [
		{url: host + "/resume/sections/general"},
		{url: host + "/resume/sections/skills"}, 
		{url: host + "/resume/sections/experience"},
		{url: host + "/resume/sections/education"},
		// {url: host + "/resume/sections/1"}

	];

	return Response.json(data)
  }