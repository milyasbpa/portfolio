import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../i18n";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiDuolingo } from "react-icons/si";
import { ExperiencesHome } from "../fragments/experiences/Experiences.home";
import { ProjectsHome } from "../fragments/projects";
import { BlogsHome } from "../fragments/blogs";
import { MenuHome } from "../fragments/menu";
import SVGIcon from "@/core/ui/icons";
import { AppContext } from "@/core/modules/app/context";

export const HomeContainer = () => {
  const dictionaries = getDictionaries();
  const { state } = React.useContext(AppContext);
  const darkMode = state.theme.mode === "dark";
  return (
    <div
      className={clsx(
        "grid grid-cols-1 justify-center justify-items-center items-start content-start",
        "w-full"
      )}
    >
      {/* intro */}
      <section
        className={clsx(
          "grid grid-cols-1 justify-center justify-items-center items-start content-start",
          "w-full",
          "desktop:fixed",
          "z-10"
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-1 desktop:grid-cols-2 justify-center justify-items-center items-start content-start gap-[1.5rem]",
            "w-full max-w-6xl",
            "px-[1rem]",
            "relative"
          )}
        >
          <div
            className={clsx(
              "grid grid-cols-1 items-stretch content-between justify-start justify-items-start",
              "w-full",
              "min-h-screen",
              "py-[60px]"
            )}
          >
            <div
              className={clsx(
                "grid grid-cols-1 place-content-start place-items-start gap-[2rem]",
                "w-full",
                "max-w-[32rem]"
              )}
            >
              <div
                className={clsx(
                  "grid grid-cols-1 place-content-start place-items-start",
                  "w-full"
                )}
              >
                <div
                  className={clsx(
                    "grid grid-cols-1 place-content-start place-items-start",
                    "w-full"
                  )}
                >
                  <h1
                    className={clsx(
                      "text-[1.25rem] lg:text-[2.5rem] text-dark18 dark:text-grey90 font-semibold"
                    )}
                  >
                    {dictionaries.hero.title}
                  </h1>
                  <p
                    className={clsx(
                      "text-[1rem] lg:text-[2rem] text-purple60 dark:text-purple78 font-semibold"
                    )}
                  >
                    {dictionaries.hero.message}
                  </p>
                </div>

                <p
                  className={clsx(
                    "text-[0.875rem] text-dark18 dark:text-grey90 font-medium"
                  )}
                >
                  {dictionaries.hero.description}
                </p>
              </div>

              <MenuHome />
            </div>

            {/* social media */}
            <div
              className={clsx(
                "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.5rem]",
                "w-full"
              )}
            >
              {dictionaries.hero.account.items.map((account, accountIndex) => (
                <motion.a
                  key={accountIndex}
                  href={account.url}
                  target="_blank"
                  aria-label={account.id}
                  whileHover={{
                    color: darkMode ? "#A290FC" : "#6E60FA",
                    scale: 1.1,
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                  }}
                  className={clsx(
                    "w-[2.5rem] h-[2.5rem]",
                    "flex items-center justify-center",
                    "rounded-[0.5rem]",
                    "text-dark25 dark:text-white",
                    "hover:border hover:border-grey80 dark:hover:border-dark18"
                  )}
                >
                  {account.id === "github" ? (
                    <FaGithub size={20} />
                  ) : account.id === "linkedin" ? (
                    <FaLinkedin size={20} />
                  ) : account.id === "duolingo" ? (
                    <SiDuolingo size={20} />
                  ) : account.id === "hackerrank" ? (
                    <SVGIcon
                      name="HackerRank"
                      className={clsx("w-[1.25rem] h-[1.25rem]")}
                    />
                  ) : null}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className={clsx(
          "grid grid-cols-1 desktop:grid-cols-2 justify-center justify-items-center items-start content-start gap-[1.5rem]",
          "w-full max-w-6xl",
          "px-[1rem]",
          "relative"
        )}
      >
        <div></div>
        {/* contents */}
        <aside
          className={clsx(
            "grid grid-cols-1 items-start content-start justify-start justify-items-start",
            "w-full desktop:h-screen"
          )}
        >
          <ExperiencesHome />
          <ProjectsHome />
          <BlogsHome />
        </aside>
      </section>
    </div>
  );
};
