export async function GET() {
		
    const nsu = {
        institution: "Novosibirsk State University",
        logo: {url: '/nsu.png'},
        degree: "Bachelor's degree, Computer Engineering",
        location: "Novosibirsk, Russia",
        startDate: "1998",
        endDate: "2004",
    }

    const vki = {
        institution: "College of Informatics",
        logo: {url: '/nsu.png'},
        degree: "Associate degree, Computer Engineering",
        location: "Novosibirsk, Russia",
        startDate: "1996",
        endDate: "2000",
    }

    const data = {
        title: "Education",
        content: [nsu, vki]
    };  

	return Response.json(data)
  }