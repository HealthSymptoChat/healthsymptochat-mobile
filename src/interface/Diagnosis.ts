interface DiagnosisProps {
  disease: string;
  description: string;
  treatment: string[];
  otherDiseases: {
    name: string;
    description: string;
  }[];
}
