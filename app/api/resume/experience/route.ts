export async function GET() {
	
	const softwareEngineerV = {
		title: "Software Engineer V",
		company: "Applied Materials",
        location: "Santa Clara (CA)",
        startDate: "2021-07-01",
        endDate: null,
        highlights: [
            "Spearheading the development of Desktop UI for Applied Materials’ semiconductor equipment.",
            "Managing a US-based team (2 devs + 1 UI/UX) and matrix-managing a team of 20 devs in India.",
            "Successfully established and scaled a high-performing team in India within a tight timeframe to offset the loss of an EU-based team, ensuring a seamless transition and zero disruptions.",
            "Proactively pinpointed and prioritized three transformative areas of focus:",
            "- Advancing error detection from run-time to earlier stages, ultimately targeting compile-time.",
            "- Enhancing diagnostics by exposing internal GUI states and incorporating specialized views for in-depth system insights.",
            "- Transitioning from imperative to declarative programming, optimizing code efficiency by leveraging framework capabilities.",
            "Thoroughly documenting the existing behavior of the software, clarifying system functions, identifying inconsistencies, and paving the way for optimized solutions."
        ]    
    };

    const softwareEngineerIV = {
		title: "Software Engineer IV",
		company: "Applied Materials",
        location: "Santa Clara (CA)",
        startDate: "2019-02-01",
        endDate: "2021-07-01",
        highlights: [
            "Developed Desktop UI components for semiconductor equipment",
            "Designed and developed a UI Test Framework to record, playback user actions, and assert UI states, facilitating build validation.",
            "Extensively refactoring Recipe Editor: Removed code duplication and discrepancies in the behavior of similar components, leading to improved code quality and setting the stage for automated testing.",
            "Introduced Block Recipe Editor: streamlining complex recipe creation using multiple reusable blocks. The feature reduces amount of repeated data, and simplify visual perception of recipe structure.",
            "Designed and implemented UI part of Modular Clean Configuration: a novel approach to configure cleans using 'lego blocks' and a visual boolean expression editor, enhancing the configurability."
        ]
    };

    const data = {
        title: "Experience",
        content: [softwareEngineerV, softwareEngineerIV]
    };  

	return Response.json(data)
  }