export async function GET() {

	const data = {
		section: "Skills",
		content: [
		{kind: "Languages", skills: ["C#", "C++", "Scala", "Python"]},
		{kind: "Web technologies", skills: ["JavaScript", "React", "Next.js", "Firebase", "REST API"]},
		{kind: "Insdustry standarts", skills: ["TwinCAT PLC", "SECS", "GEM", "SEMI standards"]},
		{kind: "Soft skills", skills: ["Team leadership", "Technical leadership", "Mentoring", "Cross-functional collaboration"]}
	]};

	return Response.json(data)
  }