export async function GET() {
	
	const host = process.env.API_URL;

	const data = [
		{url: host + "/test/general"},
		{url: host + "/resume/XXX"}

	];

	return Response.json(data)
  }