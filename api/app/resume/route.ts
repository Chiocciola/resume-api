export async function GET() {
	
	const host = process.env.API_URL;

	const data = [
		{url: host + "/resume/general"},
		{url: host + "/resume/skills"}, 
		{url: host + "/resume/experience"},
		{url: host + "/resume/education"},
		// {url: host + "/resume/XXX"}

	];

	return Response.json(data)
  }