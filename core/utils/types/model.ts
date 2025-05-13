export interface Model {
   id?: string;
   name?: string;
   image?: string;
   make?: string;
   makeId?: string;
   makeImage?: string;
   votes?: number;
   engineVol?: number;
   maxSpeed?: number;
   totalComments?: number;
   comments?: { user: string; datePosted: string; text: string }[];
}
