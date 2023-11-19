import General from '../public/components/General';
import Skills from '../public/components/Skills';
import Experience from '../public/components/Experience';
import Education from '../public/components/Education';
import Error from '../public/components/Error';

const x = {General: General, Skills: Skills, Experience: Experience, Education: Education, Error: Error};

export default function X(section)
{
    return x[section.title](section);
}