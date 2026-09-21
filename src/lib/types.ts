export interface RoadmapTag {
  tagName: string;
}

export interface TagsContainer {
  products?: RoadmapTag[];
  cloudInstances?: RoadmapTag[];
  releasePhase?: RoadmapTag[];
  platforms?: RoadmapTag[];
}

export interface RoadmapItemRaw {
  id: number;
  title: string;
  description: string;
  moreInfoLink: string | null;
  publicDisclosureAvailabilityDate: string;
  publicPreviewDate: string;
  created: string;
  publicRoadmapStatus: string;
  status: string;
  modified: string;
  tagsContainer?: TagsContainer;
}

export interface RoadmapItem {
  id: number;
  title: string;
  descriptionPlain: string;
  status: string;
  publicRoadmapStatus: string;
  created: string;
  modified: string;
  publicDisclosureAvailabilityDate: string;
  publicPreviewDate: string;
  moreInfoLink: string | null;
  products: string[];
  platforms: string[];
  releasePhase: string[];
  sortDate: string;
}

export interface RoadmapMeta {
  fetchedAt: string;
  count: number;
  products: string[];
  statuses: string[];
}

export interface RoadmapApiResponse {
  items: RoadmapItem[];
  meta: RoadmapMeta;
}
