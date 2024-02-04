import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface Query {
  keyword: string;
  tags: string[];
  environments: string[];
  archived?: boolean;
  capture?: boolean;
  hasVariations?: boolean;
  hasVariables?: boolean;
  variableKeys?: string[];
  variationValues?: string[];
}

export function parseSearchQuery(queryString: string) {
  const query: Query = {
    keyword: "",
    tags: [],
    environments: [],
    archived: undefined,
    capture: undefined,
  };

  const parts = queryString.split(" ");

  for (const part of parts) {
    if (part.startsWith("tag:")) {
      const tag = part.replace("tag:", "");

      if (tag.length > 0) {
        query.tags.push(tag);
      }
    } else if (part.startsWith("in:")) {
      const environment = part.replace("in:", "");

      if (environment.length > 0) {
        query.environments.push(environment);
      }
    } else if (part.startsWith("archived:")) {
      const archived = part.replace("archived:", "");

      if (archived === "true") {
        query.archived = true;
      } else if (archived === "false") {
        query.archived = false;
      }
    } else if (part.startsWith("capture:")) {
      const capture = part.replace("capture:", "");

      if (capture === "true") {
        query.capture = true;
      } else if (capture === "false") {
        query.capture = false;
      }
    } else if (part.startsWith("variable:")) {
      const variableKey = part.replace("variable:", "");

      if (typeof query.variableKeys === "undefined") {
        query.variableKeys = [];
      }

      if (variableKey.length > 0) {
        query.variableKeys.push(variableKey);
      }
    } else if (part.startsWith("variation:")) {
      const variationValue = part.replace("variation:", "");

      if (typeof query.variationValues === "undefined") {
        query.variationValues = [];
      }

      if (variationValue.length > 0) {
        query.variationValues.push(variationValue);
      }
    } else if (part === "with:variations") {
      query.hasVariations = true;
    } else if (part === "without:variations") {
      query.hasVariations = false;
    } else if (part === "with:variables") {
      query.hasVariables = true;
    } else if (part === "without:variables") {
      query.hasVariables = false;
    } else {
      if (part.length > 0) {
        query.keyword = part;
      }
    }
  }

  return query;
}