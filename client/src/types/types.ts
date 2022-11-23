export default interface LinkT {
  id: string | number;
  description: string;
  url: string;
  votes: number[];
  postedBy: {
    name: string;
  };
  createAt: Date;
}

