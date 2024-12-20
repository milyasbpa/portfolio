"use client";
import { AppContainer } from "@/core/modules/app/container";
import { HomeContainer } from "@/features/home/container/Home.container";

export default function Home() {
  return (
    <AppContainer>
      <HomeContainer />
    </AppContainer>
  );
}
