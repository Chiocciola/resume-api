export async function GET() {
	
	const data = {
        title: "General",
        content: {
			name: "Dmitriy Bondar",
			title: "Software Engineer",
			location: "Cupertino, CA",
			// phone: "408-306-2596",
			// email: "di-man@yandex.ru",
			linkedin: {url: "https://www.linkedin.com/in/dmitriy-bondar/"},
			summary: `Experienced technical leader with over 15 years of experience, specialized in .NET and Front-end
			development. Known for successfully leading large-scale projects from inception to completion and
			managing cross-functional teams across the globe. Skilled in UI/UX redesigns, improving code quality,
			and transitioning technologies seamlessly. Proficient in C#, C++, TypeScript, JavaScript, React, Next.js,
			and ASP.NET. Proven ability to align technical solutions with business needs, driving successful product
			launches and improving team performance.`,
		}
	};  

	return Response.json(data)
  }