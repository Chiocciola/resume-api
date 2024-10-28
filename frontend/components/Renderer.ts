import General from '../public/components/General';
import Skills from '../public/components/Skills';
import Experience from '../public/components/Experience';
import Education from '../public/components/Education';
import Error from '../public/components/Error';

import { Section } from './api';

import type { JSX } from "react";

const mapping : {[key: string]: (section: Section) => JSX.Element}
    = {General: General, Skills: Skills, Experience: Experience, Education: Education, Error: Error};

export default function Render(section: Section) : JSX.Element
{
    return mapping[section.title](section);
}