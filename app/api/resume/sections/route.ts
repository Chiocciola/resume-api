export async function GET() {
	
	const data = [
			{url:"/api/resume/sections/skills"}, 
			{url:"/api/resume/sections/experience"},
			{url:"/api/resume/sections/education"}
		];

	return Response.json(data)
  }