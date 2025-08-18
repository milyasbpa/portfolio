import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../i18n";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiDuolingo } from "react-icons/si";
import { ExperiencesHome } from "../fragments/experiences/Experiences.home";
import { ProjectsHome } from "../fragments/projects";
import { BlogsHome } from "../fragments/blogs";
import SVGIcon from "@/core/ui/icons";
import { AppContext } from "@/core/modules/app/context";
import { AboutHome } from "../fragments/about/About.home";
import { ThemeToggle } from "@/core/modules/app/fragments/theme";

export const HomeContainer = () => {
  const dictionaries = getDictionaries();
  const { state } = React.useContext(AppContext);

  return (
    <>
      <div
        className={clsx(
          "min-h-screen transition-all duration-300 relative overflow-hidden",
          "bg-gradient-to-br from-indigo-50 via-blue-50 to-teal-50",
          "dark:from-slate-950 dark:via-indigo-950 dark:to-slate-900",
          "w-full"
        )}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient Orbs */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400/30 to-teal-400/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-teal-300/10 to-blue-300/10 rounded-full blur-2xl animate-bounce delay-500" />
          
          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24px,rgba(255,255,255,.05)_25px,rgba(255,255,255,.05)_26px,transparent_27px,transparent_49px,rgba(255,255,255,.05)_50px,rgba(255,255,255,.05)_51px,transparent_52px),linear-gradient(rgba(255,255,255,.05)_24px,transparent_25px,transparent_26px,rgba(255,255,255,.05)_27px,rgba(255,255,255,.05)_49px,transparent_50px,transparent_51px,rgba(255,255,255,.05)_52px)] bg-[length:50px_50px] opacity-30 dark:opacity-10" />
        </div>
        {/* Hero Section */}
        <section
          className={clsx(
            "relative min-h-screen w-full z-10",
            "flex flex-col justify-center items-start",
            "responsive-padding",
            "max-w-7xl mx-auto"
          )}
        >
          <div className={clsx(
            "grid grid-cols-1 desktop:grid-cols-2 gap-12",
            "w-full items-center"
          )}>
            {/* Content */}
            <div
              className={clsx(
                "space-y-8",
                "max-w-2xl"
              )}
            >
              {/* Title */}
              <div className="space-y-4">
                <h1
                  className={clsx(
                    "text-3xl tablet:text-4xl desktop:text-6xl font-bold",
                    "bg-gradient-to-r from-slate-800 via-blue-700 to-slate-700",
                    "dark:from-slate-100 dark:via-blue-200 dark:to-slate-200",
                    "bg-clip-text text-transparent",
                    "leading-tight"
                  )}
                >
                  {dictionaries.hero.title}
                </h1>
                
                <p
                  className={clsx(
                    "text-xl tablet:text-2xl desktop:text-3xl font-semibold",
                    "bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-500",
                    "dark:from-primary-400 dark:via-secondary-400 dark:to-primary-300",
                    "bg-clip-text text-transparent"
                  )}
                >
                  {dictionaries.hero.message}
                </p>
              </div>

              {/* Social Media */}
              <div
                className={clsx(
                  "flex flex-wrap gap-4",
                  "pt-8"
                )}
              >
                {dictionaries.hero.account.items.map((account, accountIndex) => (
                  <motion.a
                    key={accountIndex}
                    href={account.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={account.id}
                    className={clsx(
                      "w-12 h-12 tablet:w-14 tablet:h-14",
                      "flex items-center justify-center",
                      "rounded-xl transition-all duration-300",
                      "bg-white/80 hover:bg-white",
                      "dark:bg-slate-800/80 dark:hover:bg-slate-700",
                      "border border-white/30 hover:border-primary-300",
                      "dark:border-slate-600/50 dark:hover:border-primary-500",
                      "shadow-lg hover:shadow-xl backdrop-blur-sm",
                      "hover:shadow-primary-500/25 dark:hover:shadow-primary-400/25",
                      "text-slate-700 hover:text-primary-600",
                      "dark:text-slate-300 dark:hover:text-primary-400",
                      "hover:scale-110 hover:-translate-y-1"
                    )}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {account.id === "github" ? (
                      <FaGithub size={20} />
                    ) : account.id === "linkedin" ? (
                      <FaLinkedin size={20} />
                    ) : account.id === "duolingo" ? (
                      <SiDuolingo size={20} />
                    ) : account.id === "hackerrank" ? (
                      <SVGIcon name="HackerRank" className="w-5 h-5" />
                    ) : null}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Hero Image Placeholder - Enhanced */}
            <div
              className={clsx(
                "relative",
                "hidden desktop:flex",
                "items-center justify-center",
                "h-96"
              )}
            >
              {/* Outer Ring Animation */}
              <motion.div
                className="absolute w-96 h-96 border border-primary-200/30 dark:border-primary-800/30 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Middle Ring Animation */}
              <motion.div
                className="absolute w-88 h-88 border border-secondary-200/40 dark:border-secondary-800/40 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Main Orb */}
              <motion.div
                className={clsx(
                  "w-80 h-80 relative",
                  "bg-gradient-to-r from-primary-400/30 via-secondary-400/30 to-primary-500/30",
                  "dark:from-primary-500/40 dark:via-secondary-500/40 dark:to-primary-400/40",
                  "rounded-full",
                  "flex items-center justify-center",
                  "backdrop-blur-lg border border-white/30 dark:border-slate-700/50",
                  "shadow-2xl shadow-primary-500/20"
                )}
                whileHover={{ scale: 1.05 }}
                animate={{
                  boxShadow: [
                    "0 25px 50px -12px rgba(99, 127, 255, 0.2)",
                    "0 25px 50px -12px rgba(20, 184, 166, 0.3)",
                    "0 25px 50px -12px rgba(99, 127, 255, 0.2)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <motion.span 
                  className="text-primary-700 dark:text-primary-300 text-xl font-bold tracking-wide"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  Portfolio
                </motion.span>
                
                {/* Inner Glow */}
                <div className="absolute inset-4 bg-gradient-to-r from-primary-300/20 to-secondary-300/20 rounded-full blur-lg" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <section
          className={clsx(
            "relative w-full",
            "responsive-padding",
            "max-w-7xl mx-auto"
          )}
        >
          <div className={clsx(
            "grid grid-cols-1 desktop:grid-cols-1 gap-8 desktop:gap-16"
          )}>
            {/* Sidebar - Hidden on mobile */}
            <div className="hidden desktop:block" />
            
            {/* Main Content */}
            <div className={clsx(
              "space-y-24",
              "pb-24"
            )}>
              <AboutHome />
              <ExperiencesHome />
              <ProjectsHome />
              <BlogsHome />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
