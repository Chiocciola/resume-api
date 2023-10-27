export async function GET() {
		
    const nsu = {
        institution: "Novosibirsk State University",
        logo: {url: '/nsu.png'},
        degree: "Bachelor's degree, Computer Engineering",
        location: "Novosibirsk, Russia",
        startDate: "1998",
        endDate: "2004",
    }

    const data = {
        title: "Education",
        content: [nsu]
    };  

	return Response.json(data)
  }