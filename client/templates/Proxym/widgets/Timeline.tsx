import { ListItem, Section, WorkExperience } from "@reactive-resume/schema";
import { filter } from "lodash";
import React from 'react';

import { useAppSelector } from '@/store/hooks';

function isWork(item: ListItem): item is WorkExperience {
  return (item as WorkExperience) !== undefined;
}

const Timeline: React.FC<any> = ({name = ''}) => {
  const sections: WorkExperience[] = useAppSelector((state) => {
    return filter(state.resume.present.sections, (value: Section, key: string) => value.type === "work")
      .map(section => section.items).reduce((prev, current) => prev.concat(current), [])
      .filter(isWork);
  });

  return (
    <>
      <div>Timeline</div>
      {sections.map(section => <p key={Math.random()}>{section.name} {section?.date?.start}</p>)}
    </>
  )
};

export default Timeline;
