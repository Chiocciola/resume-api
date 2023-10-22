export async function GET() {

	const data = {
		section: "Skills",
		content: [
		{skillGroup: "Languages", skills: ["C#", "C++", "Scala", "Pyton"]},
		{skillGroup: "Web technologies", skills: ["JavaScript", "React", "Next.js", "Firebase"]},
		{skillGroup: "Insdustry standarts", skills: ["TwinCAT PLC", "SECS", "GEM", "SEMI standards"]},
		{skillGroup: "Soft skills", skills: ["Team leadership", "Technical leadership", "Mentoring", "Cross-functional collaboration"]}
	]};

	return Response.json(data)
  }