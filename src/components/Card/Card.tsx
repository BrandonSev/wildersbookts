import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { CardTypeProps } from "../../types";
import Skill from "../Skill/Skill";

const Card = ({ wilder, setDeletingWilder, setModal }: CardTypeProps) => {
  const [cardHover, setCardHover] = useState<boolean>(false);
  const refCard = useRef() as React.MutableRefObject<HTMLDivElement>;

  const handleMouseOver = useCallback(() => {
    setCardHover(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setCardHover(false);
  }, []);

  useEffect(() => {
    if (wilder.fadeIn) {
      if (refCard.current) {
        refCard.current.classList.add("fadeIn");
        refCard.current.addEventListener("animationend", () => {
          if (refCard.current)
            refCard.current.classList.remove("fadeIn", "opacity-0");
        });
      }
    }
  }, [wilder]);

  const handleDeleteWilder = () => {
    setDeletingWilder({ wilder, open: true, refCard, type: "" });
  };

  const handleEditWilder = () => {
    setModal({ open: true, type: "editWilder", wilder });
  };

  return (
    <div
      className={`w-full lg:max-w-md self-start bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700 shadow-md ease-in-out relative overflow-hidden ${
        wilder.fadeIn && "opacity-0"
      }`}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      ref={refCard}
    >
      <img
        className="rounded-t-lg w-full h-[250px] object-cover"
        src={wilder.avatar}
        alt="avatar"
      />
      <div className="p-5">
        <a href="a">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {wilder.firstname} {wilder.lastname}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-5 h-[120px] max-h-[120px]">
          {wilder.description}
        </p>
        <div className="flex items-center gap-2">
          <p className="p-2 bg-indigo-300 rounded text-black inline-block">
            Wild skills{" "}
            {wilder.skills?.length ? `(${wilder.skills.length})` : ""}
          </p>
        </div>
        <div>
          <ul className="flex flex-wrap gap-4 mt-4">
            {wilder.skills.length ? (
              wilder.skills.map((skill) => {
                return <Skill skill={skill} key={skill.id} />;
              })
            ) : (
              <li className="p-2 bg-indigo-100 rounded">:/ No skills yet</li>
            )}
          </ul>
        </div>
      </div>
      <div
        className={`absolute right-4 top-4 transition-transform ${
          cardHover ? "-translate-y-0" : "-translate-y-14"
        }`}
      >
        <div className="flex gap-2">
          <button
            className="bg-indigo-200 p-2 rounded-full"
            onClick={handleEditWilder}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-pencil"
              viewBox="0 0 16 16"
            >
              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
            </svg>
          </button>
          <button
            className="bg-indigo-200 p-2 rounded-full"
            onClick={handleDeleteWilder}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-trash"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
              <path
                fill="evenodd"
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
