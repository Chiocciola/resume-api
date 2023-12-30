import General from '../public/components/General';
import Skills from '../public/components/Skills';
import Experience from '../public/components/Experience';
import Education from '../public/components/Education';
import Error from '../public/components/Error';

export interface Section
{
    title: string;
    content: any;
}

const mapping : {[key: string]: (section: Section) => JSX.Element}
    = {General: General, Skills: Skills, Experience: Experience, Education: Education, Error: Error};

export default function Render(section: Section)
{
    return mapping[section.title](section);
}