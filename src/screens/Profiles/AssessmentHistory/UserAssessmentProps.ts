interface UserAssessmentProps {
  _id: string;
  user: any;
  disease: string;
  description: string;
  treatment: string[];
  otherDiseases: {
    name: string;
    description: string;
  }[];
  createdDate: string;
}

export default UserAssessmentProps;
