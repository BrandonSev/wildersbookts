import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useRef } from "react";
import { SkillTypeProps } from "../../interfaces";

const carouselBehavior = (
  numberRef: React.MutableRefObject<HTMLDivElement>
) => {
  const currTranslateY =
    numberRef.current.style.transform !== ""
      ? numberRef.current.style.transform
          .split("(")[1]
          .split(")")[0]
          .split("px")[0]
      : 0;
  numberRef.current.style.transform = `translateY(${
    +currTranslateY + (+currTranslateY !== 0 ? -16 : -12)
  }px)`;
  new Promise((resolve) => {
    setTimeout(() => {
      numberRef.current.removeChild(numberRef.current.firstChild!);
      numberRef.current.style.transition = "none";
      numberRef.current.style.transform = `translateY(5px)`;
    }, 150);
    resolve("");
  }).then(() => {
    numberRef.current.style.removeProperty("transition");
    const nextNumber = document.createElement("span");
    nextNumber.innerText = `${+numberRef.current.lastChild?.textContent! + 1}`;
    numberRef.current.appendChild(nextNumber);
  });
};

const INCREMENT_SKILL = gql`
  mutation IncrementGrade($id: Float!) {
    incrementGrade(id: $id) {
      id
      vote
      skill {
        id
        name
      }
    }
  }
`;

const Skill = ({ grade }: SkillTypeProps) => {
  const numberRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  const [incrementGrade] = useMutation(INCREMENT_SKILL, {
    onCompleted() {
      carouselBehavior(numberRef);
    },
    variables: {
      id: grade.id,
    },
  });

  const handleIncrementSkill = async () => {
    incrementGrade();
  };

  useEffect(() => {
    let number = grade.vote + 1;
    while (number < grade.vote + 2) {
      // remove child into the children ref
      const nextNumber = document.createElement("span");
      nextNumber.innerText = number.toString();
      numberRef.current.appendChild(nextNumber);
      number++;
    }
  }, [grade.vote]);

  return (
    <li
      className="px-3 py-2 bg-indigo-100 rounded flex gap-2 items-center justify-between transition-transform hover:translate-y-[2px] cursor-pointer "
      key={grade.id}
      onClick={handleIncrementSkill}
    >
      {grade.skill.name}
      <span className="bg-indigo-300 rounded-full w-6 h-6 flex flex-col items-center justify-start flex-1 text-black overflow-hidden text-sm relative">
        <div
          className="absolute translate-y-[5px] flex flex-col transition-transform text-center text-xs"
          ref={numberRef}
        >
          <span>{grade.vote}</span>
        </div>
      </span>
    </li>
  );
};

export default Skill;
