export async function GET() {

	const data = {
		title: "Languages",
		content: ["English", "Italian", "Russian"]};

	return Response.json(data)
  }