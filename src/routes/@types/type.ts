export interface IRoutes {
  title?: string;
  role?: string;
  path?: string;
  location?: string;
  isPublic?: boolean;
  navLowerLayer?: boolean;
  layout?: any;
  component: any;
}

export interface IApplicationRouter extends IRoutes {
  exact?: boolean;
}
