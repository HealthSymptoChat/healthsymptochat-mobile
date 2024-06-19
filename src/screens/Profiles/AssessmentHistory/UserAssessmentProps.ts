interface UserAssessmentProps {
  _id: string;
  user: any;
  disease: string;
  description: string;
  symptoms: string[];
  treatment: string;
  otherDiseases: string[];
  createdDate: string;
}

export default UserAssessmentProps;
