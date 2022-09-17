import { SkillTypeProps } from "../../types";

const Skill = ({ skill }: SkillTypeProps) => {
  return (
    <li
      className="px-3 py-2 bg-indigo-100 rounded flex gap-2 items-center justify-between transition-transform hover:translate-y-[2px] cursor-pointer "
      key={skill.id}
    >
      {skill.name}
      <span className="bg-indigo-300 rounded-full w-6 h-6 flex items-center justify-center text-white text-sm">
        6
      </span>
    </li>
  );
};

export default Skill;
