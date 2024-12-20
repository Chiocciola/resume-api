export async function GET() {
	
	const host = process.env.API_URL;

	const softwareEngineerV = {
		title: "Software Engineer V, Manager",
        location: "Santa Clara, CA",
        startDate: "Jul 2021",
        summary: "Spearheading the development of Desktop UI for Applied Materials’ semiconductor equipment.",
        highlights: [
            "Managing a US-based team (2 devs + 1 UI/UX) and matrix-managing a team of 20 devs in India.",
            "Successfully established and scaled a high-performing team in India within a tight timeframe to offset the loss of an EU-based team, ensuring a seamless transition and zero disruptions.",
`Proactively pinpointed and prioritized three transformative areas of focus:\n
 - Advancing error detection from run-time to earlier stages, ultimately targeting compile-time.\n
 - Enhancing diagnostics by exposing internal GUI states and incorporating specialized views for in-depth system insights.\n
 - Transitioning from imperative to declarative programming, optimizing code efficiency by leveraging framework capabilities.`,
            "Thoroughly documenting the existing behavior of the software, clarifying system functions, identifying inconsistencies, and paving the way for optimized solutions."
        ]    
    };

    const softwareEngineerIV = {
		title: "Software Engineer IV",
        location: "Santa Clara, CA",
        startDate: "Feb 2019",
        endDate: "Jul 2021",
        summary: "Developed Desktop UI components for Applied Materials’ semiconductor equipment.",
        highlights: [      
            "Designed and developed a UI Test Framework to record, playback user actions, and assert UI states, facilitating build validation.",
            "Extensively refactoring Recipe Editor: Removed code duplication and discrepancies in the behavior of similar components, leading to improved code quality and setting the stage for automated testing.",
            "Introduced Block Recipe Editor: streamlining complex recipe creation using multiple reusable blocks. The feature reduces amount of repeated data, and simplify visual perception of recipe structure.",
            "Designed and implemented UI part of Modular Clean Configuration: a novel approach to configure cleans using 'lego blocks' and a visual boolean expression editor, enhancing the configurability."
        ]
    };

    const appliedMaterials = {
        company: "Applied Materials",
        logo: {url: host + '/amat.svg'},

        positions: [softwareEngineerV, softwareEngineerIV]
    }

    const softwareEngineerBaccini = {
		title: "Software Engineer",
        location: "Treviso, Italy",
        startDate: "Sep 2012",
        endDate: "Feb 2019",
        summary: "Developed Desktop UI and Back-end components for solar equipment.",
        highlights: [
            "Implemented proxy layer with Beckhoff TwinCAT PLC.",
            "Introduced custom graphical rendering for smooth animation.",
            "Designed and rolled out SECS/GEM software interface."  
        ]
    };

    const baccini = {
        company: "Baccini S.p.A.",
        logo: {url: host + '/baccini.svg'},

        positions: [softwareEngineerBaccini]
    }

    const softwareEngineerGeolink = {
		title: "Software Engineer",
        location: "Saint Petersburg, Russia",
        startDate: "Sep 2006",
        endDate: "Feb 2012",
    };

    const geolink = {
		company: "Geolink Technologies",
        logo: {url: host + '/geolink.svg'},
        positions: [softwareEngineerGeolink]
    }

    const softwareEngineerTdisie = {
		title: "Software Engineer",
        location: "Novosibirsk, Russia",
        startDate: "Jan 2001",
        endDate: "Sep 2006",
    };

    const tdisie = {
		company: "Technological Design Institute of Scientific Instrument Engineering",
        logo: {url: host + '/tdisie.png'},
        positions: [softwareEngineerTdisie]
    }

    const data = {
        title: "Experience",
        content: [appliedMaterials, baccini, geolink, tdisie]
    };  

	return Response.json(data)
  }