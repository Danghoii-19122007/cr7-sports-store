"use client";

import React from "react";
import CustomCursor from "./CustomCursor";
import ScrollProgress from "./ScrollProgress";
import FilmGrain from "./FilmGrain";
import Watermark from "./Watermark";

const ClientEffects = () => {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <FilmGrain />
      <Watermark />
    </>
  );
};

export default ClientEffects;
