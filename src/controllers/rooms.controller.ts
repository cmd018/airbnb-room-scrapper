import { NextFunction, Request, Response } from "express";
import axios from "axios";
import { HttpException } from "../utils/httpException";
import { NiobeMinimalClientDaum, PropertyDetails, RootSection, SectionComponentType } from "../types";

class RoomsController {
  public getRoomById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roomId: number = parseInt(req.params.id);
      if (Number.isNaN(roomId)) {
        throw new HttpException(400, "Invalid room id");
      }

      const { data } = await axios.get<string>(this.getAirbnbUrl(roomId));
      const propertyDetails = this.scrapeData(data);
      res.status(200).json({ data: propertyDetails, message: "found" });
    } catch (error) {
      next(error);
    }
  };

  private getAirbnbUrl(id: number) {
    return `https://www.airbnb.co.uk/rooms/${id}`;
  }

  private scrapeData = (data: string): PropertyDetails => {
    const regex = /<script id="data-deferred-state-0" data-deferred-state-0="true" type="application\/json">((.|\n)*?)<\/script>/gim;
    const matches = data.match(regex);

    if (!matches) {
      throw new Error("nothing found");
    }

    const parts = regex.exec(matches[0]);

    if (!parts) {
      throw new Error("nothing found");
    }

    const rootSection: RootSection = JSON.parse(parts[1]);

    const propertyDetails = this.scrapePropertyDetails(rootSection.niobeMinimalClientData[0][1]);
    const amenities = this.scrapeAmenityDetails(rootSection.niobeMinimalClientData[0][1]);

    return {
      ...propertyDetails,
      amenities,
    };
  };

  private scrapePropertyDetails(niobeMinimalClientData: NiobeMinimalClientDaum): Omit<PropertyDetails, "amenities"> {
    const titleSection = niobeMinimalClientData.data.presentation.stayProductDetailPage.sections.sections.find(
      s => s.sectionComponentType === SectionComponentType.TitleDefault,
    );

    if (!titleSection) {
      throw new Error("title section not found");
    }

    const descriptionList = titleSection.section.shareSave!.sharingConfig.title.split("·");

    const bedrooms = descriptionList.find(d => {
      if (d.includes("bedroom")) return d.trim().charAt(0);
    });

    const bathrooms = descriptionList.find(d => {
      if (d.includes("bathroom")) return d.trim().charAt(0);
    });

    if (!bedrooms || !bathrooms) {
      throw new Error("bedroom or bathroom not found");
    }

    return {
      id: titleSection.section.shareSave!.embedData.id,
      name: titleSection.section.title,
      type: titleSection.section.shareSave!.embedData.propertyType,
      bedrooms: parseInt(bedrooms),
      bathrooms: parseInt(bathrooms),
    };
  }

  private scrapeAmenityDetails(niobeMinimalClientData: NiobeMinimalClientDaum): string[] {
    const amenitiesSection = niobeMinimalClientData.data.presentation.stayProductDetailPage.sections.sections.find(
      s => s.sectionComponentType === SectionComponentType.AmenitiesDefault,
    );

    if (!amenitiesSection || !amenitiesSection.section.seeAllAmenitiesGroups) {
      throw new Error("amenities section not found");
    }

    const amenities = amenitiesSection.section.seeAllAmenitiesGroups.flatMap(ag => {
      const amenitiesGroup = [];
      for (let i = 0; i < ag.amenities.length; i++) {
        if (ag.amenities[i].available) amenitiesGroup.push(ag.amenities[i].title);
      }
      return amenitiesGroup;
    });

    return amenities;
  }
}

export default RoomsController;
