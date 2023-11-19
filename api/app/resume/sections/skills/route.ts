export async function GET() {

	const data = {
		title: "Skills",
		content: [
			{kind: "Languages", skills: ["C#", "C++", "Scala", "Python", "JavaScript", "TypeScript"]},
			{kind: "Web technologies", skills: ["React", "Next.js", "Firebase", "REST API", "CSS", "HTML"]},
			{kind: "Semi technologies & standards", skills: ["TwinCAT PLC", "SECS", "GEM", "SEMI standards"]},
			{kind: "Soft skills", skills: ["Team leadership", "Technical leadership", "Mentoring", "Cross-functional collaboration"]},
			{kind: "Spoken languages", skills: ["English", "Italian", "Russian"]},		
		]
	};

	return Response.json(data)
  }