export async function GET() {
	
	const host = process.env.API_URL;

	const data = [
		{url: host + "/general"},
		{url: host + "/skills"}, 
		{url: host + "/experience"},
		{url: host + "/education"},
		// {url: host + "/resume/XXX"}

	];

	return Response.json(data)
  }