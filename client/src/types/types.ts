export default interface LinkT {
  id: string;
  description: string;
  url: string;
  votes: number[];
  postedBy: {
    name: string;
  };
  createAt: Date;
}

