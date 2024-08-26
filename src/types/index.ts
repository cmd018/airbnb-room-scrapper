import { Router } from "express";

export type Routes = {
  path?: string;
  router: Router;
};

export enum SectionComponentType {
  AmenitiesDefault = "AMENITIES_DEFAULT",
  TitleDefault = "TITLE_DEFAULT",
}

export type PropertyDetails = {
  id: string;
  name: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
};

export type RootSection = {
  niobeMinimalClientData: [string, NiobeMinimalClientDaum][];
};

export type NiobeMinimalClientDaum = {
  data: Data;
};

export type Data = {
  presentation: Presentation;
};

export type Presentation = {
  stayProductDetailPage: StayProductDetailPage;
};

export type StayProductDetailPage = {
  sections: Sections;
};

export type Sections = {
  __typename: string;
  sections: Section[];
};

export type Section = {
  sectionComponentType: string;
  sectionId: string;
  section: Section2;
};

export type Section2 = {
  title: string;
  seeAllAmenitiesGroups?: SeeAllAmenitiesGroup[];
  shareSave?: ShareSave;
};

export type SeeAllAmenitiesGroup = {
  title: string;
  amenities: Amenity[];
};

export type Amenity = {
  id: string;
  available: boolean;
  title: string;
  subtitle: string;
  icon: string;
};

export type ShareSave = {
  entityId: string;
  entityType: string;
  sharingConfig: SharingConfig;
  embedData: EmbedData;
};

export type SharingConfig = {
  title: string;
};

export type EmbedData = {
  id: string;
  name: string;
  personCapacity: number;
  pictureUrl: string;
  propertyType: string;
};
