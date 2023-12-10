export async function GET() {
		
	const host = process.env.API_URL;

    const nsu = {
        institution: "Novosibirsk State University",
        logo: {url: host + '/nsu.svg'},
        degree: "Bachelor's degree, Computer Engineering",
        location: "Novosibirsk, Russia",
        startDate: "1998",
        endDate: "2004",
    }

    const vki = {
        institution: "College of Informatics",
        logo: {url: host + '/vki.svg'},
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