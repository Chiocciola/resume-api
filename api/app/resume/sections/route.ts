export async function GET() {
	
	const host = "https://api.dmitriy-bondar.dev";

	const data = [
			{url: host + "/resume/sections/skills"}, 
			{url: host + "/resume/sections/experience"},
			{url: host + "/resume/sections/education"},
			{url: host + "/resume/sections/languages"},
		];

	return Response.json(data)
  }